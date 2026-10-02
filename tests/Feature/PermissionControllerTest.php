<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    Permission::findOrCreate('permissions.view');
    Permission::findOrCreate('permissions.create');
    Permission::findOrCreate('permissions.update');
    Permission::findOrCreate('permissions.delete');
});

describe('Authorization', function () {

    it('guest cannot access permissions index', function () {
        $this->get(route('permissions.index'))
            ->assertRedirect(route('login'));
    });

    it('guest cannot create permission', function () {
        $this->post(route('permissions.store'), ['name' => 'users.create'])
            ->assertRedirect(route('login'));

        $this->assertDatabaseMissing('permissions', ['name' => 'users.create']);
    });

    it('guest cannot edit permission', function () {
        $permission = Permission::create(['name' => 'users.view']);

        $this->put(route('permissions.update', $permission), ['name' => 'users.manage'])
            ->assertRedirect(route('login'));

        expect($permission->fresh()->name)->toBe('users.view');
    });

    it('guest cannot delete permission', function () {
        $permission = Permission::create(['name' => 'users.view']);

        $this->delete(route('permissions.destroy', $permission))
            ->assertRedirect(route('login'));

        $this->assertDatabaseHas('permissions', ['id' => $permission->id]);
    });

    /* todo enable this once user permission is configured */

    //    it('user without permissions.view cannot access index', function () {
    //        $user = User::factory()->create();
    //
    //        actingAs($user)
    //            ->get(route('permissions.index'))
    //            ->assertForbidden();
    //    });

    it('user with permissions.view can access index', function () {
        $user = User::factory()->create();

        $user->givePermissionTo('permissions.view');

        actingAs($user)
            ->get(route('permissions.index'))
            ->assertOk();
    });

    /* todo enable this once user permission is configured */

    //    it('user without permissions.create cannot create', function () {
    //        $user = User::factory()->create();
    //
    //        actingAs($user)
    //            ->post(route('permissions.store'), [
    //                'name' => 'users.create',
    //            ])
    //            ->assertForbidden();
    //
    //        $this->assertDatabaseMissing('permissions', [
    //            'name' => 'users.create',
    //        ]);
    //    });

    it('user with permissions.create can create', function () {
        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'users.create'])
            ->assertRedirect();

        $this->assertDatabaseHas('permissions', ['name' => 'users.create']);
    });

    /* todo enable this once user permission is configured */

    //    it('user without permissions.update cannot update', function () {
    //        $user = User::factory()->create();
    //
    //        $permission = Permission::create([
    //            'name' => 'users.view',
    //        ]);
    //
    //        actingAs($user)
    //            ->put(route('permissions.update', $permission), [
    //                'name' => 'users.manage',
    //            ])
    //            ->assertForbidden();
    //
    //        expect($permission->fresh()->name)
    //            ->toBe('users.view');
    //    });

    it('user with permissions.update can update', function () {
        $user = User::factory()->create();

        $user->givePermissionTo('permissions.update');

        $permission = Permission::create(['name' => 'users.view']);

        actingAs($user)
            ->put(route('permissions.update', $permission), ['name' => 'users.manage'])
            ->assertRedirect();

        expect($permission->fresh()->name)
            ->toBe('users.manage');
    });

    /* todo enable this once user permission is configured */

    //    it('user without permissions.delete cannot delete', function () {
    //        $user = User::factory()->create();
    //
    //        $permission = Permission::create([
    //            'name' => 'users.view',
    //        ]);
    //
    //        actingAs($user)
    //            ->delete(route('permissions.destroy', $permission))
    //            ->assertForbidden();
    //
    //        $this->assertDatabaseHas('permissions', [
    //            'id' => $permission->id,
    //        ]);
    //    });

    it('user with permissions.delete can delete', function () {
        $user = User::factory()->create();

        $user->givePermissionTo('permissions.delete');

        $permission = Permission::create(['name' => 'users.view']);

        actingAs($user)
            ->delete(route('permissions.destroy', $permission))
            ->assertRedirect();

        $this->assertDatabaseMissing('permissions', ['id' => $permission->id]);
    });

    it('can display permissions page', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.view');

        actingAs($user)
            ->get(route('permissions.index'))
            ->assertOk();
    });

    // todo enable this once user permission is configured

    // it('forbids users without permission from viewing permissions', function () {
    //
    //    $user = User::factory()->create();
    //
    //    actingAs($user)
    //        ->get(route('permissions.index'))
    //        ->assertForbidden();
    // });
});

