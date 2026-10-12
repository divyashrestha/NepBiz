import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CheckboxOption, Permission, Role, User, UserErrors } from '@/types';
import { CustomChangeEvent, CustomSubmitEvent } from '@/types/custom';
import users from '@/routes/users';
import { useEffect, useState } from 'react';
import { FormRow } from '@/components/ui/form/index.';
import { validateConfirmPassword, validateField } from '@/lib/form/validation';
import { useDebounce } from '@/lib/debounce';

type RoleFormProps = {
    permissions: Permission[];
    roles: Role[];
    user:
        | (User & {
              password?: string;
              roles: Role[];
              permissions: Permission[];
          })
        | undefined;
    dataErrors: UserErrors;
};

export default function UserForm({
    user,
    roles,
    permissions,
    dataErrors,
}: RoleFormProps) {
    // Core Inertia form state tracker
    const { data, setData, post, put } = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: '',
        confirmPassword: '',
        roles: user?.roles?.map((r) => r.id) ?? [],
        permissions: user?.permissions?.map((p) => p.id) ?? [],
    });

    // Initialise validation errors
    const [errors, setErrors] = useState<Record<string, string>>({
        name: dataErrors?.name ?? '',
        email: dataErrors?.email ?? '',
        password: dataErrors?.password ?? '',
        confirmPassword: '',
        roles: dataErrors?.roles ?? '',
        permissions: dataErrors?.permissions ?? '',
    });

    // Sync backend database validation exceptions safely
    useEffect(() => {
        if (dataErrors && Object.keys(dataErrors).length > 0) {
            setErrors(dataErrors as unknown as Record<string, string>);
        }
    }, [dataErrors]);

    // State Handler for Roles Checkboxes
    const setRoles = (role: CheckboxOption, e: CustomChangeEvent) => {
        const roleId = Number(role.id);
        const isChecked = e.target.checked;

        setData((prev) => {
            const updatedRoles = isChecked
                ? [...prev.roles, roleId]
                : prev.roles.filter((id) => id !== roleId);

            return { ...prev, roles: updatedRoles };
        });
    };

    // State Handler for Permissions Checkboxes
    const setPermissions = (
        permission: CheckboxOption,
        e: CustomChangeEvent,
    ) => {
        const permissionId = Number(permission.id);
        const isChecked = e.target.checked;

        setData((prev) => {
            const updatedPermissions = isChecked
                ? [...prev.permissions, permissionId]
                : prev.permissions.filter((id) => id !== permissionId);

            return { ...prev, permissions: updatedPermissions };
        });
    };

    const validateUserForm = (): Record<string, string> => {
        const dynamicFormValidation: Record<string, string> = {
            name: validateField('name', data.name),
            email: validateField('email', data.email),
        };

        if (!user || data.password) {
            dynamicFormValidation.password = validateField(
                'password',
                data.password,
            );
            dynamicFormValidation.confirmPassword = validateConfirmPassword(
                data.password,
                data.confirmPassword,
            );
        }

        return dynamicFormValidation;
    };

    // Password Validation
    const debouncedName = useDebounce(data.name, 500);
    useEffect(() => {
        if (!debouncedName) return;
        const error = validateField('name', debouncedName);
        setErrors((prev) => ({ ...prev, name: error }));
    }, [debouncedName]);

    const debouncedEmail = useDebounce(data.email, 500);
    useEffect(() => {
        if (!debouncedEmail) return;
        const error = validateField('email', debouncedEmail);
        setErrors((prev) => ({ ...prev, email: error }));
    }, [debouncedEmail]);

    const debouncedPassword = useDebounce(data.password, 500);
    const debouncedPasswordConfirmation = useDebounce(
        data.confirmPassword,
        500,
    );
    useEffect(() => {
        if (!debouncedPassword) return;

        const error = validateField('password', debouncedPassword);
        setErrors((prev) => ({ ...prev, password: error }));

        if (data.confirmPassword) {
            const matchError = validateConfirmPassword(
                data.password,
                data.confirmPassword,
            );
            setErrors((prev) => ({ ...prev, confirmPassword: matchError }));
        }
    }, [debouncedPassword, debouncedPasswordConfirmation]);

    const handleFieldChange = (key: string, value: string) => {
        setData(key as any, value);

        // Clear out active validation flags instantly as the user types a correction
        if (errors[key]) {
            setErrors((prev) => ({ ...prev, [key]: '' }));
        }
    };

    const submit = (e: CustomSubmitEvent) => {
        e.preventDefault();

        const validationBag = validateUserForm();
        const hasErrors = Object.values(validationBag).some(
            (msg) => msg !== '',
        );

        if (hasErrors) {
            setErrors(validationBag);

            const firstErrorField = Object.keys(validationBag).find(
                (key) => validationBag[key] !== '',
            );
            if (firstErrorField) {
                document.getElementById(`${firstErrorField}-input`)?.focus();
            }
            return;
        }

        if (user) {
            put(users.update(user.id).url);
            return;
        }

        post(users.index().url);
    };

    return (
        <form onSubmit={submit} className="users-form space-y-6 p-6">
            <FormRow error={errors.name} id="name">
                <FormRow.Label>Full Name</FormRow.Label>
                <FormRow.Input
                    type="text"
                    value={data.name}
                    placeholder="Enter full name"
                    onChange={(e: CustomChangeEvent) =>
                        handleFieldChange('name', e.target.value)
                    }
                />
            </FormRow>

            <FormRow error={errors.email} id="email">
                <FormRow.Label>Email</FormRow.Label>
                <FormRow.Input
                    type="text"
                    value={data.email}
                    placeholder="name@company.com"
                    onChange={(e: CustomChangeEvent) =>
                        handleFieldChange('email', e.target.value)
                    }
                />
            </FormRow>

            <FormRow error={errors.password} id="password">
                <FormRow.Label>Password</FormRow.Label>
                <FormRow.Input
                    type="password"
                    value={data.password}
                    placeholder="*********"
                    onChange={(e: CustomChangeEvent) =>
                        handleFieldChange('password', e.target.value)
                    }
                />
            </FormRow>

            <FormRow error={errors.confirmPassword} id="confirmPassword">
                <FormRow.Label>Confirm Password</FormRow.Label>
                <FormRow.Input
                    type="password"
                    value={data.confirmPassword}
                    placeholder="********"
                    onChange={(e: CustomChangeEvent) =>
                        handleFieldChange('confirmPassword', e.target.value)
                    }
                />
            </FormRow>

            <FormRow error={errors.roles}>
                <FormRow.Label>Roles</FormRow.Label>
                <FormRow.CheckboxGroup
                    options={roles}
                    selectedValues={data.roles}
                    onChange={setRoles}
                />
            </FormRow>

            <FormRow error={errors.permissions}>
                <FormRow.Label>Permissions</FormRow.Label>
                <FormRow.CheckboxGroup
                    options={permissions}
                    selectedValues={data.permissions}
                    onChange={setPermissions}
                />
            </FormRow>

            <div className="flex justify-end pt-4">
                <Button>{user ? 'Update User' : 'Create User'}</Button>
                <Link href={users.index()} className={'btn mx-2'}>
                    Back
                </Link>
            </div>
        </form>
    );
}
