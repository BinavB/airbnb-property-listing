<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AgentExperience extends Model
{
    use HasFactory;

    protected $connection = 'agents_db';
    protected $fillable = [
        'agent_id', 'experience_id', 'agent_price_per_guest', 'agent_group_price'
    ];
    protected $casts = [
        'agent_price_per_guest' => 'decimal:2',
        'agent_group_price' => 'decimal:2',
    ];

    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }

    public function experience(): BelongsTo
    {
        return $this->belongsTo(Experience::class);
    }
}
