<?php

namespace Database\Seeders;

use App\Models\Service;
use App\Models\ServiceImage;
use App\Models\ServiceType;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        // Create service types
        $serviceTypes = [
            ['name' => 'Photography', 'slug' => 'photography', 'icon_url' => 'https://via.placeholder.com/100x100?text=📸', 'count' => 5, 'description' => 'Professional photography services'],
            ['name' => 'Chefs', 'slug' => 'chefs', 'icon_url' => 'https://via.placeholder.com/100x100?text=👨‍🍳', 'count' => 6, 'description' => 'Professional chef services'],
            ['name' => 'Massage', 'slug' => 'massage', 'icon_url' => 'https://via.placeholder.com/100x100?text=💆', 'count' => 1, 'description' => 'Relaxing massage treatments'],
            ['name' => 'Training', 'slug' => 'training', 'icon_url' => 'https://via.placeholder.com/100x100?text=🏋️', 'count' => 3, 'description' => 'Fitness and training programs'],
            ['name' => 'Spa Treatments', 'slug' => 'spa_treatments', 'icon_url' => 'https://via.placeholder.com/100x100?text=🧖', 'count' => 1, 'description' => 'Luxury spa treatments'],
            ['name' => 'Catering', 'slug' => 'catering', 'icon_url' => 'https://via.placeholder.com/100x100?text=🍽', 'count' => 3, 'description' => 'Professional catering services'],
            ['name' => 'Prepared Meals', 'slug' => 'prepared_meals', 'icon_url' => 'https://via.placeholder.com/100x100?text=🥘', 'count' => 0, 'description' => 'Home-cooked meal delivery'],
            ['name' => 'Makeup', 'slug' => 'makeup', 'icon_url' => 'https://via.placeholder.com/100x100?text=💄', 'count' => 0, 'description' => 'Professional makeup services'],
            ['name' => 'Hair', 'slug' => 'hair', 'icon_url' => 'https://via.placeholder.com/100x100?text=💇', 'count' => 0, 'description' => 'Hair styling and treatments'],
            ['name' => 'Nails', 'slug' => 'nails', 'icon_url' => 'https://via.placeholder.com/100x100?text=💅', 'count' => 0, 'description' => 'Nail care and art'],
        ];

        foreach ($serviceTypes as $serviceType) {
            ServiceType::create($serviceType);
        }

        // Create services
        $services = [
            [
                'title' => 'Professional Photoshoot',
                'city' => 'Mumbai',
                'country' => 'India',
                'base_price_per_guest' => 3000.00,
                'min_booking_amount' => 6000.00,
                'pricing_type' => 'per_session',
                'duration_minutes' => 120,
                'service_type' => 'photography',
                'provider_id' => 1,
                'description' => 'Professional photoshoot with editing and retouching',
                'what_included' => 'Photographer, equipment, editing, and 20 digital photos',
                'availability_status' => 'available',
                'status' => 'active',
            ],
            [
                'title' => 'Private Chef Experience',
                'city' => 'Delhi',
                'country' => 'India',
                'base_price_per_guest' => 500.00,
                'pricing_type' => 'per_guest',
                'duration_minutes' => 180,
                'service_type' => 'chefs',
                'provider_id' => 2,
                'description' => 'Private dining experience with a professional chef',
                'what_included' => 'Chef, ingredients, cooking, and a 3-course meal',
                'availability_status' => 'available',
                'status' => 'active',
            ],
            [
                'title' => 'Couples Massage Therapy',
                'city' => 'Goa',
                'country' => 'India',
                'base_price_per_guest' => 2500.00,
                'min_booking_amount' => 5000.00,
                'pricing_type' => 'per_session',
                'duration_minutes' => 90,
                'service_type' => 'massage',
                'provider_id' => 3,
                'description' => 'Relaxing couples massage in a spa setting',
                'what_included' => 'Massage therapists, oils, and refreshments',
                'availability_status' => 'available',
                'status' => 'active',
            ],
            [
                'title' => 'Personal Training Session',
                'city' => 'Bangalore',
                'country' => 'India',
                'base_price_per_guest' => 800.00,
                'pricing_type' => 'per_session',
                'duration_minutes' => 60,
                'service_type' => 'training',
                'provider_id' => 1,
                'description' => 'One-on-one personal training with certified trainers',
                'what_included' => 'Trainer, equipment, and personalized workout plan',
                'availability_status' => 'available',
                'status' => 'active',
            ],
        ];

        foreach ($services as $serviceData) {
            $service = Service::create($serviceData);
            
            // Add images
            $images = [
                ['image_url' => 'https://via.placeholder.com/400x300?text=Service+1', 'is_primary' => true],
                ['image_url' => 'https://via.placeholder.com/400x300?text=Service+2', 'is_primary' => false],
            ];
            
            foreach ($images as $imageData) {
                $imageData['service_id'] = $service->id;
                ServiceImage::create($imageData);
            }
        }
    }
}
