<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Attributes\Controllers\Authorize;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    #[Authorize('roles.view')]
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $roles = Role::query()
            ->withCount('permissions', 'users')
            ->when($search, fn ($query, $search) => $query->whereAny(['name'], 'like', '%'.$search.'%'))
            ->latest()
            ->paginate(10)
            ->onEachSide(2)
            ->withQueryString();

        return Inertia::render('roles/index', [
            'roles' => $roles,
            'filters' => ['search' => $search],
            'stats' => [
                'used' => Role::has('users')->count(),
                'unused' => Role::doesntHave('users')->count(),
            ],
        ]);
    }

    #[Authorize('roles.create')]
    public function create(): Response
    {
        return Inertia::render('roles/create', [
            'permissions' => Permission::all(['id', 'name']),
        ]);
    }

    #[Authorize('roles.create')]
    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'unique:roles'],
            'permissions' => ['array'],
        ]);

        $role = Role::create([
            'name' => $data['name'],
        ]);

        $role->syncPermissions(
            $data['permissions'] ?? []
        );

        return redirect()
            ->route('roles.index');
    }

    #[Authorize('roles.view')]
    public function show(Role $role): Response
    {
        $role->load('permissions', 'users');

        return Inertia::render('roles/show', [
            'role' => $role,
        ]);
    }

    #[Authorize('roles.update')]
    public function edit(Role $role): Response
    {
        return Inertia::render('roles/edit', [
            'role' => $role->load('permissions'),
            'permissions' => Permission::all(),
        ]);
    }

    #[Authorize('roles.update')]
    public function update(Request $request, Role $role): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required'],
            'permissions' => ['array'],
        ]);

        $role->update([
            'name' => $data['name'],
        ]);

        $role->syncPermissions(
            $data['permissions'] ?? []
        );

        return redirect()
            ->route('roles.index');
    }

    #[Authorize('roles.delete')]
    public function destroy(Role $role): RedirectResponse
    {
        $role->delete();

        return redirect()
            ->route('roles.index');
    }
}
