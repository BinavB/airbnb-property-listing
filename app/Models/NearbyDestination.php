<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NearbyDestination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'state',
        'description',
        'icon',
        'type',
        'is_popular',
        'sort_order'
    ];

    protected $casts = [
        'is_popular' => 'boolean',
        'sort_order' => 'integer'
    ];

    public function scopePopular($query)
    {
        return $query->where('is_popular', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order');
    }
}
