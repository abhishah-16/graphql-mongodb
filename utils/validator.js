module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === '') {
        errors.username = 'Username must not be empty'
    }
    if (email.trim() === '') {
        errors.username = 'Email must not be empty'
    } else {
        const regx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!email.match(regx)) {
            errors.email = 'Please enter valid email'
        }
    }
    if (password === '') {
        errors.password = 'Password must not be empty'
    } else if (password !== confirmPassword) {
        errors.password = 'Password does not match'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}