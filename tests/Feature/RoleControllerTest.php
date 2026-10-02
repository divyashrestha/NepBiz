<?php

use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Inertia\Testing\AssertableInertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

use function Pest\Laravel\actingAs;

beforeEach(function () {
    Permission::findOrCreate('roles.view');
    Permission::findOrCreate('roles.create');
    Permission::findOrCreate('roles.update');
    Permission::findOrCreate('roles.delete');
});

describe('Access & Authorization', function () {
    it('guest cannot access roles index', function () {

        $this->get(route('roles.index'))
            ->assertRedirect(route('login'));
    });

    it('guest cannot create role', function () {

        $this->post(route('roles.store'), ['name' => 'Manager'])
            ->assertRedirect(route('login'));

        $this->assertDatabaseMissing('roles', ['name' => 'Manager']);
    });
    it('guest cannot edit role', function () {

        $role = Role::create(['name' => 'Manager']);

        $this->put(route('roles.update', $role), ['name' => 'Admin'])
            ->assertRedirect(route('login'));

        expect($role->fresh()->name)->toBe('Manager');
    });

    it('guest cannot delete role', function () {

        $role = Role::create(['name' => 'Manager']);

        $this->delete(route('roles.destroy', $role))
            ->assertRedirect(route('login'));

        $this->assertDatabaseHas('roles', ['id' => $role->id]);
    });

    //    it('user without roles view cannot access index', function () {
    //
    //        $user = User::factory()->create();
    //
    //        actingAs($user)
    //            ->get(route('roles.index'))
    //            ->assertForbidden();
    //    });

    it('user with roles view can access index', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index'))
            ->assertOk();
    });

    //    it('user without roles create cannot create role', function () {
    //
    //        $user = User::factory()->create();
    //
    //        actingAs($user)
    //            ->post(route('roles.store'), ['name' => 'Manager',])
    //            ->assertForbidden();
    //
    //        $this->assertDatabaseMissing('roles', ['name' => 'Manager',]);
    //    });

    it('user with roles create can create role', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => 'Manager'])
            ->assertRedirect();

        $this->assertDatabaseHas('roles', ['name' => 'Manager']);
    });

    //    it('user without roles update cannot update role', function () {
    //
    //        $role = Role::create([
    //            'name' => 'Manager',
    //        ]);
    //
    //        $user = User::factory()->create();
    //
    //        actingAs($user)
    //            ->put(route('roles.update', $role), [
    //                'name' => 'Administrator',
    //            ])
    //            ->assertForbidden();
    //
    //        expect($role->fresh()->name)
    //            ->toBe('Manager');
    //    });

    it('user with roles update can update role', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.update');

        actingAs($user)
            ->put(route('roles.update', $role), ['name' => 'Administrator'])
            ->assertRedirect();

        expect($role->fresh()->name)->toBe('Administrator');
    });

    //    it('user without roles delete cannot delete role', function () {
    //
    //        $role = Role::create([
    //            'name' => 'Manager',
    //        ]);
    //
    //        $user = User::factory()->create();
    //
    //        actingAs($user)
    //            ->delete(route('roles.destroy', $role))
    //            ->assertForbidden();
    //
    //        $this->assertDatabaseHas('roles', [
    //            'id' => $role->id,
    //        ]);
    //    });

    it('user with roles delete can delete role', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.delete');

        actingAs($user)
            ->delete(route('roles.destroy', $role))
            ->assertRedirect(route('roles.index'));

        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
    });
});

