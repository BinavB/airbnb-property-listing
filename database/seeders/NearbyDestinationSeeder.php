<?php

namespace Database\Seeders;

use App\Models\NearbyDestination;
use Illuminate\Database\Seeder;

class NearbyDestinationSeeder extends Seeder
{
    public function run(): void
    {
        $destinations = [
            [
                'name' => 'North Goa',
                'state' => 'Goa',
                'description' => 'Popular beach destination',
                'icon' => '🏖️',
                'type' => 'beach',
                'is_popular' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Puducherry',
                'state' => 'Puducherry',
                'description' => 'For sights like Sri Aurobindo Ashram',
                'icon' => '🏖️',
                'type' => 'spiritual',
                'is_popular' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Mysore',
                'state' => 'Karnataka',
                'description' => 'Great for a weekend getaway',
                'icon' => '🏛️',
                'type' => 'heritage',
                'is_popular' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Ooty',
                'state' => 'Tamil Nadu',
                'description' => 'For nature lovers',
                'icon' => '⛰️',
                'type' => 'hill_station',
                'is_popular' => true,
                'sort_order' => 4
            ],
            [
                'name' => 'South Goa',
                'state' => 'Goa',
                'description' => 'Popular beach destination',
                'icon' => '🌴',
                'type' => 'beach',
                'is_popular' => true,
                'sort_order' => 5
            ],
            [
                'name' => 'Mumbai',
                'state' => 'Maharashtra',
                'description' => 'For sights like Gateway of India',
                'icon' => '🏙️',
                'type' => 'city',
                'is_popular' => true,
                'sort_order' => 6
            ],
            [
                'name' => 'Bangalore',
                'state' => 'Karnataka',
                'description' => 'Silicon Valley of India',
                'icon' => '🏢',
                'type' => 'city',
                'is_popular' => false,
                'sort_order' => 7
            ],
            [
                'name' => 'Kerala Backwaters',
                'state' => 'Kerala',
                'description' => 'Serene houseboat experiences',
                'icon' => '🚤',
                'type' => 'backwater',
                'is_popular' => false,
                'sort_order' => 8
            ],
            [
                'name' => 'Jaipur',
                'state' => 'Rajasthan',
                'description' => 'Pink City with rich heritage',
                'icon' => '🏰',
                'type' => 'heritage',
                'is_popular' => false,
                'sort_order' => 9
            ],
            [
                'name' => 'Rishikesh',
                'state' => 'Uttarakhand',
                'description' => 'Yoga and adventure capital',
                'icon' => '🧘',
                'type' => 'spiritual',
                'is_popular' => false,
                'sort_order' => 10
            ]
        ];

        foreach ($destinations as $destination) {
            NearbyDestination::create($destination);
        }
    }
}
