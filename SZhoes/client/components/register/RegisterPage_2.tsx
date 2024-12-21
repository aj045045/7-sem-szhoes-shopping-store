'use client'
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { LoginInterface } from "../login/interface";
import OtpInput from "../utility/Otp";

/**
 * The Component that is used for the Otp Verification 
 * 
 * @returns The Otp Input 
 */
export function RegisterPage_2({ formData, validationErrors, handleInputChange, handleSubmit, setStep }: LoginInterface) {
    const [timeLeft, setTimeLeft] = useState(300);
    useEffect(() => {
        if (timeLeft === 0) {
            formData.sendOtp = "";
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft, formData]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const previousStep = () => {
        setStep(1);
    }

    const handleOtpChange = (value: string) => {
        formData.otp = value;
    };

    return (<div className="sm:flex-row sm:flex w-3/4 mx-auto mt-20 shadow-xl shadow-neutral-300 rounded-3xl">
        <div className="w-full hidden sm:block bg-green-500 rounded-s-3xl content-center">
            <Image src={"/images/otp.png"} alt="Login Image" priority width={0} height={0} className="w-full p-5" unoptimized />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:w-2/3 w-full py-10 bg-white sm:rounded-e-3xl sm:rounded-s-none rounded-2xl pl-10">
            <div className="space-y-2 mb-5">
                <div className="text-3xl">Register</div>
                <div className="text-neutral-500">Already have an account? <Link prefetch={false} className="text-green-600 hover:underline hover:underline-offset-2" href={"/login"}>Login</Link></div>
            </div>
            <div className="space-y-2">
                <OtpInput length={7} onChange={handleOtpChange} />
                <div>{formatTime(timeLeft)}</div>
            </div>
            <p className={`${formData.sendOtp === formData.otp ? "hidden" : "block"} text-sm text-red-500 flex flex-row mt-2 items-center`}><IoWarning className="text-lg mr-1" />The entered OTP does not match.</p>
            <div className="flex flex-row w-11/12 bottom-0 mt-auto  space-x-5">
                <Button isDisabled={timeLeft == 0 ? false : true} size="md" radius="none" className="mt-10 border-2 border-green-600 bg-transparent uppercase w-full self-center" onClick={previousStep}>Back</Button>
                <Button isDisabled={formData.sendOtp === formData.otp ? false : true} type="submit" variant="solid" size="md" radius="none" className="bg-green-500 mt-10 uppercase w-full self-center">Register</Button>
            </div>
        </form>
    </div>
    )
}
