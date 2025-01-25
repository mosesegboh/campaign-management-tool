<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('campaign_payouts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('campaign_id');
            // We store the country as an enum or string. For simplicity we use enum.
            $table->enum('country', ['Estonia', 'Spain', 'Bulgaria']);
            $table->decimal('payout_value', 8, 2); // e.g. up to 999,999.99
            $table->timestamps();

            $table->foreign('campaign_id')
                ->references('id')
                ->on('campaigns')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaign_payouts');
    }
};
