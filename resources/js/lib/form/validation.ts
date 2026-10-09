/**
 * Validates form field dynamically.
 */
export const validateField = (field: string, value: any): string => {
    let errorMessage = '';

    if (field === 'name') {
        if (!String(value).trim()) errorMessage = 'Full Name is required.';
        else if (String(value).length > 255)
            errorMessage = 'Name cannot exceed 255 characters.';
    }

    if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!String(value).trim()) errorMessage = 'Email address is required.';
        else if (!emailRegex.test(String(value)))
            errorMessage = 'Please enter a valid email address.';
    }

    if (field === 'password') {
        if (!value) errorMessage = 'Password is required.';
        else if (value && String(value).length < 8)
            errorMessage = 'Password must be at least 8 characters long.';
    }

    return errorMessage;
};
export const validateConfirmPassword = (
    password: string,
    confirmPassword: string,
): string => {
    if (password !== confirmPassword) return 'Passwords do not match.';
    return '';
};
