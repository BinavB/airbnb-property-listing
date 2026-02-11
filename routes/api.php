<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\AgentController;
use App\Http\Controllers\Api\NearbyDestinationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication routes
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/auth/register', [AuthController::class, 'register']);
Route::get('/auth/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

// Public routes
Route::get('/properties', [PropertyController::class, 'index']);
Route::get('/properties/{id}', [PropertyController::class, 'show']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/experiences/{id}', [ExperienceController::class, 'show']);
Route::get('/experiences/categories', [ExperienceController::class, 'categories']);
Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);
Route::get('/services/types', [ServiceController::class, 'types']);
Route::get('/filters', [PropertyController::class, 'filters']);
Route::get('/nearby-destinations', [PropertyController::class, 'nearbyDestinations']);
Route::get('/agents', [AgentController::class, 'index']);
Route::get('/agents/{id}', [AgentController::class, 'show']);

// Protected agent routes
Route::middleware('auth:sanctum')->group(function () {
    // Properties CRUD
    Route::get('/agent/properties', [PropertyController::class, 'agentProperties']);
    Route::post('/agent/properties', [PropertyController::class, 'store']);
    Route::put('/agent/properties/{id}', [PropertyController::class, 'update']);
    Route::delete('/agent/properties/{id}', [PropertyController::class, 'destroy']);
    Route::post('/agent/properties/{id}/price', [PropertyController::class, 'updateAgentPrice']);
    
    // Experiences CRUD
    Route::get('/agent/experiences', [ExperienceController::class, 'agentExperiences']);
    Route::post('/agent/experiences', [ExperienceController::class, 'store']);
    Route::put('/agent/experiences/{id}', [ExperienceController::class, 'update']);
    Route::delete('/agent/experiences/{id}', [ExperienceController::class, 'destroy']);
    
    // Services CRUD
    Route::get('/agent/services', [ServiceController::class, 'agentServices']);
    Route::post('/agent/services', [ServiceController::class, 'store']);
    Route::put('/agent/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/agent/services/{id}', [ServiceController::class, 'destroy']);
    
    // Agent profile
    Route::get('/agent/profile', [AgentController::class, 'profile']);
    Route::put('/agent/profile', [AgentController::class, 'updateProfile']);
});

// Admin routes (future implementation)
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/agents', [AgentController::class, 'index']);
    Route::post('/agents', [AgentController::class, 'store']);
    Route::put('/agents/{id}', [AgentController::class, 'update']);
    Route::delete('/agents/{id}', [AgentController::class, 'destroy']);
    
    Route::get('/properties', [PropertyController::class, 'adminIndex']);
    Route::put('/properties/{id}/approve', [PropertyController::class, 'approve']);
    Route::delete('/properties/{id}', [PropertyController::class, 'adminDestroy']);
    
    Route::get('/experiences', [ExperienceController::class, 'adminIndex']);
    Route::put('/experiences/{id}/approve', [ExperienceController::class, 'approve']);
    Route::delete('/experiences/{id}', [ExperienceController::class, 'adminDestroy']);
    
    Route::get('/services', [ServiceController::class, 'adminIndex']);
    Route::put('/services/{id}/approve', [ServiceController::class, 'approve']);
    Route::delete('/services/{id}', [ServiceController::class, 'adminDestroy']);
});
