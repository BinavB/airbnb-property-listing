<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agent;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AgentController extends Controller
{
    public function index(): JsonResponse
    {
        $agents = Agent::select('id', 'name', 'email', 'created_at')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $agents
        ]);
    }

    public function show($id): JsonResponse
    {
        $agent = Agent::select('id', 'name', 'email', 'created_at')
            ->find($id);

        if (!$agent) {
            return response()->json([
                'success' => false,
                'message' => 'Agent not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $agent
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:agents',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $agent = Agent::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Agent created successfully',
            'data' => $agent
        ], 201);
    }

    public function update(Request $request, $id): JsonResponse
    {
        $agent = Agent::find($id);

        if (!$agent) {
            return response()->json([
                'success' => false,
                'message' => 'Agent not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:agents,email,' . $id,
            'password' => 'sometimes|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = $request->only(['name', 'email']);
        
        if ($request->has('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $agent->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Agent updated successfully',
            'data' => $agent
        ]);
    }

    public function destroy($id): JsonResponse
    {
        $agent = Agent::find($id);

        if (!$agent) {
            return response()->json([
                'success' => false,
                'message' => 'Agent not found'
            ], 404);
        }

        // Check if agent has properties
        $propertyCount = Property::where('agent_id', $id)->count();
        if ($propertyCount > 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cannot delete agent with existing properties'
            ], 422);
        }

        $agent->delete();

        return response()->json([
            'success' => true,
            'message' => 'Agent deleted successfully'
        ]);
    }

    public function profile(Request $request): JsonResponse
    {
        $agent = $request->user();
        
        $agentData = [
            'id' => $agent->id,
            'name' => $agent->name,
            'email' => $agent->email,
            'properties_count' => Property::where('agent_id', $agent->id)->count(),
            'created_at' => $agent->created_at,
        ];

        return response()->json([
            'success' => true,
            'data' => $agentData
        ]);
    }

    public function updateProfile(Request $request): JsonResponse
    {
        $agent = $request->user();

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:agents,email,' . $agent->id,
            'current_password' => 'required_with:password|string',
            'password' => 'sometimes|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Verify current password if changing password
        if ($request->has('password') && !Hash::check($request->current_password, $agent->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Current password is incorrect'
            ], 422);
        }

        $updateData = $request->only(['name', 'email']);
        
        if ($request->has('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $agent->update($updateData);

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully',
            'data' => [
                'id' => $agent->id,
                'name' => $agent->name,
                'email' => $agent->email,
                'updated_at' => $agent->updated_at,
            ]
        ]);
    }
}