describe('Role Listing', function () {
    it('displays roles page', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index'))
            ->assertOk();
    });

    it('displays single role', function () {

        Role::create(['name' => 'Admin']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index'))
            ->assertSee('Admin');
    });

    it('displays multiple roles', function () {

        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Manager']);
        Role::create(['name' => 'Supervisor']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index'))
            ->assertSee('Admin')
            ->assertSee('Manager')
            ->assertSee('Supervisor');
    });

    it('displays permission count', function () {

        $role = Role::create(['name' => 'Admin']);

        $permission1 = Permission::create(['name' => 'users.view']);

        $permission2 = Permission::create(['name' => 'users.create']);

        $role->givePermissionTo([$permission1, $permission2]);

        expect($role->permissions()->count())->toBe(2);
    });

    it('displays user count', function () {

        $role = Role::create(['name' => 'Manager']);

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $user1->assignRole($role);
        $user2->assignRole($role);

        expect($role->users()->count())->toBe(2);
    });

    it('shows empty state when no roles exist', function () {

        Role::query()->delete();

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index'))
            ->assertOk();

        expect(Role::count())->toBe(0);
    });

    //    it('pagination works', function () {
    //
    //        foreach (range(1, 30) as $i) {
    //            Role::create(['name' => "Role {$i}"]);
    //        }
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.view');
    //
    //        actingAs($user)
    //            ->get(route('roles.index?page=2'))
    //            ->assertOk();
    //    });

    it('search returns matching roles', function () {

        Role::create(['name' => 'Administrator']);

        Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index', ['search' => 'Admin']))
            ->assertSee('Administrator');
    });

    //    it('search ignores non matching roles', function () {
    //
    //        Role::create(['name' => 'Administrator']);
    //
    //        Role::create(['name' => 'Manager']);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.view');
    //
    //        actingAs($user)
    //            ->get(route('roles.index', ['search' => 'Admin']))
    //            ->assertSee('Administrator')
    //            ->assertDontSee('Manager');
    //    });

    it('sorts roles by name', function () {

        Role::create(['name' => 'Zebra Role']);

        Role::create(['name' => 'Admin Role']);

        actingAs(tap(User::factory()->create(), fn ($user) => $user->givePermissionTo('roles.view')))
            ->get(route('roles.index', ['sort' => 'name']))
            ->assertOk();

        $roles = Role::orderBy('name')
            ->pluck('name')
            ->toArray();

        expect($roles)
            ->toContain('Admin Role')
            ->toContain('Zebra Role');
    });
});

describe('create role', function () {
    beforeEach(function () {
        Permission::findOrCreate('roles.create');
    });
    it('creates role successfully', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => 'Manager']);

        $this->assertDatabaseHas('roles', ['name' => 'Manager']);
    });

    it('requires role name', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => ''])
            ->assertSessionHasErrors('name');
    });

    //    it('requires role name to be string', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.create');
    //
    //        actingAs($user)
    //            ->post(route('roles.store'), ['name' => 12345])
    //            ->assertSessionHasErrors('name');
    //    });

    it('does not allow empty role name after trim', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => '     '])
            ->assertSessionHasErrors('name');
    });

    it('requires unique role name', function () {

        Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => 'Manager'])
            ->assertSessionHasErrors('name');
    });

    it('defaults guard name to web', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => 'Manager']);

        $role = Role::where('name', 'Manager')->first();

        expect($role)
            ->not->toBeNull()
            ->and($role->guard_name)
            ->toBe('web');
    });

    it('redirects after role creation', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => 'Manager'])
            ->assertRedirect(route('roles.index'));
    });

    //    it('displays success message after role creation', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.create');
    //
    //        actingAs($user)
    //            ->post(route('roles.store'), ['name' => 'Manager'])
    //            ->assertRedirect(route('roles.index'))
    //            ->assertSessionHas('success', 'Role created successfully.');
    //    });

    it('stores role in database', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => 'Supervisor']);

        $this->assertDatabaseHas('roles', ['name' => 'Supervisor']);
    });
});

