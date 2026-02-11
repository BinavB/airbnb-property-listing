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
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('city', 100);
            $table->string('country', 100);
            $table->decimal('base_price_per_guest', 10, 2);
            $table->decimal('group_price', 10, 2)->nullable();
            $table->enum('pricing_type', ['per_guest', 'per_group'])->default('per_guest');
            $table->integer('duration_hours');
            $table->integer('max_guests')->default(10);
            $table->string('category', 50);
            $table->boolean('is_original')->default(false);
            $table->text('description');
            $table->text('what_included');
            $table->unsignedBigInteger('host_id');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index('city');
            $table->index('category');
            $table->index('is_original');
            $table->index('host_id');
        });

        Schema::create('experience_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('experience_id');
            $table->string('image_url', 500);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
            
            $table->foreign('experience_id')->references('id')->on('experiences')->onDelete('cascade');
            $table->index('experience_id');
        });

        Schema::create('experience_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->string('slug', 100)->unique();
            $table->string('icon', 50);
            $table->text('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('experience_images');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('experience_categories');
    }
};
