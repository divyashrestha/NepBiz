<?php

if (! function_exists('print_array')) {
    function print_a(mixed $array): void
    {
        echo '<pre>';
        print_r($array);
        echo '</pre>';
    }
}

if (! function_exists('print_b')) {
    function print_b(mixed $array): void
    {
        print_a($array);
        exit;
    }
}
