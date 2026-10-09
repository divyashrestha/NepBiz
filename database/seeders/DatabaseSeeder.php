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
        // User creation
        $superAdminUser = User::factory()->create([
            'name' => 'Super Admin User',
            'email' => 'super.admin@example.com',
        ]);
        $adminUser = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);
        $user = User::factory()->create([
            'name' => 'User',
            'email' => 'User@example.com',
        ]);

        // Role creation
        $superAdminRole = Role::findOrCreate('Super Admin');
        $adminRole = Role::findOrCreate('Admin');
        $userRole = Role::findOrCreate('User');

        // Permission creation
        $modules = ['users', 'roles', 'permissions'];
        $actions = ['view', 'create', 'update', 'delete'];
        foreach ($modules as $module) {
            foreach ($actions as $action) {
                Permission::findOrCreate("{$module}.{$action}");
            }
        }

        // Assigning roles and permissions
        $exceptAdminPermission = ['permissions.delete', 'permissions.create', 'permissions.update'];
        $adminRole->syncPermissions(Permission::whereNotIn('name', $exceptAdminPermission)->get());

        $excludedKeywords = ['delete', 'create', 'update'];
        $permissions = Permission::whereNotIn('id', function ($query) use ($excludedKeywords) {
            $query->select('id')
                ->from('permissions')
                ->where(function ($sub) use ($excludedKeywords) {
                    foreach ($excludedKeywords as $keyword) {
                        $sub->orWhere('name', 'like', "%{$keyword}");
                    }
                });
        })->get();
        $userRole->syncPermissions($permissions);

        // Assigning roles
        $superAdminUser->assignRole($superAdminRole);
        $adminUser->assignRole($adminRole);
        $user->assignRole($userRole);
    }
}
