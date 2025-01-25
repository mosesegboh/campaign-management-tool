<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Campaign;
use App\Models\Advertiser;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Campaign>
 */
class CampaignFactory extends Factory
{
    protected $model = Campaign::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['active', 'paused'];

        return [
            'advertiser_id'   => Advertiser::factory(),
            'title'           => $this->faker->sentence(3),
            'landing_page_url'=> $this->faker->url(),
            'activity_status' => $this->faker->randomElement($statuses),
        ];
    }
}
