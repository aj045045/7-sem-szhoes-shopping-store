'use client'
import { useEffect, useState } from "react";
import { LoginPage_1 } from "./LoginPage_1";
import { usePostHook } from "@/hooks";
import { LoginPage_2 } from "./LoginPage_2";
import { LoginPage_3 } from "./LoginPage_3";
import { useRouter } from "next/navigation";

/**
 * The components that is used as a wrapper for the login stepper form
 * 
 * @returns The log stepper form
 */
export function LoginComp() {
    const [currentStep, setCurrentStep] = useState(1);
    const { formData, submitSuccess, validationErrors, handleInputChange, handleSubmit } = usePostHook('/s/auth/customer/p', { emailID: "", password: "", sendOtp: "", otp: "", newPassword: "", confirmPassword: "" }, { emailID: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])(?:@emp)?$/, password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s: ])([^\s]){8,}$/, newPassword: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s: ])([^\s]){8,}$/, confirmPassword: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s: ])([^\s]){8,}$/, otp: /^[a-zA-Z0-9]{7}$/ });
    const router = useRouter();
    useEffect(() => {
        if (submitSuccess) {
            router.refresh();
        }
    }, [submitSuccess, router]);
    return <>
        {currentStep === 1 && <LoginPage_1 setStep={setCurrentStep} formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
        {currentStep === 2 && <LoginPage_2 setStep={setCurrentStep} formData={formData} />}
        {currentStep === 3 && <LoginPage_3 setStep={setCurrentStep} formData={formData} validationErrors={validationErrors} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />}
    </>
}