describe('index', function () {

    beforeEach(function () {
        $this->user = User::factory()->create();

        $this->user->givePermissionTo('permissions.view');
    });

    it('displays permissions page', function () {

        actingAs($this->user)
            ->get(route('permissions.index'))
            ->assertOk();
    });

    it('displays single permission', function () {

        Permission::create(['name' => 'users.view']);

        actingAs($this->user)
            ->get(route('permissions.index'))
            ->assertSee('users.view');
    });

    it('displays multiple permissions', function () {

        Permission::create(['name' => 'users.view']);

        Permission::create(['name' => 'users.create']);

        Permission::create(['name' => 'users.update']);

        actingAs($this->user)
            ->get(route('permissions.index'))
            ->assertSee('users.view')
            ->assertSee('users.create')
            ->assertSee('users.update');
    });

    it('displays role count', function () {

        $permission = Permission::create(['name' => 'users.manage']);

        $admin = Role::create(['name' => 'Admin']);

        $manager = Role::create(['name' => 'Manager']);

        $admin->givePermissionTo($permission);
        $manager->givePermissionTo($permission);

        expect($permission->roles()->count())->toBe(2);

        actingAs($this->user)
            ->get(route('permissions.index'))
            ->assertOk();
    });

    it('shows empty state when no permissions exist', function () {

        Permission::query()->delete();

        actingAs($this->user)
            ->get(route('permissions.index'))
            ->assertOk();

        expect(Permission::count())->toBe(0);
    });

    /* todo enable this once user permission is configured */

    //    it('pagination works', function () {
    //
    //        foreach (range(1, 25) as $i) {
    //
    //            Permission::create([
    //                'name' => "permission.{$i}",
    //            ]);
    //        }
    //
    //        actingAs($this->user)
    //            ->get(route('permissions.index'))
    //            ->assertOk();
    //
    //        expect(
    //            Permission::count()
    //        )->toBe(25);
    //    });

    it('search returns matching permissions', function () {

        Permission::create(['name' => 'users.view']);

        Permission::create(['name' => 'roles.view']);

        actingAs($this->user)
            ->get(route('permissions.index', ['search' => 'users']))
            ->assertSee('users.view');
    });

    /* todo enable this once user permission is configured */

    //    it('search ignores non matching permissions', function () {
    //
    //        Permission::create([
    //            'name' => 'users.view',
    //        ]);
    //
    //        Permission::create([
    //            'name' => 'roles.view',
    //        ]);
    //
    //        actingAs($this->user)
    //            ->get(route('permissions.index', [
    //                'search' => 'users',
    //            ]))
    //            ->assertSee('users.view')
    //            ->assertDontSee('roles.view');
    //    });

    /* todo enable this once user permission is configured */

    //    it('sorts permissions by name', function () {
    //
    //        Permission::create([
    //            'name' => 'zebra.permission',
    //        ]);
    //
    //        Permission::create([
    //            'name' => 'alpha.permission',
    //        ]);
    //
    //        $response = actingAs($this->user)
    //            ->get(route('permissions.index', [
    //                'sort' => 'name',
    //            ]));
    //
    //        $response->assertOk();
    //
    //        $permissions = Permission::orderBy('name')
    //            ->pluck('name')
    //            ->toArray();
    //
    //        expect($permissions)
    //            ->toBe([
    //                'alpha.permission',
    //                'permissions.create',
    //                'permissions.view',
    //                'zebra.permission',
    //            ]);
    //    });

});

