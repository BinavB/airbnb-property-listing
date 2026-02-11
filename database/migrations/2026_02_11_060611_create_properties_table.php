<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('city', 100);
            $table->string('state', 100);
            $table->decimal('base_price', 10, 2);
            $table->decimal('price_per_night', 10, 2);
            $table->integer('min_nights')->default(1);
            $table->enum('property_type', ['apartment', 'house', 'villa', 'studio', 'beach_house', 'cottage', 'penthouse']);
            $table->integer('beds');
            $table->integer('bedrooms');
            $table->integer('bathrooms');
            $table->decimal('rating', 3, 1);
            $table->integer('total_reviews')->default(0);
            $table->boolean('is_guest_favorite')->default(false);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->unsignedBigInteger('agent_id')->nullable();
            $table->text('description')->nullable();
            $table->json('amenities')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('city', 'idx_city');
            $table->index('property_type', 'idx_property_type');
            $table->index('status', 'idx_status');
            $table->index('agent_id', 'idx_agent_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
