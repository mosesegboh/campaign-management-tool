<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CampaignPayout;
use App\Models\Campaign;

class CampaignPayoutSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $campaigns = Campaign::all();

        foreach ($campaigns as $campaign) {
            CampaignPayout::factory()->count(3)->create([
                'campaign_id' => $campaign->id,
            ]);
        }
    }
}
