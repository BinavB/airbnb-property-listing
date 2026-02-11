<?php

namespace Database\Seeders;

use App\Models\Property;
use App\Models\PropertyImage;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    public function run(): void
    {
        $properties = [
            [
                'title' => 'Beach House in Canacona',
                'city' => 'Canacona',
                'state' => 'Goa',
                'base_price' => 12000.00,
                'price_per_night' => 12000.00,
                'min_nights' => 2,
                'property_type' => 'beach_house',
                'beds' => 2,
                'bedrooms' => 1,
                'bathrooms' => 1,
                'rating' => 4.8,
                'total_reviews' => 127,
                'is_guest_favorite' => true,
                'status' => 'active',
                'agent_id' => 1,
                'description' => 'Beautiful beach house in Canacona with stunning ocean views',
                'amenities' => json_encode(['wifi', 'kitchen', 'parking', 'beach_access']),
                'images' => [
                    ['image_url' => 'https://picsum.photos/400/300?random=1', 'is_primary' => true],
                    ['image_url' => 'https://picsum.photos/400/300?random=2', 'is_primary' => false],
                ]
            ],
            [
                'title' => 'Luxury Villa in South Goa',
                'city' => 'South Goa',
                'state' => 'Goa',
                'base_price' => 15000.00,
                'price_per_night' => 15000.00,
                'min_nights' => 2,
                'property_type' => 'villa',
                'beds' => 3,
                'bedrooms' => 2,
                'bathrooms' => 2,
                'rating' => 4.9,
                'total_reviews' => 89,
                'is_guest_favorite' => true,
                'status' => 'active',
                'agent_id' => 1,
                'description' => 'Luxury villa with private pool and garden in South Goa',
                'amenities' => json_encode(['wifi', 'pool', 'kitchen', 'parking', 'garden']),
                'images' => [
                    ['image_url' => 'https://picsum.photos/400/300?random=3', 'is_primary' => true],
                    ['image_url' => 'https://picsum.photos/400/300?random=4', 'is_primary' => false],
                ]
            ],
            [
                'title' => 'Modern Apartment in Majorda',
                'city' => 'Majorda',
                'state' => 'Goa',
                'base_price' => 8000.00,
                'price_per_night' => 8000.00,
                'min_nights' => 1,
                'property_type' => 'apartment',
                'beds' => 2,
                'bedrooms' => 1,
                'bathrooms' => 1,
                'rating' => 4.7,
                'total_reviews' => 56,
                'is_guest_favorite' => false,
                'status' => 'active',
                'agent_id' => 1,
                'description' => 'Modern apartment with modern amenities in Majorda',
                'amenities' => json_encode(['wifi', 'kitchen', 'ac', 'parking']),
                'images' => [
                    ['image_url' => 'https://picsum.photos/400/300?random=5', 'is_primary' => true],
                    ['image_url' => 'https://picsum.photos/400/300?random=6', 'is_primary' => false],
                ]
            ],
            [
                'title' => 'Heritage House in Old Goa',
                'city' => 'Old Goa',
                'state' => 'Goa',
                'base_price' => 10000.00,
                'price_per_night' => 10000.00,
                'min_nights' => 2,
                'property_type' => 'house',
                'beds' => 4,
                'bedrooms' => 2,
                'bathrooms' => 2,
                'rating' => 4.6,
                'total_reviews' => 203,
                'is_guest_favorite' => true,
                'status' => 'active',
                'agent_id' => 2,
                'description' => 'Heritage house with Portuguese architecture in Old Goa',
                'amenities' => json_encode(['wifi', 'kitchen', 'parking', 'heritage_view']),
                'images' => [
                    ['image_url' => 'https://picsum.photos/400/300?random=7', 'is_primary' => true],
                    ['image_url' => 'https://picsum.photos/400/300?random=8', 'is_primary' => false],
                ]
            ],
            [
                'title' => 'Beach Cottage in Palolem',
                'city' => 'Palolem',
                'state' => 'Goa',
                'base_price' => 6000.00,
                'price_per_night' => 6000.00,
                'min_nights' => 1,
                'property_type' => 'cottage',
                'beds' => 2,
                'bedrooms' => 1,
                'bathrooms' => 1,
                'rating' => 4.5,
                'total_reviews' => 78,
                'is_guest_favorite' => false,
                'status' => 'active',
                'agent_id' => 2,
                'description' => 'Cozy beach cottage near Palolem beach',
                'amenities' => json_encode(['wifi', 'kitchen', 'beach_access', 'parking']),
                'images' => [
                    ['image_url' => 'https://picsum.photos/400/300?random=9', 'is_primary' => true],
                    ['image_url' => 'https://picsum.photos/400/300?random=10', 'is_primary' => false],
                ]
            ],
            [
                'title' => 'Penthouse in Panjim',
                'city' => 'Panjim',
                'state' => 'Goa',
                'base_price' => 18000.00,
                'price_per_night' => 18000.00,
                'min_nights' => 3,
                'property_type' => 'penthouse',
                'beds' => 4,
                'bedrooms' => 3,
                'bathrooms' => 3,
                'rating' => 4.9,
                'total_reviews' => 45,
                'is_guest_favorite' => true,
                'status' => 'active',
                'agent_id' => 2,
                'description' => 'Luxury penthouse with city views in Panjim',
                'amenities' => json_encode(['wifi', 'pool', 'gym', 'parking', 'city_view']),
                'images' => [
                    ['image_url' => 'https://picsum.photos/400/300?random=11', 'is_primary' => true],
                    ['image_url' => 'https://picsum.photos/400/300?random=12', 'is_primary' => false],
                ]
            ],
        ];

        foreach ($properties as $propertyData) {
            $images = $propertyData['images'];
            unset($propertyData['images']);
            
            $property = Property::create($propertyData);
            
            foreach ($images as $imageData) {
                $imageData['property_id'] = $property->id;
                PropertyImage::create($imageData);
            }
        }
    }
}
