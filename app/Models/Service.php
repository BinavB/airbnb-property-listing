<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    use HasFactory;

    protected $connection = 'services_db';
    protected $fillable = [
        'title', 'city', 'country', 'base_price_per_guest', 'min_booking_amount',
        'pricing_type', 'duration_minutes', 'service_type', 'provider_id',
        'description', 'what_included', 'availability_status', 'status'
    ];
    protected $casts = [
        'base_price_per_guest' => 'decimal:2',
        'min_booking_amount' => 'decimal:2',
    ];

    public function serviceImages(): HasMany
    {
        return $this->hasMany(ServiceImage::class);
    }

    public function primaryImage(): BelongsTo
    {
        return $this->hasOne(ServiceImage::class)->where('is_primary', true);
    }

    public function provider(): BelongsTo
    {
        return $this->belongsTo(Agent::class, 'provider_id');
    }
}
