<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Attributes\Controllers\Authorize;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    #[Authorize('dashboard.view')]
    public function index(): Response
    {
        return Inertia::render('dashboard', []);
    }
}
