<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\UserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

// todo fixed the commented section
class UserController extends Controller
{
    public function __construct()
    {
        // $this->middleware('permission:users.view')->only(['index', 'show']);
        // $this->middleware('permission:users.update')->only(['edit', 'update']);
    }

    public function index(Request $request): Response
    {
        $search = $request->string('search')->toString();

        $users = User::query()
            ->with('roles:id,name')
            ->withCount('roles')
            ->when($search, fn ($query, $search) => $query->whereAny(['name', 'email'], 'like', "%{$search}%"))
            ->latest()
            ->paginate(10)
            ->onEachSide(2)
            ->withQueryString();

        return Inertia::render('users/index', [
            'users' => $users,
            'filters' => ['search' => $search],
            'stats' => [
                'roles_count' => Role::count(),
                'users_count' => User::count(),
            ],
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('users/create', [
            'roles' => Role::with('permissions:id,name')->get(['id', 'name']),
            'permissions' => Permission::all(['id', 'name']),
        ]);
    }

    public function store(UserRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $user = User::create(Arr::except($validated, ['roles', 'permissions', 'confirmPassword']));

        $user->syncRoles($validated['roles']);
        $user->syncPermissions($validated['permissions']);

        return redirect()
            ->route('users.show', $user)
            ->with('success', "User account profile created successfully for {$user->name}.");
    }

    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $user->syncRoles(
            $request->validated('roles')
        );

        return redirect()
            ->route('users.show', $user)
            ->with('success', "Roles updated successfully for {$user->name}.");
    }

    public function show(User $user): Response
    {
        $user->load(['roles.permissions']);

        $permissions = $user
            ->getAllPermissions()
//            ->map(fn ($permission) => [
//                'id' => $permission->id,
//                'name' => $permission->name,
//                'guard_name' => $permission->guard_name,
//            ])
            ->values();

        return Inertia::render('users/show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at,
                'roles' => $user->roles,
                'permissions' => $permissions,
            ],
        ]);
    }

    public function edit(User $user): Response
    {
        $user->load('roles');

        return Inertia::render('users/edit', [
            'user' => $user,
            'roles' => Role::all('id', 'name'),
            'permissions' => Permission::all('id', 'name'),
        ]);
    }

    //    public function update(UpdateUserRequest $request, User $user) {
    //        $user->syncRoles(
    //            $request->validated('roles')
    //        );
    //
    //        return redirect()
    //            ->route('users.show', $user)
    //            ->with(
    //                'success',
    //                "Roles updated successfully for {$user->name}."
    //            );
    //    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return redirect()
            ->route('users.index');
    }
}
