import validate from 'validate.js';

export const validateForm = (data: any, constraints: any) => {
    const errors = validate(data, constraints, { fullMessages: false });
    return errors || {};
};
