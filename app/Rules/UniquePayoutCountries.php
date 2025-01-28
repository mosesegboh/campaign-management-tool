<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UniquePayoutCountries implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value)) {
            $fail('The ' . $attribute . ' must be an array.');
            return;
        }

        if (count($value) > 3) {
            $fail('A maximum of 3 payouts are allowed.');
        }

        $countries = array_map(function ($payout) {
            return strtolower(trim($payout['country'] ?? ''));
        }, $value);

        if (count($countries) !== count(array_unique($countries))) {
            $fail('Each payout must have a unique country.');
        }
    }
}