describe('view role', function () {
    it('can view role details', function () {

        $role = Role::create(['name' => 'Administrator']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.show', $role))
            ->assertOk()
            ->assertSee('Administrator');
    });

    it('can view assigned permissions', function () {

        $role = Role::create(['name' => 'Administrator']);

        $viewPermission = Permission::create(['name' => 'users.view']);

        $createPermission = Permission::create(['name' => 'users.create']);

        $role->givePermissionTo([$viewPermission, $createPermission]);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.show', $role))
            ->assertOk()
            ->assertSee('users.view')
            ->assertSee('users.create');
    });

    it('can view assigned users', function () {

        $role = Role::create(['name' => 'Administrator']);

        $assignedUser1 = User::factory()->create();
        $assignedUser2 = User::factory()->create();

        $assignedUser1->assignRole($role);
        $assignedUser2->assignRole($role);

        $viewer = User::factory()->create();

        $viewer->givePermissionTo('roles.view');

        actingAs($viewer)
            ->get(route('roles.show', $role))
            ->assertOk();

        expect($role->users()->count())->toBe(2);
    });

    it('can view permission count', function () {

        $role = Role::create(['name' => 'Administrator']);

        $permission1 = Permission::create(['name' => 'users.view']);

        $permission2 = Permission::create(['name' => 'users.create']);

        $role->givePermissionTo([$permission1, $permission2]);

        expect($role->permissions()->count())->toBe(2);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.show', $role))
            ->assertOk();
    });

    it('can view user count', function () {

        $role = Role::create(['name' => 'Administrator']);

        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();

        $user1->assignRole($role);
        $user2->assignRole($role);
        $user3->assignRole($role);

        expect($role->users()->count())->toBe(3);

        $viewer = User::factory()->create();

        $viewer->givePermissionTo('roles.view');

        actingAs($viewer)
            ->get(route('roles.show', $role))
            ->assertOk();
    });

    it('returns 404 when role does not exist', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.show', 999999))
            ->assertNotFound();
    });

});

describe('update role', function () {
    it('updates role name', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.update');

        actingAs($user)
            ->put(route('roles.update', $role), ['name' => 'Administrator']);

        expect($role->fresh()->name)->toBe('Administrator');
    });

    it('updates assigned permissions', function () {

        $role = Role::create(['name' => 'Manager']);

        $viewPermission = Permission::create(['name' => 'users.view']);

        $createPermission = Permission::create(['name' => 'users.create']);

        $role->givePermissionTo($viewPermission);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.update');

        actingAs($user)
            ->put(route('roles.update', $role), ['name' => 'Manager', 'permissions' => [$createPermission->id]]);

        expect($role->fresh()->permissions()->pluck('id')->toArray())->toContain($createPermission->id)
            ->not->toContain($viewPermission->id);
    });

    it('removes assigned permissions', function () {

        $role = Role::create(['name' => 'Manager']);

        $permission = Permission::create(['name' => 'users.view']);

        $role->givePermissionTo($permission);

        expect($role->permissions()->count())->toBe(1);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.update');

        actingAs($user)
            ->put(route('roles.update', $role), ['name' => 'Manager', 'permissions' => []]);

        expect($role->fresh()->permissions()->count())->toBe(0);
    });

    //    it('prevents duplicate role names', function () {
    //
    //        Role::create(['name' => 'Administrator']);
    //
    //        $role = Role::create(['name' => 'Manager']);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.update');
    //
    //        actingAs($user)
    //            ->put(route('roles.update', $role), ['name' => 'Administrator'])
    //            ->assertSessionHasErrors('name');
    //    });

    it('validates required role name', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.update');

        actingAs($user)
            ->put(route('roles.update', $role), ['name' => ''])
            ->assertSessionHasErrors('name');
    });

    it('redirects after role update', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.update');

        actingAs($user)
            ->put(route('roles.update', $role), ['name' => 'Administrator'])
            ->assertRedirect(route('roles.index'));
    });

    //    it('displays success message after role update', function () {
    //
    //        $role = Role::create(['name' => 'Manager']);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.update');
    //
    //        actingAs($user)
    //            ->put(route('roles.update', $role), ['name' => 'Administrator'])
    //            ->assertRedirect(route('roles.index'))
    //            ->assertSessionHas('success', 'Role updated successfully.');
    //    });

    it('database reflects role changes', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.update');

        actingAs($user)
            ->put(route('roles.update', $role), ['name' => 'Administrator']);

        $this->assertDatabaseHas('roles', ['id' => $role->id, 'name' => 'Administrator']);

        $this->assertDatabaseMissing('roles', ['id' => $role->id, 'name' => 'Manager']);
    });
});