describe('create', function () {

    it('creates permission successfully', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'users.create']);

        $this->assertDatabaseHas('permissions', ['name' => 'users.create']);
    });

    it('requires name', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => ''])
            ->assertSessionHasErrors('name');
    });

    /* todo enable this once user permission is configured */

    //    it('requires name to be a string', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.create');
    //
    //        actingAs($user)
    //            ->post(route('permissions.store'), [
    //                'name' => 12345,
    //            ])
    //            ->assertSessionHasErrors('name');
    //    });

    it('does not allow empty name after trim', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => '      '])
            ->assertSessionHasErrors('name');
    });

    it('requires unique name', function () {

        Permission::create(['name' => 'users.create']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'users.create'])
            ->assertSessionHasErrors('name');
    });

    it('defaults guard name to web', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'reports.export']);

        $permission = Permission::where('name', 'reports.export')->first();

        expect($permission->guard_name)
            ->toBe('web');
    });

    it('redirects after creation', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'users.create'])
            ->assertRedirect(route('permissions.index'));
    });
    it('shows success message after creation', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'users.create'])
            ->assertSessionHas('success');
    });

    it('stores permission in database', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'inventory.stock.adjust']);

        $this->assertDatabaseHas('permissions', ['name' => 'inventory.stock.adjust']);
    });

});

describe('show', function () {
    it('can view permission details', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.view');

        actingAs($user)
            ->get(route('permissions.show', $permission))
            ->assertInertia(
                fn (AssertableInertia $page) => $page
                    ->component('permissions/show')
                    ->where('permission.name', 'users.view')
            );
    });

    it('can view assigned roles', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $admin = Role::create(['name' => 'Admin']);

        $manager = Role::create(['name' => 'Manager']);

        $admin->givePermissionTo($permission);
        $manager->givePermissionTo($permission);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.view');

        actingAs($user)
            ->get(route('permissions.show', $permission))
            ->assertOk()
            ->assertSee('Admin')
            ->assertSee('Manager');
    });

    it('can view guard name', function () {

        $permission = Permission::create(['name' => 'users.view', 'guard_name' => 'web']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.view');

        actingAs($user)
            ->get(route('permissions.show', $permission))
            ->assertOk()
            ->assertSee('web');
    });

    it('returns 404 when permission does not exist', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.view');

        actingAs($user)
            ->get(route('permissions.show', 999999))
            ->assertNotFound();
    });

});

describe('update', function () {
    it('updates permission name', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.update');

        actingAs($user)
            ->put(route('permissions.update', $permission), ['name' => 'users.manage']);

        expect($permission->fresh()->name)
            ->toBe('users.manage');
    });

    it('prevents duplicate permission name', function () {

        Permission::create(['name' => 'users.create']);

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.update');

        actingAs($user)
            ->put(route('permissions.update', $permission), ['name' => 'users.create'])
            ->assertSessionHasErrors('name');
    });

    it('validates required permission name', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.update');

        actingAs($user)
            ->put(route('permissions.update', $permission), ['name' => ''])
            ->assertSessionHasErrors('name');
    });

    it('redirects after update', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.update');

        actingAs($user)
            ->put(route('permissions.update', $permission), ['name' => 'users.manage'])
            ->assertRedirect(route('permissions.index'));
    });

    it('displays success message after update', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.update');

        actingAs($user)
            ->put(route('permissions.update', $permission), ['name' => 'users.manage'])
            ->assertSessionHas('success');
    });

    it('database reflects updated permission', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.update');

        actingAs($user)
            ->put(route('permissions.update', $permission), ['name' => 'users.manage']);

        $this->assertDatabaseHas('permissions', ['id' => $permission->id, 'name' => 'users.manage']);

        $this->assertDatabaseMissing('permissions', ['id' => $permission->id, 'name' => 'users.view']);
    });

});

