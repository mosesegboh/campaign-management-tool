import { useState } from 'react';
import { validateForm } from '../validations/validateHelper';

interface UseFormProps<T> {
    initialValues: T;
    constraints: any;
    onSubmit: (values: T) => Promise<void>;
}

interface UseFormReturn<T> {
    values: T;
    errors: { [key: string]: string };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    resetForm: (newValues?: T) => void;
    setErrors: (errors: { [key: string]: string }) => void;
}

export function useForm<T>({ initialValues, constraints, onSubmit }: UseFormProps<T>): UseFormReturn<T> {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = validateForm(values, constraints);

        if (Object.keys(validationErrors).length > 0) {
            const formattedErrors: { [key: string]: string } = {};
            for (const key in validationErrors) {
                formattedErrors[key] = validationErrors[key][0];
            }
            setErrors(formattedErrors);
            return;
        }

        setErrors({});
        await onSubmit(values);
    };

    const resetForm = (newValues?: T) => {
        setValues(newValues || initialValues);
        setErrors({});
    };

    return {
        values,
        errors,
        handleChange,
        handleSubmit,
        resetForm,
        setErrors,
    };
}