describe('delete role', function () {
    beforeEach(function () {
        Permission::findOrCreate('roles.delete');
    });

    it('deletes role', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.delete');

        actingAs($user)
            ->delete(route('roles.destroy', $role))
            ->assertRedirect();
    });

    it('removes role from database', function () {

        $role = Role::create(['name' => 'Manager']);

        $initialCount = Role::count();

        $user = User::factory()->create();

        $user->givePermissionTo('roles.delete');

        actingAs($user)
            ->delete(route('roles.destroy', $role))
            ->assertRedirect(route('roles.index'));

        $this->assertDatabaseMissing('roles', ['id' => $role->id]);

        expect(Role::count())->toBe($initialCount - 1);
    });

    it('redirects after role deletion', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.delete');

        actingAs($user)
            ->delete(route('roles.destroy', $role))
            ->assertRedirect(route('roles.index'));
    });

    //    it('displays success message after role deletion', function () {
    //
    //        $role = Role::create(['name' => 'Manager']);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.delete');
    //
    //        actingAs($user)
    //            ->delete(route('roles.destroy', $role))
    //            ->assertRedirect(route('roles.index'))
    //            ->assertSessionHas('success', 'Role deleted successfully.');
    //    });

    it('prevents deleting non existing role', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.delete');

        actingAs($user)
            ->delete(route('roles.destroy', 999999))
            ->assertNotFound();
    });
});

describe('Permission Assignment', function () {

    it('assigns single permission to role', function () {

        $role = Role::create(['name' => 'Manager']);

        $permission = Permission::create(['name' => 'users.view']);

        $role->givePermissionTo($permission);

        expect($role->hasPermissionTo('users.view'))->toBeTrue()
            ->and($role->permissions()->count())->toBe(1);

    });

    it('assigns multiple permissions to role', function () {

        $role = Role::create(['name' => 'Manager']);

        $viewPermission = Permission::create(['name' => 'users.view']);

        $createPermission = Permission::create(['name' => 'users.create']);

        $updatePermission = Permission::create(['name' => 'users.update']);

        $role->givePermissionTo([$viewPermission, $createPermission, $updatePermission]);

        expect($role->permissions()->count())->toBe(3)
            ->and($role->hasPermissionTo('users.view'))->toBeTrue()
            ->and($role->hasPermissionTo('users.create'))->toBeTrue()
            ->and($role->hasPermissionTo('users.update'))->toBeTrue();

    });

    it('removes permission from role', function () {

        $role = Role::create(['name' => 'Manager']);

        $permission = Permission::create(['name' => 'users.view']);

        $role->givePermissionTo($permission);

        expect($role->hasPermissionTo('users.view'))->toBeTrue();

        $role->revokePermissionTo($permission);

        expect($role->hasPermissionTo('users.view'))->toBeFalse()
            ->and($role->permissions()->count())->toBe(0);

    });

    it('syncs permissions to role', function () {

        $role = Role::create(['name' => 'Manager']);

        $viewPermission = Permission::create(['name' => 'users.view']);

        $createPermission = Permission::create(['name' => 'users.create']);

        $updatePermission = Permission::create(['name' => 'users.update']);

        $role->givePermissionTo($viewPermission);

        $role->syncPermissions([$createPermission, $updatePermission]);

        expect($role->permissions()->count())->toBe(2)
            ->and($role->hasPermissionTo('users.create'))->toBeTrue()
            ->and($role->hasPermissionTo('users.update'))->toBeTrue()
            ->and($role->hasPermissionTo('users.view'))->toBeFalse();

    });

    it('role inherits assigned permissions', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $role = Role::create(['name' => 'Manager']);

        $role->givePermissionTo($permission);

        $user = User::factory()->create();

        $user->assignRole($role);

        expect($role->permissions()->pluck('name')->toArray())->toContain('users.view')
            ->and($user->getAllPermissions()->pluck('name')->toArray())->toContain('users.view')
            ->and($user->hasPermissionTo('users.view'))->toBeTrue();

    });

    it('updates permission count correctly', function () {

        $role = Role::create(['name' => 'Manager']);

        expect($role->permissions()->count())->toBe(0);

        $permission1 = Permission::create(['name' => 'users.view']);

        $permission2 = Permission::create(['name' => 'users.create']);

        $role->givePermissionTo($permission1);

        expect($role->fresh()->permissions()->count())->toBe(1);

        $role->givePermissionTo($permission2);

        expect($role->fresh()->permissions()->count())->toBe(2);

        $role->revokePermissionTo($permission1);

        expect($role->fresh()->permissions()->count())->toBe(1);
    });

    it('does not assign duplicate permissions to role', function () {

        $role = Role::create(['name' => 'Manager']);

        $permission = Permission::create(['name' => 'users.view']);

        $role->givePermissionTo($permission);

        $role->givePermissionTo($permission);

        expect($role->permissions()->count())->toBe(1)
            ->and($role->permissions->pluck('name')->toArray())->toBe(['users.view']);

    });
});

