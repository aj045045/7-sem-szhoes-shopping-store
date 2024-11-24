import { UseFormReturn } from "react-hook-form";
import * as Yup from "yup";

export interface ChangeStepInterface {
    nextStep: () => void;
    register: UseFormReturn<RegisterFormInterface>['register'],
    errors: UseFormReturn<RegisterFormInterface>['formState']['errors']
    form?: UseFormReturn<RegisterFormInterface>
}

export interface RegisterFormInterface {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    generatedOtp: string;
    otp: string;
}

export const RegisterValidationSchema = Yup.object({
    name: Yup.string()
        .min(5, "Name must be at least 5 characters")
        .max(30, "Name must be at most 30 characters")
        .required("Name is required"),

    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),

    phoneNo: Yup.string().min(0).max(12).default('0'),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
            'Password must contain letters, numbers, and special characters and must be 8 characters long'
        )
        .required("Password is required"),

    generatedOtp: Yup.string().required(),

    otp: Yup.string().required("OTP is required"),
});
