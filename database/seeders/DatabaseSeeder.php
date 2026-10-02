<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $superAdminUser = User::factory()->create([
            'name' => 'Super Admin User',
            'email' => 'super.admin@example.com',
        ]);
        $adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);
        $adminUser = User::factory()->create([
            'name' => 'User',
            'email' => 'User@example.com',
        ]);
        $superAdminRole = Role::findOrCreate('Super Admin');
        $adminRole = Role::findOrCreate('Admin');
        $userRole = Role::findOrCreate('User');

        $userView = Permission::findOrCreate('users.view');
        $userCreate = Permission::findOrCreate('users.create');
        $userUpdate = Permission::findOrCreate('users.update');
        $userDelete = Permission::findOrCreate('users.delete');

        $roleView = Permission::findOrCreate('roles.view');
        $roleCreate = Permission::findOrCreate('roles.create');
        $roleUpdate = Permission::findOrCreate('roles.update');
        $roleDelete = Permission::findOrCreate('roles.delete');

        $permissionView = Permission::findOrCreate('permissions.view');
        $permissionCreate = Permission::findOrCreate('permissions.create');
        $permissionUpdate = Permission::findOrCreate('permissions.update');
        $permissionDelete = Permission::findOrCreate('permissions.delete');
        $superAdminRole->syncPermissions(Permission::all());
        $adminRole->syncPermissions(Permission::where('name', 'not like', '%delete%')->get());
        $userRole->syncPermissions([$userView, $roleView, $permissionView]);
    }
}
