'use client'
import { OTPHook } from "@/hooks/OtpGenerator";
import { AppDispatch } from "@/redux";
import { toggle_error } from "@/redux/feature/error";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { LoginInterface } from "../login/interface";

/**
 * The Registration Component that is used for the registration 
 * 
 * @returns The user detail and password
 */
export function RegisterPage_1({ formData, validationErrors, handleInputChange, setStep }: LoginInterface) {
    const [isVisible, setIsVisible] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const nextStep = async () => {
        if (formData.name && formData.emailId && formData.password && !validationErrors.name && !validationErrors.emailId && !validationErrors.password) {
            setIsDisabled(true);
            formData.sendOtp = OTPHook();
            const res = await fetch("api/otp", {
                method: "POST",
                body: JSON.stringify({
                    name: formData.name,
                    emailId: formData.emailId,
                    code: formData.sendOtp,
                    task: "Register"
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
            dispatch(toggle_error({ data: "Please Enter required(*) fields!", type: "alert" }));
        }
    };

    return (<div className="sm:flex-row sm:flex w-3/4 mx-auto mt-20 shadow-xl shadow-neutral-300 rounded-3xl">
        <div className="w-full hidden sm:block bg-green-500 rounded-s-3xl content-center">
            <Image src={"/images/sign-up.png"} priority alt="Login Image" width={0} height={0} className="w-full p-5" unoptimized />
        </div>
        <div className="flex flex-col sm:w-2/3 w-full py-10 bg-white sm:rounded-e-3xl sm:rounded-s-none rounded-2xl pl-10">
            <div className="space-y-2 mb-5">
                <div className="text-3xl">Register</div>
                <div className="text-neutral-500">Already have an account? <Link prefetch={false} className="text-green-600 hover:underline hover:underline-offset-2" href={"/login"}>Login</Link></div>
            </div>
            <Input label="User Name" name="name" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} isRequired labelPlacement="outside" placeholder="Cody Heathcote" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Name must be alphabetic character and between 6 to 20 character</p></div>} onChange={handleInputChange} value={formData.name} isInvalid={validationErrors.name} />
            <Input label="Phone number ( Optional )" name="phone" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="+912846049492" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Phone number must be number with country code</p></div>} onChange={handleInputChange} value={formData.phone} isInvalid={validationErrors.phone} />
            <Input label="Email Address" name="emailId" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} isRequired labelPlacement="outside" placeholder="Estevan.Beahan8@example.net" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Email Id must be valid email address</p></div>} onChange={handleInputChange} value={formData.emailId} isInvalid={validationErrors.emailId} />
            <Input label="Password" name="password" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} isRequired labelPlacement="outside" placeholder="Enter 8 Characters or more" variant="bordered" radius="sm" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-3xl" /><p>Passwords must be  at least 8 characters long and include letters, numbers, and special characters.</p></div>} onChange={handleInputChange} value={formData.password} isInvalid={validationErrors.password} endContent={<button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>{isVisible ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>} type={isVisible ? "text" : "password"} />
            <Button disabled={isDisabled} variant="solid" size="md" radius="none" className={`bg-green-500 mt-10 uppercase w-10/12 self-center ${isDisabled && 'cursor-not-allowed opacity-50 data-[hover=true]:opacity-50'}`} onClick={nextStep}>send otp</Button>
        </div>
    </div>
    )
}