describe('user assignment', function () {
    it('assigns role to user', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->assignRole($role);

        expect($user->hasRole('Manager'))->toBeTrue()
            ->and($user->roles()->count())->toBe(1);
    });

    it('removes role from user', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->assignRole($role);

        expect($user->hasRole('Manager'))->toBeTrue();

        $user->removeRole($role);

        expect($user->hasRole('Manager'))->toBeFalse()
            ->and($user->roles()->count())->toBe(0);
    });

    it('syncs user roles', function () {

        $admin = Role::create(['name' => 'Admin']);

        $manager = Role::create(['name' => 'Manager']);

        $supervisor = Role::create(['name' => 'Supervisor']);

        $user = User::factory()->create();

        $user->assignRole($admin);

        expect($user->roles()->count())->toBe(1);

        $user->syncRoles([$manager, $supervisor]);

        expect($user->roles()->count())->toBe(2)
            ->and($user->hasRole('Admin'))->toBeFalse()
            ->and($user->hasRole('Manager'))->toBeTrue()
            ->and($user->hasRole('Supervisor'))->toBeTrue();
    });

    it('user inherits permissions from role', function () {

        $permission = Permission::create(['name' => 'users.view']);

        $role = Role::create(['name' => 'Manager']);

        $role->givePermissionTo($permission);

        $user = User::factory()->create();

        $user->assignRole($role);

        expect($user->hasRole('Manager'))->toBeTrue()
            ->and($user->hasPermissionTo('users.view'))->toBeTrue()
            ->and($user->can('users.view'))->toBeTrue()
            ->and($user->getAllPermissions()->pluck('name')->toArray())->toContain('users.view');
    });

    it('multiple users can share same role', function () {

        $role = Role::create(['name' => 'Manager']);

        $userOne = User::factory()->create();
        $userTwo = User::factory()->create();
        $userThree = User::factory()->create();

        $userOne->assignRole($role);
        $userTwo->assignRole($role);
        $userThree->assignRole($role);

        expect($userOne->hasRole('Manager'))->toBeTrue()
            ->and($userTwo->hasRole('Manager'))->toBeTrue()
            ->and($userThree->hasRole('Manager'))->toBeTrue()
            ->and($role->users()->count())->toBe(3);
    });

    it('updates user count correctly', function () {

        $role = Role::create(['name' => 'Manager']);

        expect($role->users()->count())->toBe(0);

        $userOne = User::factory()->create();
        $userOne->assignRole($role);

        expect($role->fresh()->users()->count())->toBe(1);

        $userTwo = User::factory()->create();
        $userTwo->assignRole($role);

        expect($role->fresh()->users()->count())->toBe(2);

        $userOne->removeRole($role);

        expect($role->fresh()->users()->count())->toBe(1)
            ->and($role->fresh()->users->pluck('id')->toArray())->toContain($userTwo->id)->not->toContain($userOne->id);
    });
});

