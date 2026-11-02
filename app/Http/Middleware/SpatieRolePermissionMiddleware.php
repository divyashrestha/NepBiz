<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Symfony\Component\HttpFoundation\Response;

class SpatieRolePermissionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        $permission = $request->route()->getName();

        // this is for guest
        if (! $user) {
            return redirect()->route('login');
        }

        // this is for super admin
        if ($user->hasRole('Super Admin')) {
            return $next($request);
        }

        // for those permissions that are not created
        if (! Permission::whereName($permission)->exists()) {
            return $next($request);
        }

        $permissions = $user->getAllPermissions()->pluck('name');
        if (! $permissions->contains($permission)) {
            abort(403, 'Unauthorized.');
        }

        return $next($request);
    }
}
