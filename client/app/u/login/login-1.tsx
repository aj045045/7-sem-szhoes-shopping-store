'use client'
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { ChangeStepInterface } from "@/interfaces/login";
import { getErrorMessage } from "@/utility/form-wrapper";
import { OTPGeneratorUtil } from "@/utility/other/otp-generator";
import { ToastUtil } from "@/utility/toast";
import useSWR from "swr";

/**
 * The component that is used to send the otp to user email address
 * 
 * @returns The Login Page 
 */
export function Login_1Page({ nextStep, errors, register, form }: ChangeStepInterface) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isPresent, setIsPresent] = useState(false);
    const { data } = useSWR<string[]>("/s/auth/get-email");

    const watch = form?.watch("email");

    useEffect(() => {
        if (data && watch && form) {
            if (data.includes(watch)) {
                setIsPresent(false);
            } else {
                setIsPresent(true);
            }
        }
    }, [watch, data, form]);

    const sendMail = () => {
        setIsDisabled(!isDisabled);
        const email = form?.getValues('email') || '';
        if (email.length > 10) {
            const otp = OTPGeneratorUtil();
            form?.setValue('generatedOtp', otp);
            nextStep();
        } else {
            ToastUtil.error('Email Id is required');
            setIsDisabled(!isDisabled);
        }
    };

    return (
        <div className="sm:flex-row sm:flex w-3/4 mx-auto mt-20 shadow-xl shadow-neutral-300 rounded-3xl mb-20">
            <div className="w-full hidden sm:block bg-green-500 rounded-s-3xl content-center">
                <Image priority={true} src={"/images/login.png"} alt="Login Image" width={0} height={0} className="w-full" unoptimized />
            </div>
            <div className="flex flex-col sm:w-2/3 w-full py-10 bg-white sm:rounded-e-3xl sm:rounded-s-none rounded-2xl pl-10">
                <div className="space-y-2 mb-10">
                    <div className="text-3xl">Login</div>
                    <div className="text-neutral-500">Doesn&rsquo;t have an account yet? <Link prefetch={false} className="text-green-600 hover:underline hover:underline-offset-2" href={"/u/register"}>Register</Link></div>
                </div>
                <Input
                    label="Email Address"
                    isRequired
                    classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }}
                    labelPlacement="outside"
                    placeholder="username@example.org"
                    radius="sm"
                    variant="bordered"
                    {...register('email')}
                    isInvalid={!!errors.email || isPresent}
                    errorMessage={errors.email?.message || "This email ID is not in use. Please try using a different email ID."}
                />
                <Input
                    label="Password"
                    classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }}
                    labelPlacement="outside"
                    placeholder="Enter 8 Characters or more"
                    variant="bordered"
                    radius="sm"
                    endContent={<button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>{isVisible ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>}
                    type={isVisible ? "text" : "password"}
                    {...register('password')}
                    {...getErrorMessage(errors.password)}
                />
                <div className={`text-sm text-green-600 mt-2 hover:underline hover:underline-offset-2 ${isDisabled || isPresent && 'cursor-not-allowed opacity-50'}`}
                    onClick={sendMail} >Forgot Password?</div>
                <Button type="submit"
                    variant="solid"
                    size="md"
                    radius="none"
                    className="bg-green-500 mt-10 uppercase w-11/12 self-center mr-6">
                    Login
                </Button>
            </div>
        </div >
    );
}