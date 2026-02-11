<?php

namespace Database\Seeders;

use App\Models\Agent;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AgentSeeder extends Seeder
{
    public function run(): void
    {
        $agents = [
            [
                'name' => 'John Smith',
                'email' => 'john@agent.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Sarah Johnson',
                'email' => 'sarah@agent.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Michael Brown',
                'email' => 'michael@agent.com',
                'password' => Hash::make('password123'),
            ],
        ];

        foreach ($agents as $agentData) {
            Agent::create($agentData);
        }
    }
}
