<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AgentService extends Model
{
    use HasFactory;

    protected $connection = 'agents_db';
    protected $fillable = [
        'agent_id', 'service_id', 'agent_price_per_guest', 'agent_min_booking'
    ];
    protected $casts = [
        'agent_price_per_guest' => 'decimal:2',
        'agent_min_booking' => 'decimal:2',
    ];

    public function agent(): BelongsTo
    {
        return $this->belongsTo(Agent::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
