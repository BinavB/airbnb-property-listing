<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AgentProperty extends Model
{
    protected $connection = 'agents_db';
    
    protected $fillable = [
        'agent_id',
        'property_id',
        'agent_price'
    ];

    protected $casts = [
        'agent_price' => 'decimal:2'
    ];

    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class, 'property_id');
    }
}
