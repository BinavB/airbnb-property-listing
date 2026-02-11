<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\ExperienceImage;
use App\Models\ExperienceCategory;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        // Create categories
      

        foreach ($categories as $category) {
            ExperienceCategory::create($category);
        }

        // Create experiences
        $experiences = [
            [
                'title' => 'Traditional Indian Cooking Class',
                'city' => 'Mumbai',
                'country' => 'India',
                'base_price_per_guest' => 2500.00,
                'group_price' => 8000.00,
                'pricing_type' => 'per_group',
                'duration_hours' => 4,
                'max_guests' => 8,
                'category' => 'food_drink',
                'is_original' => true,
                'description' => 'Learn to cook authentic Indian dishes with a local chef',
                'what_included' => 'All ingredients, recipes, and a meal to enjoy together',
                'host_id' => 1,
                'status' => 'active',
            ],
            [
                'title' => 'Heritage Walking Tour',
                'city' => 'Delhi',
                'country' => 'India',
                'base_price_per_guest' => 800.00,
                'pricing_type' => 'per_guest',
                'duration_hours' => 3,
                'max_guests' => 15,
                'category' => 'arts_culture',
                'is_original' => false,
                'description' => 'Explore the rich history of Old Delhi with expert guides',
                'what_included' => 'Guide, entrance fees, and refreshments',
                'host_id' => 2,
                'status' => 'active',
            ],
            [
                'title' => 'Mountain Trekking Adventure',
                'city' => 'Manali',
                'country' => 'India',
                'base_price_per_guest' => 1800.00,
                'pricing_type' => 'per_guest',
                'duration_hours' => 8,
                'max_guests' => 12,
                'category' => 'nature',
                'is_original' => true,
                'description' => 'Trek through the Himalayan mountains with experienced guides',
                'what_included' => 'Equipment, guide, meals, and accommodation',
                'host_id' => 3,
                'status' => 'active',
            ],
            [
                'title' => 'Cricket Coaching Session',
                'city' => 'Bangalore',
                'country' => 'India',
                'base_price_per_guest' => 600.00,
                'pricing_type' => 'per_guest',
                'duration_hours' => 2,
                'max_guests' => 20,
                'category' => 'sports',
                'is_original' => false,
                'description' => 'Professional cricket coaching with former international players',
                'what_included' => 'Equipment, coaching, and refreshments',
                'host_id' => 1,
                'status' => 'active',
            ],
        ];

        foreach ($experiences as $experienceData) {
            $experience = Experience::create($experienceData);
            
            // Add images
            $images = [
                ['image_url' => 'https://via.placeholder.com/400x300?text=Cooking+Class+1', 'is_primary' => true],
                ['image_url' => 'https://via.placeholder.com/400x300?text=Cooking+Class+2', 'is_primary' => false],
            ];
            
            foreach ($images as $imageData) {
                $imageData['experience_id'] = $experience->id;
                ExperienceImage::create($imageData);
            }
        }
    }
}
