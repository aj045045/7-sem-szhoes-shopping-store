'use client'
import { useState } from "react";
import { RegisterPage_1 } from "./RegisterPage_1";
import { RegisterPage_2 } from "./RegisterPage_2";
import { usePostHook } from "@/hooks";
import { useRouter } from "next/navigation";

/**
 * The component that is used as a wrapper page for the login page
 * 
 * @returns The Registration Page
 */
export function RegisterComp() {
    const [currentStep, setCurrentStep] = useState(1);
    const { formData, submitSuccess, validationErrors, handleInputChange, handleSubmit } = usePostHook("/s/auth/customer", { name: "", phone: "", emailId: "", password: "", sendOtp: "", otp: "" }, {
        name: /^[a-zA-Z ]{7,19}$/, phone: /^\+\d{12}$/, emailId: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s: ])([^\s]){8,}$/, otp: /^[a-zA-Z0-9]{7}$/
    });
    const router = useRouter();
    if (submitSuccess) {
        router.push('/login');
    }
    return (
        <div className="pb-10">
            {currentStep === 1 && <RegisterPage_1 setStep={setCurrentStep} formData={formData} validationErrors={validationErrors} handleInputChange={handleInputChange} />}
            {currentStep === 2 && <RegisterPage_2 setStep={setCurrentStep} formData={formData} validationErrors={validationErrors} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />}
        </div>
    );
}