import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface PasswordFieldProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    helperText?: string;
    required?: boolean;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
    label,
    value,
    onChange,
    error = false,
    helperText = '',
    required = false,
}) => {
const [showPassword, setShowPassword] = useState(false);

const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
};

const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
};

return (
    <TextField
        label={label}
        type={showPassword ? 'text' : 'password'}
        value={value}
        autoComplete="current-password"
        onChange={onChange}
        required={required}
        error={error}
        helperText={helperText}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        aria-label="toggle password visibility"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            ),
        }}
        fullWidth
    />
);
};
