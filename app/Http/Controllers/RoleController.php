<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('roles/index', [
            'roles' => Role::withCount('permissions')
                ->latest()
                ->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('roles/create', [
            'permissions' => Permission::all(),
        ]);
    }

    public function store(Request $request)
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

    public function show(Role $role)
    {
        $role->load('permissions');

        return Inertia::render('roles/show', [
            'role' => $role,
        ]);
    }

    public function edit(Role $role)
    {
        return Inertia::render('roles/edit', [
            'role' => $role->load('permissions'),
            'permissions' => Permission::all(),
        ]);
    }

    public function update(
        Request $request,
        Role    $role
    )
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

    public function destroy(Role $role)
    {
        $role->delete();

        return redirect()
            ->route('roles.index');
    }
}
