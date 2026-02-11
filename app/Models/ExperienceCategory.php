<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExperienceCategory extends Model
{
    use HasFactory;

    protected $connection = 'experiences_db';
    protected $fillable = [
        'name', 'slug', 'icon', 'description'
    ];
}