describe('delete', function () {

    beforeEach(function () {
        Permission::findOrCreate('permissions.delete');
    });

    it('deletes permission', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.delete');

        actingAs($user)
            ->delete(route('permissions.destroy', $permission))
            ->assertRedirect();
    });

    it('removes permission from database', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.delete');

        actingAs($user)
            ->delete(route('permissions.destroy', $permission));

        $this->assertDatabaseMissing('permissions', ['id' => $permission->id]);
    });

    it('redirects after deletion', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.delete');

        actingAs($user)
            ->delete(route('permissions.destroy', $permission))
            ->assertRedirect(route('permissions.index'));
    });

    /* todo enable this once user permission is configured */

    //    it('displays success message after deletion', function () {
    //
    //        $permission = Permission::create([
    //            'name' => 'users.view',
    //        ]);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.delete');
    //
    //        actingAs($user)
    //            ->delete(route('permissions.destroy', $permission))
    //            ->assertRedirect(route('permissions.index'))
    //            ->assertSessionHas(
    //                'success',
    //                'Permission deleted successfully.'
    //            );
    //    });

    it('cannot delete non existing permission', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.delete');

        actingAs($user)
            ->delete(route('permissions.destroy', 999999))
            ->assertNotFound();
    });

});

describe('Role Relationship Test', function () {

    it('assigns permission to role', function () {

        $permission = Permission::create(['name' => 'users.create']);

        $role = Role::create(['name' => 'Admin']);

        $role->givePermissionTo($permission);

        expect($role->hasPermissionTo('users.create'))->toBeTrue();
    });

    it('removes permission from role', function () {

        $permission = Permission::create(['name' => 'users.create']);

        $role = Role::create(['name' => 'Admin']);

        $role->givePermissionTo($permission);

        $role->revokePermissionTo($permission);

        expect($role->hasPermissionTo('users.create'))->toBeFalse();
    });

    it('syncs permissions to role', function () {

        $viewPermission = Permission::create(['name' => 'users.view']);

        $createPermission = Permission::create(['name' => 'users.create']);

        $updatePermission = Permission::create(['name' => 'users.update']);

        $role = Role::create(['name' => 'Admin']);

        $role->givePermissionTo($viewPermission);

        $role->syncPermissions([$createPermission, $updatePermission]);

        expect($role->permissions->pluck('name')->toArray())->toBe(['users.create', 'users.update']);
    });

    it('updates role count correctly', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $admin = Role::create(['name' => 'Admin']);

        $manager = Role::create(['name' => 'Manager']);

        expect($permission->roles()->count())->toBe(0);

        $admin->givePermissionTo($permission);

        expect($permission->fresh()->roles()->count())->toBe(1);

        $manager->givePermissionTo($permission);

        expect($permission->fresh()->roles()->count())->toBe(2);
    });

    it('allows multiple roles to use same permission', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $admin = Role::create(['name' => 'Admin']);

        $manager = Role::create(['name' => 'Manager']);

        $admin->givePermissionTo($permission);
        $manager->givePermissionTo($permission);

        expect($permission->roles()->count())->toBe(2);
    });

    it('shows assigned roles for permission', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $admin = Role::create(['name' => 'Admin']);

        $manager = Role::create(['name' => 'Manager']);

        $admin->givePermissionTo($permission);
        $manager->givePermissionTo($permission);

        $assignedRoles = $permission
            ->roles
            ->pluck('name')
            ->toArray();

        expect($assignedRoles)
            ->toContain('Admin')
            ->toContain('Manager');
    });

});

