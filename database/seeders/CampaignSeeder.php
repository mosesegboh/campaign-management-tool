<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Campaign;
use App\Models\Advertiser;

class CampaignSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $advertisers = Advertiser::all();

        foreach ($advertisers as $advertiser) {
            Campaign::factory()->count(5)->create([
                'advertiser_id' => $advertiser->id,
            ]);
        }
    }
}
