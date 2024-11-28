'use client'
import { ChangeStepInterface } from "@/interfaces/register";
import { ResponseInterface } from "@/interfaces/response";
import { getErrorMessage } from "@/utility/form-wrapper";
import { OTPGeneratorUtil } from "@/utility/other/otp-generator";
import { ToastUtil } from "@/utility/toast";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import useSWR from "swr";

/**
 * The Registration Component that is used for the registration 
 * 
 * @returns The user detail and password
 */
export function Register_1Page({ errors, nextStep, register, form }: ChangeStepInterface) {

    const [isVisible, setIsVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isPresent, setIsPresent] = useState(false);

    const { data } = useSWR<string[]>("/s/auth/get-email");
    const watch = form?.watch("email");
    useEffect(() => {
        if (data && watch && form) {
            if (data.includes(watch)) {
                setIsPresent(true);
            } else {
                setIsPresent(false);
            }
        }
    }, [watch, data, form]);

    const sendMail = async (): Promise<void> => {
        try {
            const { email, name, password } = form!.getValues();

            if (!name || !email || !password) {
                ToastUtil.error("Please fill in all required (*) fields.");
                return;
            }
            setIsDisabled(true);
            const otp = OTPGeneratorUtil();
            form?.setValue('generatedOtp', otp);

            // Send OTP request to the server
            const response = await fetch("/api/otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    emailId: email,
                    code: otp,
                    task: "Register"
                })
            });

            // Handle network errors
            if (!response.ok) {
                ToastUtil.error("Network error. Please try again.");
                return;
            }

            // Process the response
            const data: ResponseInterface = await response.json();
            if (data.status === 'success') {
                ToastUtil.success("We have sent an OTP to your email.");
                nextStep(); // Proceed to the next step
            } else {
                ToastUtil.error("An error occurred. Please try again.");
            }
        } catch (error) {
            // Catch any unexpected errors
            console.error("Error sending OTP:", error);
            ToastUtil.error("Something went wrong. Please try again.");
        } finally {
            // Re-enable the form in case of an error or successful completion
            setIsDisabled(false);
        }
    };

    return (<div className="sm:flex-row sm:flex w-3/4 mx-auto mt-20 shadow-xl shadow-neutral-300 rounded-3xl">
        <div className="w-full hidden sm:block bg-green-500 rounded-s-3xl content-center">
            <Image src={"/images/sign-up.png"} priority alt="Login Image" width={0} height={0} className="w-full p-5" unoptimized />
        </div>
        <div className="flex flex-col sm:w-2/3 w-full py-10 bg-white sm:rounded-e-3xl sm:rounded-s-none rounded-2xl pl-10">
            <div className="space-y-2 mb-5">
                <div className="text-3xl">Register</div>
                <div className="text-neutral-500">Already have an account? <Link prefetch={false} className="text-green-600 hover:underline hover:underline-offset-2" href={"/u/login"}>Login</Link></div>
            </div>
            <Input label="User Name"
                classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} isRequired labelPlacement="outside" placeholder="User Name" radius="sm" variant="bordered"
                {...register('name')}
                {...getErrorMessage(errors.name)}
            />
            <Input label="Phone number ( Optional )" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                placeholder="+91##########" radius="sm" variant="bordered"
                {...register('phoneNo')}
                {...getErrorMessage(errors.phoneNo)}
            />
            <Input label="Email Address" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} isRequired labelPlacement="outside"
                placeholder="mail@example.com" radius="sm" variant="bordered"
                {...register('email')}
                isInvalid={!!errors.email || isPresent}
                errorMessage={errors.email?.message || "This email ID is already in use.Please try using a different email ID."}
            />
            <Input label="Password" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} isRequired labelPlacement="outside"
                placeholder="Enter 8 Characters or more"
                variant="bordered" radius="sm"
                endContent={<button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>{isVisible ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>}
                type={isVisible ? "text" : "password"}
                {...register('password')}
                {...getErrorMessage(errors.password)}
            />
            <Button disabled={isDisabled || isPresent} variant="solid" size="md" radius="none" className={`bg-green-500 mt-10 uppercase w-10/12 mr-10 self-center ${isDisabled || isPresent && 'cursor-not-allowed opacity-50 data-[hover=true]:opacity-50'}`} onClick={sendMail}>send otp</Button>
        </div>
    </div>
    )
}