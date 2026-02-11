<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\NearbyDestination;
use App\Models\AgentProperty;
use App\Models\Agent;
use App\Models\PropertyImage;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $agentId = $request->get('agent_id');
        $city = $request->get('city');
        $propertyType = $request->get('property_type');

        $query = Property::with(['primaryImage', 'propertyImages'])
            ->where('status', 'active');

        if ($city) {
            $query->where('city', $city);
        }

        if ($propertyType) {
            $query->where('property_type', $propertyType);
        }

        if ($agentId) {
            $query->where('agent_id', $agentId);
        }

        $properties = $query->orderBy('created_at', 'desc')->get();

        $data = $properties->map(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->title,
                'city' => $property->city,
                'state' => $property->state,
                'price_per_night' => (float) $property->price_per_night,
                'min_nights' => $property->min_nights,
                'property_type' => $property->property_type,
                'beds' => $property->beds,
                'bedrooms' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'rating' => (float) $property->rating,
                'total_reviews' => $property->total_reviews,
                'is_guest_favorite' => (bool) $property->is_guest_favorite,
                'agent_id' => $property->agent_id,
                'description' => $property->description,
                'amenities' => $property->amenities,
                'primary_image' => $property->primaryImage?->image_url,
                'images' => $property->propertyImages->pluck('image_url')
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function agentProperties(Request $request): JsonResponse
    {
        $agent = $request->user();
        
        $properties = Property::with(['primaryImage', 'propertyImages'])
            ->where('agent_id', $agent->id)
            ->where('status', 'active')
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $properties->map(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->title,
                'city' => $property->city,
                'state' => $property->state,
                'price_per_night' => (float) $property->price_per_night,
                'min_nights' => $property->min_nights,
                'property_type' => $property->property_type,
                'beds' => $property->beds,
                'bedrooms' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'rating' => (float) $property->rating,
                'total_reviews' => $property->total_reviews,
                'is_guest_favorite' => (bool) $property->is_guest_favorite,
                'description' => $property->description,
                'amenities' => $property->amenities,
                'primary_image' => $property->primaryImage?->image_url,
                'images' => $property->propertyImages->pluck('image_url')
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function updateAgentPrice(Request $request, $propertyId): JsonResponse
    {
        $request->validate([
            'price_per_night' => 'required|numeric|min:0|max:999999.99',
        ]);

        $agent = $request->user();
        
        $property = Property::where('id', $propertyId)
            ->where('agent_id', $agent->id)
            ->first();

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Property not found or unauthorized'
            ], 404);
        }

        $property->update([
            'price_per_night' => $request->price_per_night
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Price updated successfully',
            'data' => [
                'property_id' => (int) $propertyId,
                'price_per_night' => (float) $request->price_per_night,
                'updated_at' => $property->updated_at
            ]
        ]);
    }

    public function show($id): JsonResponse
    {
        $property = Property::with(['primaryImage', 'propertyImages'])
            ->where('status', 'active')
            ->find($id);

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Property not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $property->id,
                'title' => $property->title,
                'city' => $property->city,
                'state' => $property->state,
                'price_per_night' => (float) $property->price_per_night,
                'min_nights' => $property->min_nights,
                'property_type' => $property->property_type,
                'beds' => $property->beds,
                'bedrooms' => $property->bedrooms,
                'bathrooms' => $property->bathrooms,
                'rating' => (float) $property->rating,
                'total_reviews' => $property->total_reviews,
                'is_guest_favorite' => (bool) $property->is_guest_favorite,
                'agent_id' => $property->agent_id,
                'description' => $property->description,
                'amenities' => $property->amenities,
                'primary_image' => $property->primaryImage?->image_url,
                'images' => $property->propertyImages->pluck('image_url'),
                'created_at' => $property->created_at,
                'updated_at' => $property->updated_at
            ]
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'price_per_night' => 'required|numeric|min:0|max:999999.99',
            'min_nights' => 'required|integer|min:1',
            'property_type' => 'required|in:apartment,house,villa,studio,beach_house,cottage,penthouse',
            'beds' => 'required|integer|min:1',
            'bedrooms' => 'required|integer|min:1',
            'bathrooms' => 'required|integer|min:1',
            'rating' => 'nullable|numeric|min:0|max:5',
            'total_reviews' => 'nullable|integer|min:0',
            'is_guest_favorite' => 'boolean',
            'description' => 'nullable|string',
            'amenities' => 'nullable|array',
            'images' => 'nullable|array',
            'images.*.image_url' => 'required|string',
            'images.*.is_primary' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $agent = $request->user();
        
        $propertyData = $request->except(['images']);
        $propertyData['agent_id'] = $agent->id;
        $propertyData['status'] = 'active';
        $propertyData['amenities'] = json_encode($propertyData['amenities'] ?? []);

        $property = Property::create($propertyData);

        // Handle images
        if ($request->has('images')) {
            foreach ($request->images as $imageData) {
                PropertyImage::create([
                    'property_id' => $property->id,
                    'image_url' => $imageData['image_url'],
                    'is_primary' => $imageData['is_primary'] ?? false
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Property created successfully',
            'data' => $property
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $property = Property::where('agent_id', $request->user()->id)->find($id);

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Property not found or unauthorized'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'city' => 'sometimes|string|max:100',
            'state' => 'sometimes|string|max:100',
            'price_per_night' => 'sometimes|numeric|min:0|max:999999.99',
            'min_nights' => 'sometimes|integer|min:1',
            'property_type' => 'sometimes|in:apartment,house,villa,studio,beach_house,cottage,penthouse',
            'beds' => 'sometimes|integer|min:1',
            'bedrooms' => 'sometimes|integer|min:1',
            'bathrooms' => 'sometimes|integer|min:1',
            'rating' => 'sometimes|numeric|min:0|max:5',
            'total_reviews' => 'sometimes|integer|min:0',
            'is_guest_favorite' => 'sometimes|boolean',
            'description' => 'sometimes|nullable|string',
            'amenities' => 'sometimes|nullable|array',
            'status' => 'sometimes|in:active,inactive'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = $request->except(['images']);
        
        if (isset($updateData['amenities'])) {
            $updateData['amenities'] = json_encode($updateData['amenities']);
        }

        $property->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Property updated successfully',
            'data' => $property
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $property = Property::where('agent_id', request()->user()->id)->find($id);

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Property not found or unauthorized'
            ], 404);
        }

        // Soft delete by setting status to inactive
        $property->update(['status' => 'inactive']);

        return response()->json([
            'success' => true,
            'message' => 'Property deleted successfully'
        ]);
    }

    public function approve(Request $request, $id): JsonResponse
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Property not found'
            ], 404);
        }

        $property->update(['status' => 'active']);

        return response()->json([
            'success' => true,
            'message' => 'Property approved successfully',
            'data' => $property
        ]);
    }

    public function adminIndex(): JsonResponse
    {
        $properties = Property::with(['agent:id,name', 'primaryImage'])
            ->orderBy('created_at', 'desc')
            ->get();

        $data = $properties->map(function ($property) {
            return [
                'id' => $property->id,
                'title' => $property->title,
                'city' => $property->city,
                'state' => $property->state,
                'price_per_night' => (float) $property->price_per_night,
                'property_type' => $property->property_type,
                'status' => $property->status,
                'agent' => $property->agent,
                'primary_image' => $property->primaryImage?->image_url,
                'created_at' => $property->created_at,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function adminDestroy($id): JsonResponse
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Property not found'
            ], 404);
        }

        $property->delete();

        return response()->json([
            'success' => true,
            'message' => 'Property permanently deleted'
        ]);
    }
    public function nearbyDestinations(): JsonResponse
    {
        $destinations = NearbyDestination::ordered()->get();

        $data = $destinations->map(function ($destination) {
            return [
                'id' => $destination->id,
                'name' => $destination->name,
                'state' => $destination->state,
                'description' => $destination->description,
                'icon' => $destination->icon,
                'type' => $destination->type,
                'is_popular' => (bool) $destination->is_popular
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $data
        ]);
    }

    public function filters(): JsonResponse
    {
        $cities = Property::where('status', 'active')
            ->distinct()
            ->pluck('city')
            ->toArray();

        $propertyTypes = ['apartment', 'house', 'villa', 'studio', 'beach_house', 'cottage', 'penthouse'];

        return response()->json([
            'success' => true,
            'data' => [
                'cities' => $cities,
                'property_types' => $propertyTypes
            ]
        ]);
    }
}
