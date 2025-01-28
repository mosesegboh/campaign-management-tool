export const loginConstraints = {
    email: {
        presence: { allowEmpty: false, message: "^Email is required" },
        email: { message: "^Please enter a valid email address" },
    },
    password: {
        presence: { allowEmpty: false, message: "^Password is required" },
    },
};