describe('Validation', function () {
    it('requires role name', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => ''])
            ->assertSessionHasErrors('name');
    });

    it('validates unique role name', function () {

        Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => 'Manager'])
            ->assertSessionHasErrors('name');
    });

    //    it('validates role name is string', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.create');
    //
    //        actingAs($user)
    //            ->post(route('roles.store'), ['name' => 12345])
    //            ->assertSessionHasErrors('name');
    //    });

    it('does not allow blank role name', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.create');

        actingAs($user)
            ->post(route('roles.store'), ['name' => '      '])
            ->assertSessionHasErrors('name');
    });

    //    it('rejects invalid permission ids', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('ro*es.create');
    //
    //        actingAs($user)
    //            ->post(route('roles.store'), ['name' => 'Manager', 'permissions' => [999999]])
    //            ->assertSessionHasErrors('permissions.0');
    //    });

    //    it('rejects non numeric permission values', function () {
    //
    //        $permission = Permission::create(['name' => 'users.view']);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.create');
    //
    //        actingAs($user)
    //            ->post(route('roles.store'), ['name' => 'Manager', 'permissions' => ['invalid-value', $permission->id]])
    //            ->assertSessionHasErrors('permissions.0');
    //    });
});

describe('Inertia Response Tests', function () {
    it('returns roles index component', function () {

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index'))
            ->assertInertia(fn (AssertableInertia $page) => $page->component('roles/index'));
    });

    it('returns roles collection', function () {

        Role::create(['name' => 'Admin']);
        Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index'))
            ->assertInertia(fn (AssertableInertia $page) => $page->has('roles.data', 2));
    });

    //    it('returns permissions collection on create page', function () {
    //
    //        Permission::create(['name' => 'users.view']);
    //
    //        Permission::create(['name' => 'users.create']);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.create');
    //
    //        actingAs($user)
    //            ->get(route('roles.create'))
    //            ->assertInertia(fn (AssertableInertia $page) => $page->component('roles/create')->has('permissions', 2));
    //    });

    //    it('returns permissions collection on edit page', function () {
    //
    //        $role = Role::create(['name' => 'Manager']);
    //
    //        Permission::create(['name' => 'users.view']);
    //
    //        Permission::create(['name' => 'users.create']);
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.update');
    //
    //        actingAs($user)
    //            ->get(route('roles.edit', $role))
    //            ->assertInertia(fn (AssertableInertia $page) => $page->component('roles/edit')->has('permissions', 2));
    //    });

    it('returns selected role', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->givePermissionTo('roles.update');

        actingAs($user)
            ->get(route('roles.edit', $role))
            ->assertInertia(fn (AssertableInertia $page) => $page->where('role.name', 'Manager'));
    });

    it('returns permission count', function () {

        $role = Role::create(['name' => 'Manager']);

        $permissionOne = Permission::create(['name' => 'users.view']);
        $permissionTwo = Permission::create(['name' => 'users.create']);

        $role->givePermissionTo([$permissionOne, $permissionTwo]);
        $user = User::factory()->create();

        $user->givePermissionTo('roles.view');

        actingAs($user)
            ->get(route('roles.index'))
            ->assertInertia(fn (AssertableInertia $page) => $page->where('roles.data.0.permissions_count', 2));
    });

    //    it('returns flash messages', function () {
    //
    //        $user = User::factory()->create();
    //
    //        $user->givePermissionTo('roles.create');
    //
    //        actingAs($user)
    //            ->post(route('roles.store'), ['name' => 'Manager']);
    //
    //        actingAs($user)
    //            ->get(route('roles.index'))
    //            ->assertInertia(fn (AssertableInertia $page) => $page->where('flash.success', 'Role created successfully.'));
    //    });
});