describe('Validation Test', function () {
    beforeEach(function () {
        Permission::findOrCreate('permissions.create');
    });

    it('validates required name', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => ''])
            ->assertSessionHasErrors('name');
    });

    it('validates unique permission name', function () {

        Permission::create(['name' => 'users.create']);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'users.create'])
            ->assertSessionHasErrors('name');
    });

    /* todo enable this once user permission is configured */

    //    it('validates maximum length', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.create');
    //
    //        actingAs($user)
    //            ->post(route('permissions.store'), [
    //                'name' => str_repeat('a', 256),
    //            ])
    //            ->assertSessionHasErrors('name');
    //    });

    /* todo enable this once user permission is configured */

    //    it('validates invalid guard name', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.create');
    //
    //        actingAs($user)
    //            ->post(route('permissions.store'), [
    //                'name' => 'users.create',
    //                'guard_name' => 'invalid_guard',
    //            ])
    //            ->assertSessionHasErrors('guard_name');
    //    });

    it('trims whitespace from permission name', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => '  users.create  ']);

        $this->assertDatabaseHas('permissions', ['name' => 'users.create']);
    });
});

describe('Inertia Response Tests', function () {

    it('returns correct component', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.view');

        actingAs($user)
            ->get(route('permissions.index'))
            ->assertInertia(fn (AssertableInertia $page) => $page->component('permissions/index'));
    });

    /* todo enable this once user permission is configured */

    //    it('returns permissions collection', function () {
    //
    //        Permission::create([
    //            'name' => 'users.view',
    //        ]);
    //
    //        Permission::create([
    //            'name' => 'users.create',
    //        ]);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.view');
    //
    //        actingAs($user)
    //            ->get(route('permissions.index'))
    //            ->assertInertia(
    //                fn (AssertableInertia $page) =>
    //                $page->has('permissions.data', 2)
    //            );
    //    });

    /* todo enable this once user permission is configured */

    //    it('returns pagination metadata', function () {
    //
    //        foreach (range(1, 20) as $i) {
    //
    //            Permission::create([
    //                'name' => "permission.{$i}",
    //            ]);
    //        }
    //
    //        $user = User::factory()->create();it('returns role count', function () {
    //
    //            $permission = Permission::create([
    //                'name' => 'users.view',
    //            ]);
    //
    //            $admin = Role::create([
    //                'name' => 'Admin',
    //            ]);
    //
    //            $manager = Role::create([
    //                'name' => 'Manager',
    //            ]);
    //
    //            $admin->givePermissionTo($permission);
    //            $manager->givePermissionTo($permission);
    //
    //            $user = User::factory()->create();
    //
    //            $user->givePermissionTo('permissions.view');
    //
    //            actingAs($user)
    //                ->get(route('permissions.index'))
    //                ->assertInertia(
    //                    fn (AssertableInertia $page) =>
    //                    $page->where(
    //                        'permissions.data.0.roles_count',
    //                        2
    //                    )
    //                );
    //        });
    //
    //        $user->givePermissionTo('permissions.view');
    //
    //        actingAs($user)
    //            ->get(route('permissions.index'))
    //            ->assertInertia(
    //                fn (AssertableInertia $page) =>
    //                $page
    //                    ->has('permissions.data')
    //                    ->has('permissions.links')
    //                    ->has('permissions.meta')
    //            );
    //    });

    /* todo enable this once user permission is configured */

    //    it('returns flash messages', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.create');
    //
    //        actingAs($user)
    //            ->post(route('permissions.store'), [
    //                'name' => 'users.create',
    //            ]);
    //
    //        actingAs($user)
    //            ->get(route('permissions.index'))
    //            ->assertInertia(
    //                fn (AssertableInertia $page) =>
    //                $page->where(
    //                    'flash.success',
    //                    'Permission created successfully.'
    //                )
    //            );
    //    });

});

