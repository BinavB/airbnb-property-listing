<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use App\Models\ExperienceImage;
use App\Models\ExperienceCategory;
use App\Models\AgentExperience;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ExperienceController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Experience::with(['experienceImages', 'primaryImage'])
            ->where('status', 'active');

        // Apply filters
        if ($request->filled('city')) {
            $query->where('city', $request->city);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('is_original')) {
            $query->where('is_original', $request->boolean('is_original'));
        }

        // Agent pricing logic
        $agentId = $request->get('agent_id');
        if ($agentId) {
            $experiences = $query->get()->map(function ($experience) use ($agentId) {
                $agentExperience = AgentExperience::where('agent_id', $agentId)
                    ->where('experience_id', $experience->id)
                    ->first();

                $experience->price = $agentExperience ? $agentExperience->agent_price_per_guest : $experience->base_price_per_guest;
                $experience->price_type = $agentExperience ? 'agent' : 'base';
                $experience->agent_info = $agentExperience ? [
                    'id' => $agentId,
                    'name' => $agentExperience->agent->name ?? null
                ] : null;
                
                return $experience;
            });
        } else {
            // Public view - show base prices only
            $experiences = $query->get()->map(function ($experience) {
                $experience->price = $experience->base_price_per_guest;
                $experience->price_type = 'base';
                $experience->agent_info = null;
                
                return $experience;
            });
        }

        // Pagination
        $perPage = $request->get('per_page', 12);
        $page = $request->get('page', 1);
        $total = $agentId ? 
            DB::connection('agents_db')->table('agent_experiences')->where('agent_id', $agentId)->count() :
            $query->count();
        
        $paginatedExperiences = collect($experiences)->forPage($page, $perPage);

        return response()->json([
            'success' => true,
            'data' => $paginatedExperiences->values(),
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
        $experience = Experience::with(['experienceImages', 'primaryImage'])
            ->where('id', $id)
            ->where('status', 'active')
            ->first();

        if (!$experience) {
            return response()->json([
                'success' => false,
                'message' => 'Experience not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $experience->id,
                'title' => $experience->title,
                'city' => $experience->city,
                'country' => $experience->country,
                'base_price_per_guest' => $experience->base_price_per_guest,
                'group_price' => $experience->group_price,
                'pricing_type' => $experience->pricing_type,
                'duration_hours' => $experience->duration_hours,
                'max_guests' => $experience->max_guests,
                'category' => $experience->category,
                'is_original' => $experience->is_original,
                'description' => $experience->description,
                'what_included' => $experience->what_included,
                'host_id' => $experience->host_id,
                'status' => $experience->status,
                'images' => $experience->experienceImages->map(function ($image) {
                    return [
                        'id' => $image->id,
                        'image_url' => $image->image_url,
                        'is_primary' => $image->is_primary,
                    ];
                }),
                'rating' => 4.8,
                'reviews_count' => 127,
            ]
        ]);
    }

    public function categories(): JsonResponse
    {
        $categories = ExperienceCategory::all()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'slug' => $category->slug,
                'icon' => $category->icon,
                'description' => $category->description,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $categories
        ]);
    }

    public function storeAgentExperience(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'experience_id' => 'required|exists:experiences_db.experiences,id',
            'agent_price_per_guest' => 'required|numeric|min:0|max:999999.99',
            'agent_group_price' => 'nullable|numeric|min:0|max:999999.99',
        ]);

        $agent = $request->user();
        
        $agentExperience = AgentExperience::updateOrCreate(
            [
                'agent_id' => $agent->id,
                'experience_id' => $validated['experience_id'],
            ],
            [
                'agent_price_per_guest' => $validated['agent_price_per_guest'],
                'agent_group_price' => $validated['agent_group_price'],
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Experience price saved successfully',
            'data' => $agentExperience
        ]);
    }

    public function updateAgentExperience(Request $request, $experienceId): JsonResponse
    {
        $validated = $request->validate([
            'agent_price_per_guest' => 'required|numeric|min:0|max:999999.99',
            'agent_group_price' => 'nullable|numeric|min:0|max:999999.99',
        ]);

        $agent = $request->user();
        
        $agentExperience = AgentExperience::where('agent_id', $agent->id)
            ->where('experience_id', $experienceId)
            ->firstOrFail();

        $agentExperience->update([
            'agent_price_per_guest' => $validated['agent_price_per_guest'],
            'agent_group_price' => $validated['agent_group_price'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Experience price updated successfully',
            'data' => $agentExperience
        ]);
    }
}
