<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Rules\UniquePayoutCountries;

class CampaignController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of campaigns with optional filtering by title or status.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $advertiser = $request->user()->advertiser;

        if (!$advertiser) {
            return response()->json(['error' => 'No associated advertiser found.'], 403);
        }

        $query = $advertiser->campaigns()->with('payouts');

        if ($request->filled('title')) {
            $query->where('title', 'LIKE', '%'.$request->title.'%');
        }

        if ($request->filled('activity_status')) {
            $query->where('activity_status', $request->activity_status);
        }

        $perPage = $request->get('per_page', 10);

        $campaigns = $query->paginate($perPage);

        return response()->json($campaigns);
    }

    /**
     * Store a newly created campaign with payouts.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();
        $advertiser = $user->advertiser;

        if (!$advertiser) {
            return response()->json(['error' => 'No associated advertiser found.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'title'                => 'required|string|max:255',
            'landing_page_url'     => 'required|url',
            'payouts'              => ['sometimes', 'array', 'min:1', new UniquePayoutCountries],
            'payouts.*.country'    => 'required|in:Estonia,Spain,Bulgaria',
            'payouts.*.payout_value' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $campaign = Campaign::create([
            'advertiser_id'     => $advertiser->id,
            'title'             => $request->title,
            'landing_page_url'  => $request->landing_page_url,
            'activity_status'   => 'paused',
        ]);

        foreach ($request->payouts as $payout) {
            $campaign->payouts()->create($payout);
        }

        return response()->json($campaign->load('payouts'), 201);
    }

    /**
     * Show the specified campaign.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id): JsonResponse
    {
        $campaign = Campaign::findOrFail($id);

        $this->authorize('view', $campaign);

        return response()->json($campaign);
    }

    /**
     * Update the specified campaign's details (title, URL) or payouts.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id): JsonResponse
    {
        $campaign = Campaign::findOrFail($id);

        $this->authorize('update', $campaign);

        $validator = Validator::make($request->all(), [
            'title'                => 'sometimes|string|max:255',
            'landing_page_url'     => 'sometimes|url',
            'payouts'              => 'sometimes|array|min:1',
            'payouts.*.country'    => 'required_with:payouts|in:Estonia,Spain,Bulgaria',
            'payouts.*.payout_value' => 'required_with:payouts|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $campaign->update($request->only(['title', 'landing_page_url']));

        if ($request->has('payouts')) {
            $campaign->payouts()->delete();
            foreach ($request->payouts as $payout) {
                $campaign->payouts()->create($payout);
            }
        }

        return response()->json($campaign->load('payouts'));
    }

    /**
     * Update campaign status (activate or pause).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        $campaign = Campaign::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'activity_status' => 'required|in:active,paused'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $campaign->activity_status = $request->activity_status;
        $campaign->save();

        return response()->json($campaign);
    }

    /**
     * Remove the specified campaign.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        $campaign = Campaign::findOrFail($id);

        $this->authorize('delete', $campaign);

        $campaign->delete();

        return response()->json(['message' => 'Campaign deleted successfully.']);
    }
}
