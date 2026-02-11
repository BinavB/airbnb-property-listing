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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('city', 100);
            $table->string('country', 100);
            $table->decimal('base_price_per_guest', 10, 2);
            $table->decimal('min_booking_amount', 10, 2)->nullable();
            $table->enum('pricing_type', ['per_guest', 'per_session'])->default('per_guest');
            $table->integer('duration_minutes');
            $table->string('service_type', 50);
            $table->unsignedBigInteger('provider_id');
            $table->text('description');
            $table->text('what_included');
            $table->enum('availability_status', ['available', 'coming_soon', 'unavailable'])->default('available');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index('city');
            $table->index('service_type');
            $table->index('availability_status');
            $table->index('provider_id');
        });

        Schema::create('service_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id');
            $table->string('image_url', 500);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();
            
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
            $table->index('service_id');
        });

        Schema::create('service_types', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->string('slug', 100)->unique();
            $table->string('icon_url', 500);
            $table->integer('count')->default(0);
            $table->text('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_images');
        Schema::dropIfExists('services');
        Schema::dropIfExists('service_types');
    }
};
