'use client'
import { useState } from "react";
import { Register_1Page } from "./register-1";
import { Register_2Page } from "./register-2";
import { FormWrapperUtil } from "@/utility/form-wrapper";
import { RegisterFormInterface, RegisterValidationSchema } from "@/interfaces/register";
import { SubmitHandlerUtil } from "@/utility/submit-handler";

/**
 * The component that is used as a wrapper page for the login page
 * 
 * @returns The Registration Page
 */
export default function RegisterApp() {
    const [currentStep, setCurrentStep] = useState(1);
    const nextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };
    return (
        <FormWrapperUtil
            onSubmit={(data: RegisterFormInterface) => SubmitHandlerUtil.onSubmitPost('/s/user/register', data)}
            validationSchema={RegisterValidationSchema}
        >
            {(register, errors, form) => (
                <>
                    {currentStep === 1 && <Register_1Page errors={errors} nextStep={nextStep} register={register} form={form} />}
                    {currentStep === 2 && <Register_2Page errors={errors} nextStep={nextStep} register={register} form={form} />}
                </>
            )}
        </FormWrapperUtil>
    );
}