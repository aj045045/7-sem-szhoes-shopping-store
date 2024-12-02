'use client'
import { useState } from "react";
import { Login_1Page } from "./login-1";
import { Login_2Page } from "./login-2";
import { Login_3Page } from "./login-3";
import { FormWrapperUtil } from "@/utility/form-wrapper";
import { LoginCustomerInterface, LoginFormInterface, LoginValidationSchema } from "@/interfaces/login";
import { ResponseInterface } from "@/interfaces/response";
import { ToastUtil } from "@/utility/toast";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

/**
 * The components that is used as a wrapper for the login stepper form
 * 
 * @returns The log stepper form
 */
export default function LoginApp() {
    const [currentStep, setCurrentStep] = useState(1);
    const { login } = useUserStore();
    const router = useRouter();
    const nextStep = () => {
        setCurrentStep(prevStep => prevStep + 1);
    };
    const previousStep = () => {
        setCurrentStep(prevStep => prevStep - 1);
    };

    const onSubmitLogin = (data: LoginFormInterface) => {
        fetch('/s/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result: ResponseInterface<LoginCustomerInterface>) => {
                if (result.status == "error" && result.message) {
                    ToastUtil.error(result.message)
                }
                if (result.status == "success" && result.message) {
                    ToastUtil.success(result.message)
                }
                if (result.data?.token && result.data.user) {
                    Cookies.set('token', result.data.token, { expires: 1 });
                    login(result.data.user);
                    ToastUtil.success("Thanks for login");
                    router.push("customer/profile");
                }
            })
    }

    return (
        <FormWrapperUtil<LoginFormInterface>
            onSubmit={(data: LoginFormInterface) => onSubmitLogin(data)}
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
