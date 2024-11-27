import { UseFormReturn } from "react-hook-form";
import * as Yup from "yup";
import { UserState } from "./store-user";

export interface ChangeStepInterface {
    nextStep: () => void;
    previousStep?: () => void;
    register: UseFormReturn<LoginFormInterface>['register'],
    errors: UseFormReturn<LoginFormInterface>['formState']['errors']
    form?: UseFormReturn<LoginFormInterface>
}

export interface LoginFormInterface {
    email: string;
    password: string;
    generatedOtp: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}

export const LoginValidationSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    generatedOtp: Yup.string().default(''),

    password: Yup.string().default('')
        .when("generatedOtp",
            ([generatedOtp], schema) => {
                return (generatedOtp === '' || generatedOtp === null || generatedOtp === undefined) ?
                    schema.matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                        'Password must contain letters, numbers, special characters and must be 8 characters long').required() : schema.nullable().optional();
            }),

    otp: Yup.string().default(''),

    newPassword: Yup.string().default('')
        .when('generatedOtp',
            ([generatedOtp], schema) => {
                return (generatedOtp === '' || generatedOtp === null || generatedOtp === undefined) ?
                    schema.optional() :
                    schema.matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                        'New password must contain letters, numbers, special characters and must be 8 characters long'
                    ).required('New password is required')
            }),

    confirmPassword: Yup.string().default('')
        .when('generatedOtp',
            ([generatedOtp], schema) => {
                return (generatedOtp === '' || generatedOtp === null || generatedOtp === undefined) ?
                    schema.optional() :
                    schema.matches(
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                        'Confirm password must contain letters, numbers, special characters and must be 8 characters long'
                    ).required('Confirm password is required')
                        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
            }),
});

export interface LoginCustomerInterface {
    token: string;
    user: UserState;
}