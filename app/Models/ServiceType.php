<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
    use HasFactory;

    protected $connection = 'services_db';
    protected $fillable = [
        'name', 'slug', 'icon_url', 'count', 'description'
    ];
}
