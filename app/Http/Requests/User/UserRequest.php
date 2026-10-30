<?php

namespace App\Http\Requests\User;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Unique;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $isCreate = $this->isMethod('post');

        if ($isCreate) {
            return Gate::allows('users.create');
        }

        return Gate::allows('users.update');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, array<int, string|Unique>>
     */
    public function rules(): array
    {
        $isCreate = $this->isMethod('post');

        /** @var User|string|int|null $userRouteParam */
        $userRouteParam = $this->route('user');
        $userId = $userRouteParam instanceof User ? $userRouteParam->getKey() : $userRouteParam;
        // $passwordRules = [$isCreate ? 'required' : 'nullable', 'string', 'min:8', 'confirmed'];
        $passwordRules = [$isCreate ? 'required' : 'nullable', 'string', 'min:8'];

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($userId)],
            'password' => $passwordRules,
            // Manually configuring the confirmPassword default is confirm_password
            'confirmPassword' => [$isCreate ? 'required' : 'nullable', 'string', 'same:password'],

            'roles' => ['present', 'array'],
            'roles.*' => ['exists:roles,id'],

            'permissions' => ['present', 'array'],
            'permissions.*' => ['exists:permissions,id'],
        ];
    }
}
