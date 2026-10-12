<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class HelperServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $helperDir = app_path('Helpers');
        /** @var list<string> $files */
        $files = glob($helperDir.'/*.php') ?: [];
        foreach ($files as $file) {
            require_once $file;
        }
    }
}
