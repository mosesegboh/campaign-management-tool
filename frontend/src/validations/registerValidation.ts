import validate from 'validate.js';

export const registerConstraints = {
    name: {
        presence: { allowEmpty: false, message: "^Name is required" },
        length: {
            minimum: 2,
            maximum: 50,
            tooShort: "^Name must be at least %{count} characters",
            tooLong: "^Name must be at most %{count} characters",
        },
    },
    email: {
        presence: { allowEmpty: false, message: "^Email is required" },
        email: { message: "^Please enter a valid email address" },
    },
    password: {
        presence: { allowEmpty: false, message: "^Password is required" },
        length: {
            minimum: 6,
            message: "^Password must be at least %{count} characters",
        },
    },
    password_confirmation: {
        presence: { allowEmpty: false, message: "^Password confirmation is required" },
        equality: {
            attribute: "password",
            message: "^Password confirmation does not match",
            comparator: function(v1: any, v2: any) {
                return v1 === v2;
            },
        },
    },
};
