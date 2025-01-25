<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Campaign
 *
 * Represents a marketing campaign associated with an advertiser.
 *
 * @package App\Models
 *
 * @property int $id
 * @property int $advertiser_id
 * @property string $title
 * @property string $landing_page_url
 * @property string $activity_status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 *
 * @property-read \App\Models\Advertiser $advertiser
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CampaignPayout[] $payouts
 */
class Campaign extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'advertiser_id',
        'title',
        'landing_page_url',
        'activity_status',
    ];

    /**
     * Get the advertiser that owns the campaign.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo<\App\Models\Advertiser, \App\Models\Campaign>
     */
    public function advertiser(): BelongsTo
    {
        return $this->belongsTo(Advertiser::class);
    }

    /**
     * Get the payouts associated with the campaign.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<\App\Models\CampaignPayout>
     */
    public function payouts(): HasMany
    {
        return $this->hasMany(CampaignPayout::class);
    }
}
