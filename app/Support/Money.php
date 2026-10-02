<?php

namespace App\Support;

/**
 * Handles monetary value rounding and formatting.
 */
class Money
{
    /**
     * Format amount value to specified precision and a thousand separator
     */
    public static function format(float|int $amount, int $decimals = 2, string $thousands_separator = ','): string
    {
        return number_format($amount, $decimals, '.', $thousands_separator);
    }

    /**
     * Sanitize amount value to specified precision
     */
    public static function sanitize(float|int $amount, int $decimals = 2): float
    {
        return round($amount, $decimals);
    }
}