describe('UI Interaction Tests', function () {
    //    it('add permission button works', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.create');
    //
    //        actingAs($user)
    //            ->get(route('permissions.index'))
    //            ->assertSee('Add Permission');
    //
    //        actingAs($user)
    //            ->get(route('permissions.create'))
    //            ->assertOk();
    //    });

    /* todo enable this once user permission is configured */

    //    it('edit permission button works', function () {
    //
    //        $permission = Permission::create([
    //            'name' => 'users.view',
    //        ]);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.update');
    //
    //        actingAs($user)
    //            ->get(route('permissions.edit', $permission))
    //            ->assertOk()
    //            ->assertSee('users.view');
    //    });

    /* todo enable this once user permission is configured */

    //    it('delete confirmation is available', function () {
    //
    //        $permission = Permission::create([
    //            'name' => 'users.view',
    //        ]);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.delete');
    //
    //        actingAs($user)
    //            ->get(route('permissions.index'))
    //            ->assertSee('Delete');
    //    });

    /* todo enable this once user permission is configured */

    //    it('search filters results', function () {
    //
    //        Permission::create([
    //            'name' => 'users.view',
    //        ]);
    //
    //        Permission::create([
    //            'name' => 'roles.view',
    //        ]);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.view');
    //
    //        actingAs($user)
    //            ->get(route('permissions.index', [
    //                'search' => 'users',
    //            ]))
    //            ->assertSee('users.view')
    //            ->assertDontSee('roles.view');
    //    });

    /* todo enable this once user permission is configured */

    //    it('pagination navigation works', function () {
    //
    //        foreach (range(1, 30) as $i) {
    //            Permission::create([
    //                'name' => "permission.{$i}",
    //            ]);
    //        }
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.view');
    //
    //        actingAs($user)
    //            ->get(route('permissions.index?page=2'))
    //            ->assertOk();
    //    });

    it('permission form submission works', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.create');

        actingAs($user)
            ->post(route('permissions.store'), ['name' => 'inventory.stock.adjust'])
            ->assertRedirect(route('permissions.index'));

        $this->assertDatabaseHas('permissions', ['name' => 'inventory.stock.adjust']);
    });
});

describe('Edge Case Tests', function () {

    it('allows permission name with dots', function () {

        $permission = Permission::create(['name' => 'inventory.stock.adjust']);

        expect($permission->name)
            ->toBe('inventory.stock.adjust');

        $this->assertDatabaseHas('permissions', ['name' => 'inventory.stock.adjust']);
    });

    it('allows permission name with hyphens', function () {

        $permission = Permission::create(['name' => 'user-management']);

        expect($permission->name)
            ->toBe('user-management');

        $this->assertDatabaseHas('permissions', ['name' => 'user-management']);
    });

    it('supports very long permission name', function () {

        $name = str_repeat('a', 255);

        $permission = Permission::create(['name' => $name]);

        expect($permission->name)
            ->toBe($name);

        $this->assertDatabaseHas('permissions', ['name' => $name]);
    });

    /* todo enable this once user permission is configured */

    //    it('rejects permission names longer than 255 characters', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('permissions.create');
    //
    //        actingAs($user)
    //            ->post(route('permissions.store'), [
    //                'name' => str_repeat('a', 256),
    //            ])
    //            ->assertSessionHasErrors('name');
    //    });

    it('retains role assignment after permission update', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $role = Role::create(['name' => 'Admin']);

        $role->givePermissionTo($permission);

        $user = User::factory()->create();

        $user->givePermissionTo('permissions.update');

        actingAs($user)
            ->put(route('permissions.update', $permission), ['name' => 'users.manage'])
            ->assertRedirect();

        $permission->refresh();

        expect($permission->name)->toBe('users.manage')
            ->and($permission->roles()->count())->toBe(1)
            ->and($permission->roles->pluck('name')->toArray())->toContain('Admin')
            ->and($role->fresh()->hasPermissionTo('users.manage'))->toBeTrue();

    });

    it('can delete permission assigned to roles', function () {

        $permission = Permission::create(['name' => 'users.delete']);

        $role = Role::create(['name' => 'Admin']);

        $role->givePermissionTo($permission);

        $permission->delete();

        $this->assertDatabaseMissing('permissions', ['id' => $permission->id]);

        expect($role->fresh()->permissions()->count())->toBe(0);
    });

    /* todo enable this once user permission is configured */

    //    it('handles large number of permissions', function () {
    //
    //        foreach (range(1, 1000) as $i) {
    //            Permission::create(['name' => "permission.{$i}",]);
    //        }
    //
    //        expect(Permission::count())->toBe(1000);
    //    });
});
