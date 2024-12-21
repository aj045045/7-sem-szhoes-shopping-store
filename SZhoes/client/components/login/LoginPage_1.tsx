'use client'
import { OTPHook } from "@/hooks/OtpGenerator";
import { AppDispatch } from "@/redux";
import { toggle_error } from "@/redux/feature/error";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { LoginInterface } from "./interface";
import { useGetHook } from "@/hooks";
import { useRouter } from "next/navigation";

/**
 * The component that is used to send the otp to user email address
 * 
 * @returns The Login Page 
 */
export function LoginPage_1({ formData, validationErrors, handleInputChange, setStep }: LoginInterface) {
    const { data, fetchData, status } = useGetHook<string>(`/s/auth/customer?emailId=${encodeURIComponent(formData.emailID)}&password=${encodeURIComponent(formData.password)}`);
    const router = useRouter();

    useEffect(() => {
        if (status) {
            localStorage.getItem("token") && localStorage.removeItem("token");
            data && localStorage.setItem("token", data);
            window.location.reload();
        }
    }, [status, data, router]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.emailID.length && !validationErrors.emailID && formData.password.length && !validationErrors.password) {
            fetchData();
        }
    }

    const nextStep = useCallback(async () => {
        if (formData.emailID.length && !validationErrors.emailID) {
            setIsDisabled(true);
            formData.sendOtp = OTPHook();
            const regex = /@emp$/;
            let updatedEmailID = formData.emailID;
            if (regex.test(formData.emailID)) {
                updatedEmailID = formData.emailID.replace(regex, '');
            }
            const res = await fetch("api/otp", {
                method: "POST",
                body: JSON.stringify({
                    name: "User ",
                    emailId: updatedEmailID,
                    code: formData.sendOtp,
                    task: "Login"
                })
            });
            if (!res.ok) {
                dispatch(toggle_error({ data: "Network error try again!", type: "alert" }));
            } else {
                const data = await res.json();
                if (data.success) {
                    setStep(2);
                }
                else {
                    dispatch(toggle_error({ data: "Network error try again!", type: "alert" }));
                }
            }
        } else {
            dispatch(toggle_error({ data: "Please Enter Correct Email Id!", type: "alert" }));
        }
    }, [dispatch, formData, setStep, validationErrors]);
    return (
        <div className="sm:flex-row sm:flex w-3/4 mx-auto mt-20 shadow-xl shadow-neutral-300 rounded-3xl">
            <div className="w-full hidden sm:block bg-green-500 rounded-s-3xl content-center">
                <Image src={"/images/login.png"} alt="Login Image" width={0} height={0} className="w-full" unoptimized />
            </div>
            <form onSubmit={onHandleSubmit} className="flex flex-col sm:w-2/3 w-full py-10 bg-white sm:rounded-e-3xl sm:rounded-s-none rounded-2xl pl-10">
                <div className="space-y-2 mb-10">
                    <div className="text-3xl">Login</div>
                    <div className="text-neutral-500">Doesn&rsquo;t have an account yet? <Link prefetch={false} className="text-green-600 hover:underline hover:underline-offset-2" href={"/register"}>Register</Link></div>
                </div>
                <Input label="Email Address" name="emailID" isRequired classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Kelton77@example.org" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please Enter a Valid Email address</p></div>} onChange={handleInputChange} value={formData.emailID} isInvalid={validationErrors.emailID} />
                <Input label="Password" name="password" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter 8 Characters or more" variant="bordered" radius="sm" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-3xl" /><p>Passwords must be at least 8 characters long and include letters, numbers, and special characters.</p></div>} onChange={handleInputChange} value={formData.password} isInvalid={validationErrors.password} endContent={<button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>{isVisible ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>} type={isVisible ? "text" : "password"} />
                <div className={`text-sm text-green-600 mt-2 hover:underline hover:underline-offset-2 ${isDisabled && 'cursor-not-allowed opacity-50'}`} onClick={!isDisabled ? nextStep : undefined} >Forgot Password?</div>
                <Checkbox color="success" className="mt-5">Remember me</Checkbox>
                <Button type="submit" variant="solid" size="md" radius="none" className="bg-green-500 mt-10 uppercase w-10/12 self-center">Login</Button>
            </form>
        </div>
    );
}