<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\ServiceImage;
use App\Models\ServiceType;
use App\Models\AgentService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Service::with(['serviceImages', 'primaryImage'])
            ->where('status', 'active');

        // Apply filters
        if ($request->filled('city')) {
            $query->where('city', $request->city);
        }

        if ($request->filled('service_type')) {
            $query->where('service_type', $request->service_type);
        }

        if ($request->filled('availability')) {
            $query->where('availability_status', $request->availability);
        }

        // Agent pricing logic
        $agentId = $request->get('agent_id');
        if ($agentId) {
            $services = $query->get()->map(function ($service) use ($agentId) {
                $agentService = AgentService::where('agent_id', $agentId)
                    ->where('service_id', $service->id)
                    ->first();

                $service->price = $agentService ? $agentService->agent_price_per_guest : $service->base_price_per_guest;
                $service->price_type = $agentService ? 'agent' : 'base';
                $service->agent_info = $agentService ? [
                    'id' => $agentId,
                    'name' => $agentService->agent->name ?? null
                ] : null;
                
                return $service;
            });
        } else {
            // Public view - show base prices only
            $services = $query->get()->map(function ($service) {
                $service->price = $service->base_price_per_guest;
                $service->price_type = 'base';
                $service->agent_info = null;
                
                return $service;
            });
        }

        // Pagination
        $perPage = $request->get('per_page', 12);
        $page = $request->get('page', 1);
        $total = $agentId ? 
            DB::connection('agents_db')->table('agent_services')->where('agent_id', $agentId)->count() :
            $query->count();
        
        $paginatedServices = collect($services)->forPage($page, $perPage);

        return response()->json([
            'success' => true,
            'data' => $paginatedServices->values(),
            'meta' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'last_page' => ceil($total / $perPage)
            ]
        ]);
    }

    public function show($id): JsonResponse
    {
        $service = Service::with(['serviceImages', 'primaryImage'])
            ->where('id', $id)
            ->where('status', 'active')
            ->first();

        if (!$service) {
            return response()->json([
                'success' => false,
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $service->id,
                'title' => $service->title,
                'city' => $service->city,
                'country' => $service->country,
                'base_price_per_guest' => $service->base_price_per_guest,
                'min_booking_amount' => $service->min_booking_amount,
                'pricing_type' => $service->pricing_type,
                'duration_minutes' => $service->duration_minutes,
                'service_type' => $service->service_type,
                'provider_id' => $service->provider_id,
                'description' => $service->description,
                'what_included' => $service->what_included,
                'availability_status' => $service->availability_status,
                'status' => $service->status,
                'images' => $service->serviceImages->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image_url' => $image->image_url,
                        'is_primary' => $image->is_primary,
                    ];
                }),
                'rating' => 4.9,
                'reviews_count' => 89,
            ]
        ]);
    }

    public function types(): JsonResponse
    {
        $types = ServiceType::all()->map(function ($type) {
            return [
                'id' => $type->id,
                'name' => $type->name,
                'slug' => $type->slug,
                'icon_url' => $type->icon_url,
                'count' => $type->count,
                'description' => $type->description,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $types
        ]);
    }

    public function storeAgentService(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services_db.services,id',
            'agent_price_per_guest' => 'required|numeric|min:0|max:999999.99',
            'agent_min_booking' => 'nullable|numeric|min:0|max:999999.99',
        ]);

        $agent = $request->user();
        
        $agentService = AgentService::updateOrCreate(
            [
                'agent_id' => $agent->id,
                'service_id' => $validated['service_id'],
            ],
            [
                'agent_price_per_guest' => $validated['agent_price_per_guest'],
                'agent_min_booking' => $validated['agent_min_booking'],
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Service price saved successfully',
            'data' => $agentService
        ]);
    }

    public function updateAgentService(Request $request, $serviceId): JsonResponse
    {
        $validated = $request->validate([
            'agent_price_per_guest' => 'required|numeric|min:0|max:999999.99',
            'agent_min_booking' => 'nullable|numeric|min:0|max:999999.99',
        ]);

        $agent = $request->user();
        
        $agentService = AgentService::where('agent_id', $agent->id)
            ->where('service_id', $serviceId)
            ->firstOrFail();

        $agentService->update([
            'agent_price_per_guest' => $validated['agent_price_per_guest'],
            'agent_min_booking' => $validated['agent_min_booking'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Service price updated successfully',
            'data' => $agentService
        ]);
    }
}
