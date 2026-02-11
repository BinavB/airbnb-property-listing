<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    protected $fillable = [
        'title',
        'city',
        'state',
        'base_price',
        'price_per_night',
        'min_nights',
        'property_type',
        'beds',
        'bedrooms',
        'bathrooms',
        'rating',
        'total_reviews',
        'is_guest_favorite',
        'status',
        'agent_id',
        'description',
        'amenities'
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'price_per_night' => 'decimal:2',
        'min_nights' => 'integer',
        'beds' => 'integer',
        'bedrooms' => 'integer',
        'bathrooms' => 'integer',
        'rating' => 'decimal:1',
        'total_reviews' => 'integer',
        'is_guest_favorite' => 'boolean',
        'agent_id' => 'integer',
        'amenities' => 'array'
    ];

    public function propertyImages(): HasMany
    {
        return $this->hasMany(PropertyImage::class);
    }

    public function primaryImage()
    {
        return $this->hasOne(PropertyImage::class)->where('is_primary', true);
    }
}