describe('Relationship Tests', function () {
    it('role has permissions relationship', function () {

        $role = Role::create(['name' => 'Manager']);

        expect($role->permissions())->toBeInstanceOf(BelongsToMany::class);
    });

    it('role permissions can be loaded', function () {

        $role = Role::create(['name' => 'Manager']);

        $permission = Permission::create(['name' => 'users.view']);

        $role->givePermissionTo($permission);

        $role->load('permissions');

        expect($role->permissions)->toHaveCount(1)
            ->and($role->permissions->first()->name)->toBe('users.view');
    });

    it('permission belongs to many roles', function () {

        $permission = Permission::create(['name' => 'users.view']);
        $admin = Role::create(['name' => 'Admin']);

        $manager = Role::create(['name' => 'Manager']);
        $admin->givePermissionTo($permission);
        $manager->givePermissionTo($permission);

        $permission->load('roles');

        expect($permission->roles)->toHaveCount(2)
            ->and($permission->roles->pluck('name')->toArray())->toContain('Admin', 'Manager');
    });

    it('user belongs to role', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->assignRole($role);

        expect($user->hasRole('Manager'))->toBeTrue()
            ->and($user->roles()->count())->toBe(1);
    });

    it('role users relationship works', function () {

        $role = Role::create(['name' => 'Manager']);

        $userOne = User::factory()->create();
        $userTwo = User::factory()->create();

        $userOne->assignRole($role);
        $userTwo->assignRole($role);

        expect($role->users()->count())->toBe(2)
            ->and($role->users->pluck('email')->toArray())->toContain($userOne->email, $userTwo->email);
    });
});

// describe('Super Admin Tests', function () {
//    Gate::before(function (User $user, string $ability) {
//        return $user->hasRole('Super Admin') ? true : null;
//    });
//
//    it('super admin bypasses authorization checks', function () {
//
//        $superAdmin = User::factory()->create();
//
//        $superAdminRole = Role::create(['name' => 'Super Admin']);
//
//        $superAdmin->assignRole($superAdminRole);
//
//        expect($superAdmin->can('roles.delete'))->toBeTrue()
//            ->and($superAdmin->can('roles.update'))->toBeTrue()
//            ->and($superAdmin->can('roles.create'))->toBeTrue()
//            ->and($superAdmin->can('roles.view'))->toBeTrue();
//    });
//
//    it('super admin can access role pages', function () {
//
//        $superAdmin = User::factory()->create();
//
//        $superAdminRole = Role::create(['name' => 'Super Admin']);
//
//        $superAdmin->assignRole($superAdminRole);
//
//        actingAs($superAdmin)
//            ->get(route('roles.index'))
//            ->assertOk();
//    });
//
//    it('super admin can create roles', function () {
//
//        $superAdmin = User::factory()->create();
//
//        $superAdminRole = Role::create(['name' => 'Super Admin']);
//
//        $superAdmin->assignRole($superAdminRole);
//
//        actingAs($superAdmin)
//            ->post(route('roles.store'), ['name' => 'Manager'])
//            ->assertRedirect();
//
//        $this->assertDatabaseHas('roles', ['name' => 'Manager']);
//    });
//
//    it('super admin can update roles', function () {
//
//        $role = Role::create(['name' => 'Manager']);
//        $superAdmin = User::factory()->create();
//
//        $superAdminRole = Role::create(['name' => 'Super Admin']);
//
//        $superAdmin->assignRole($superAdminRole);
//
//        actingAs($superAdmin)
//            ->put(route('roles.update', $role), ['name' => 'Administrator'])
//            ->assertRedirect();
//
//        expect($role->fresh()->name)->toBe('Administrator');
//    });
//
//    it('super admin can delete roles', function () {
//
//        $role = Role::create(['name' => 'Manager']);
//
//        $initialCount = Role::count();
//
//        $superAdmin = User::factory()->create();
//
//        $superAdminRole = Role::create(['name' => 'Super Admin']);
//
//        $superAdmin->assignRole($superAdminRole);
//
//        actingAs($superAdmin)
//            ->delete(route('roles.destroy', $role))
//            ->assertRedirect(route('roles.index'));
//
//        $this->assertDatabaseMissing('roles', ['id' => $role->id]);
//
//        expect(Role::count())->toBe($initialCount - 1);
//    });
//
//    it('super admin automatically has all permissions', function () {
//
//        Permission::create(['name' => 'roles.view']);
//        Permission::create(['name' => 'roles.create']);
//        Permission::create(['name' => 'roles.update']);
//        Permission::create(['name' => 'roles.delete']);
//        Permission::create(['name' => 'permissions.view']);
//        Permission::create(['name' => 'permissions.create']);
//
//        $superAdmin = User::factory()->create();
//
//        $superAdminRole = Role::create(['name' => 'Super Admin']);
//
//        $superAdmin->assignRole($superAdminRole);
//
//        Permission::all()->each(function ($permission) use ($superAdmin) {
//            expect($superAdmin->can($permission->name))->toBeTrue();
//        });
//    });
// });

