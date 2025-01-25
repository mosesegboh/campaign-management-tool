<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Advertiser;
use App\Models\Campaign;

class CampaignAuthorizationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that an authenticated user with an advertiser can create a campaign.
     */
    public function test_authenticated_user_can_create_campaign()
    {
        $user = User::factory()->create();
        $advertiser = Advertiser::factory()->create([
            'user_id' => $user->id,
        ]);

        $this->actingAs($user, 'sanctum');

        $campaignData = [
            'advertiser_id'     => $advertiser->id,
            'title'             => 'New Campaign',
            'landing_page_url'  => 'https://example.com/landing',
            'payouts'           => [
                ['country' => 'Estonia', 'payout_value' => 100.00],
                ['country' => 'Spain', 'payout_value' => 150.00],
            ],
        ];

        $response = $this->postJson('/api/campaigns', $campaignData);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'title' => 'New Campaign',
                'landing_page_url' => 'https://example.com/landing',
                'activity_status' => 'paused',
            ]);

        $this->assertDatabaseHas('campaigns', [
            'title' => 'New Campaign',
            'advertiser_id' => $advertiser->id,
        ]);

        $this->assertDatabaseHas('campaign_payouts', [
            'country' => 'Estonia',
            'payout_value' => 100.00,
        ]);

        $this->assertDatabaseHas('campaign_payouts', [
            'country' => 'Spain',
            'payout_value' => 150.00,
        ]);
    }


    /**
     * Test that an authenticated user can view their own campaigns.
     */
    public function test_authenticated_user_can_view_their_campaigns()
    {
        $userA = User::factory()->create();
        $advertiserA = Advertiser::factory()->create([
            'user_id' => $userA->id,
        ]);

        $userB = User::factory()->create();
        $advertiserB = Advertiser::factory()->create([
            'user_id' => $userB->id,
        ]);

        $campaignA = Campaign::factory()->create([
            'advertiser_id' => $advertiserA->id,
            'title' => 'User A Campaign',
        ]);

        $campaignB = Campaign::factory()->create([
            'advertiser_id' => $advertiserB->id,
            'title' => 'User B Campaign',
        ]);

        $this->actingAs($userA, 'sanctum');

        $response = $this->getJson('/api/campaigns');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'title' => 'User A Campaign',
            ])
            ->assertJsonMissing([
                'title' => 'User B Campaign',
            ]);
    }

    /**
     * Test that an authenticated user cannot view others' campaigns.
     */
    public function test_authenticated_user_cannot_view_others_campaigns()
    {
        $userA = User::factory()->create();
        $advertiserA = Advertiser::factory()->create([
            'user_id' => $userA->id,
        ]);

        $userB = User::factory()->create();
        $advertiserB = Advertiser::factory()->create([
            'user_id' => $userB->id,
        ]);

        $campaignB = Campaign::factory()->create([
            'advertiser_id' => $advertiserB->id,
            'title' => 'User B Campaign',
        ]);

        $this->actingAs($userA, 'sanctum');

        $response = $this->getJson("/api/campaigns/{$campaignB->id}");

        $response->assertStatus(403);
    }


    /**
     * Test that an authenticated user can update their own campaign.
     */
    public function test_authenticated_user_can_update_their_campaign()
    {
        $user = User::factory()->create();
        $advertiser = Advertiser::factory()->create([
            'user_id' => $user->id,
        ]);

        $campaign = Campaign::factory()->create([
            'advertiser_id' => $advertiser->id,
            'title' => 'Original Title',
        ]);

        $this->actingAs($user, 'sanctum');

        $updateData = [
            'title' => 'Updated Campaign Title',
            'activity_status' => 'active',
        ];

        $response = $this->putJson("/api/campaigns/{$campaign->id}", $updateData);

        $response->assertStatus(200)
        ->assertJsonFragment([
            'title' => 'Updated Campaign Title',
        ]);

        $this->assertDatabaseHas('campaigns', [
            'id' => $campaign->id,
            'title' => 'Updated Campaign Title',
        ]);
    }

    /**
     * Test that an authenticated user cannot update others' campaigns.
     */
    public function test_authenticated_user_cannot_update_others_campaigns()
    {
        $userA = User::factory()->create();
        $advertiserA = Advertiser::factory()->create([
            'user_id' => $userA->id,
        ]);

        $userB = User::factory()->create();
        $advertiserB = Advertiser::factory()->create([
            'user_id' => $userB->id,
        ]);

        $campaignB = Campaign::factory()->create([
            'advertiser_id' => $advertiserB->id,
            'title' => 'User B Campaign',
        ]);

        $this->actingAs($userA, 'sanctum');

        $updateData = [
            'title' => 'Malicious Update',
        ];

        $response = $this->putJson("/api/campaigns/{$campaignB->id}", $updateData);

        $response->assertStatus(403);

        $this->assertDatabaseMissing('campaigns', [
            'id' => $campaignB->id,
            'title' => 'Malicious Update',
        ]);
    }

    /**
     * Test that a user without an advertiser cannot create a campaign.
     */
    public function test_user_without_advertiser_cannot_create_campaign()
    {
        $user = User::factory()->create();

        $this->actingAs($user, 'sanctum');

        $campaignData = [
            'title'             => 'New Campaign',
            'landing_page_url'  => 'https://example.com/landing',
            'payouts'           => [
                ['country' => 'Estonia', 'payout_value' => 100.00],
            ],
        ];

        $response = $this->postJson('/api/campaigns', $campaignData);

        $response->assertStatus(403)
            ->assertJsonFragment([
                'error' => 'No associated advertiser found.',
            ]);

        $this->assertDatabaseMissing('campaigns', [
            'title' => 'New Campaign',
        ]);
    }

    /**
     * Test that unauthenticated users cannot access campaign routes.
     */
    public function test_unauthenticated_users_cannot_access_campaign_routes()
    {
        $response = $this->getJson('/api/campaigns');
        $response->assertStatus(401);

        $campaignData = [
            'title'             => 'Unauthorized Campaign',
            'landing_page_url'  => 'https://example.com/landing',
            'payouts'           => [
                ['country' => 'Estonia', 'payout_value' => 100.00],
            ],
        ];

        $response = $this->postJson('/api/campaigns', $campaignData);
        $response->assertStatus(401);
    }


    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
