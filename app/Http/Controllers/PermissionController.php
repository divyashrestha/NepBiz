<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();
        $permissions = Permission::query()
            ->withCount('roles')
            ->when($search, fn ($query, $search) => $query->whereAny(['name'], 'like', "%{$search}%"))
            ->latest()
            ->paginate(10)
            ->onEachSide(2)
            ->withQueryString();

        return Inertia::render('permissions/index', [
            'permissions' => $permissions,
            'filters' => ['search' => $search],
            'stats' => [
                'used' => Permission::has('roles')->count(),
                'unused' => Permission::doesntHave('roles')->count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('permissions/create', []);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'unique:permissions,name'],
        ]);

        Permission::create([
            'name' => $validated['name'],
            'guard_name' => 'web',
        ]);

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Permission created.');
    }

    public function show(Permission $permission): Response
    {
        return Inertia::render('permissions/show', [
            'permission' => $permission->load('roles'),
        ]);
    }

    public function edit(Permission $permission): Response
    {
        return Inertia::render('permissions/edit', [
            'permission' => $permission,
        ]);
    }

    public function update(Request $request, Permission $permission): RedirectResponse
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'unique:permissions,name,'.$permission->id,
            ],
        ]);

        $permission->update($validated);

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Permission updated.');
    }

    public function destroy(Permission $permission): RedirectResponse
    {
        $permission->delete();

        return redirect()
            ->route('permissions.index')
            ->with('success', 'Permission deleted.');
    }
}
