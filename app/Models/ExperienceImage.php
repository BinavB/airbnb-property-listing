<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExperienceImage extends Model
{
    use HasFactory;

    protected $connection = 'experiences_db';
    protected $fillable = [
        'experience_id', 'image_url', 'is_primary'
    ];
    protected $casts = [
        'is_primary' => 'boolean',
    ];

    public function experience(): BelongsTo
    {
        return $this->belongsTo(Experience::class);
    }
}
