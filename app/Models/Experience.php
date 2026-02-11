<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Experience extends Model
{
    use HasFactory;

    protected $connection = 'experiences_db';
    protected $fillable = [
        'title', 'city', 'country', 'base_price_per_guest', 'group_price',
        'pricing_type', 'duration_hours', 'max_guests', 'category',
        'is_original', 'description', 'what_included', 'host_id', 'status'
    ];
    protected $casts = [
        'base_price_per_guest' => 'decimal:2',
        'group_price' => 'decimal:2',
        'is_original' => 'boolean',
    ];

    public function experienceImages(): HasMany
    {
        return $this->hasMany(ExperienceImage::class);
    }

    public function primaryImage(): BelongsTo
    {
        return $this->hasOne(ExperienceImage::class)->where('is_primary', true);
    }

    public function host(): BelongsTo
    {
        return $this->belongsTo(Agent::class, 'host_id');
    }
}
