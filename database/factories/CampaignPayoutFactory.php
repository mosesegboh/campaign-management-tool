<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CampaignPayout;
use App\Models\Campaign;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CampaignPayout>
 */
class CampaignPayoutFactory extends Factory
{
    protected $model = CampaignPayout::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $countries = ['Estonia', 'Spain', 'Bulgaria'];

        return [
            'campaign_id'  => Campaign::factory(),
            'country'      => $this->faker->randomElement($countries),
            'payout_value' => $this->faker->randomFloat(2, 50, 500),
        ];
    }
}