describe('Edge Case', function () {
    it('supports role with no permissions', function () {

        $role = Role::create(['name' => 'Guest']);

        expect($role->permissions()->count())->toBe(0)
            ->and($role->permissions)->toHaveCount(0);
    });

    //    it('supports role with many permissions', function () {
    //
    //        $role = Role::create(['name' => 'Administrator']);
    //
    //        foreach (range(1, 100) as $i) {
    //            Permission::create(['name' => "permission.{$i}"]);
    //        }
    //
    //        $role->givePermissionTo(Permission::all());
    //
    //        expect($role->fresh()->permissions()->count())->toBe(100);
    //    });

    it('supports role assigned to many users', function () {

        $role = Role::create(['name' => 'Manager']);

        $users = User::factory()
            ->count(50)
            ->create();

        foreach ($users as $user) {
            $user->assignRole($role);
        }

        expect($role->fresh()->users()->count())->toBe(50);
    });

    it('can delete role assigned to users', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->assignRole($role);

        expect($user->hasRole('Manager'))->toBeTrue();

        $role->delete();

        $this->assertDatabaseMissing('roles', ['id' => $role->id]);

        expect(Role::where('id', $role->id)->exists())->toBeFalse();
    });

    it('removes last permission from role', function () {

        $role = Role::create(['name' => 'Manager']);

        $permission = Permission::create(['name' => 'users.view']);

        $role->givePermissionTo($permission);

        expect($role->permissions()->count())->toBe(1);

        $role->revokePermissionTo($permission);

        expect($role->fresh()->permissions()->count())->toBe(0)
            ->and($role->hasPermissionTo('users.view'))->toBeFalse();
    });

    it('renaming role keeps existing assignments', function () {

        $role = Role::create(['name' => 'Manager']);

        $user = User::factory()->create();

        $user->assignRole($role);

        expect($user->hasRole('Manager'))->toBeTrue();

        $role->update(['name' => 'Administrator']);

        $role->refresh();
        $user->refresh();

        expect($role->name)->toBe('Administrator')
            ->and($role->users()->count())->toBe(1)
            ->and($user->roles()->pluck('name')->toArray())->toContain('Administrator')
            ->and($user->hasRole('Administrator'))->toBeTrue();
    });
});
