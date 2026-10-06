<?php

if (! function_exists('print_array')) {
    /**
     * @param  array<string,mixed>  $array
     */
    function print_a(array $array): void
    {
        echo '<pre>';
        print_r($array);
    }
}

if (! function_exists('print_b')) {
    /**
     * @param  array<string,mixed>  $array
     */
    function print_b(array $array): void
    {
        print_a($array);
        exit;
    }
}

if (! function_exists('console_log')) {
    /**
     * @param  array<string,mixed>  $array
     */
    function console_log(array $array): void
    {
        logger('console log', $array);
    }
}
