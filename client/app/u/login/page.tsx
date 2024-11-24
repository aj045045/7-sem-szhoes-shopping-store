'use client'
import { useState } from "react";
import { Login_1Page } from "./login-1";
import { Login_2Page } from "./login-2";
import { Login_3Page } from "./login-3";
import { FormWrapperUtil } from "@/utility/form-wrapper";
import { SubmitHandlerUtil } from "@/utility/submit-handler";
import { LoginFormInterface, LoginValidationSchema } from "@/interfaces/login";

/**
 * The components that is used as a wrapper for the login stepper form
 * 
 * @returns The log stepper form
 */
export default function LoginApp() {
    const [currentStep, setCurrentStep] = useState(1);
    const nextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };
    const previousStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };
    return (
        <FormWrapperUtil<LoginFormInterface>
            onSubmit={(data: LoginFormInterface) => SubmitHandlerUtil.onSubmitPost<LoginFormInterface>('/s/user', data)}
            validationSchema={LoginValidationSchema}
        >
            {(register, errors, form) => (<>
                {currentStep === 1 && <Login_1Page form={form} errors={errors} register={register} nextStep={nextStep} previousStep={previousStep} />}
                {currentStep === 2 && <Login_2Page form={form} errors={errors} register={register} nextStep={nextStep} previousStep={previousStep} />}
                {currentStep === 3 && <Login_3Page form={form} errors={errors} register={register} nextStep={nextStep} previousStep={previousStep} />}
            </>)}
        </FormWrapperUtil>
    );
}
