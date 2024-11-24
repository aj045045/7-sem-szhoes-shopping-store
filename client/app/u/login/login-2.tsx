'use client'
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ChangeStepInterface } from "@/interfaces/login";
import { formatTime } from "@/utility/other/format-date";
import { Button } from "@nextui-org/button"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { IoWarning } from "react-icons/io5";

/**
 * The component that is used to handle correct otp
 * 
 * @returns The Forget Password with otp handler
 */

export function Login_2Page({ nextStep, previousStep, form }: ChangeStepInterface) {
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeLeft]);



    return (<div className="sm:flex-row sm:flex w-3/4 mx-auto mt-20 shadow-xl shadow-neutral-300 rounded-3xl mb-20">
        <div className="w-full hidden sm:block bg-green-500 rounded-s-3xl content-center">
            <Image src={"/images/otp.png"} alt="Login Image" priority={true} width={0} height={0} className="w-full p-5" unoptimized />
        </div>
        <div className="flex flex-col sm:w-2/3 w-full py-10 bg-white sm:rounded-e-3xl sm:rounded-s-none rounded-2xl pl-10">
            <div className="space-y-2 mb-5">
                <div className="text-3xl">Login</div>
                <div className="text-neutral-500">Doesn&rsquo;t have an account yet? <Link prefetch={false} className="text-green-600 hover:underline hover:underline-offset-2" href={"/register"}>Register</Link></div>
            </div>
            <div className="space-y-2">
                <Controller
                    name="otp"
                    control={form?.control}
                    render={({ field }) => (
                        <>
                            <InputOTP maxLength={7} value={field.value} onChange={(e) => field.onChange(e)}>
                                {[...Array(7)].map((_, index) => (
                                    <InputOTPGroup key={index}>
                                        <InputOTPSlot className="border border-neutral-600" index={index} />
                                    </InputOTPGroup>
                                ))}
                            </InputOTP>
                            <div>{formatTime(timeLeft)}</div>
                            <p className={`${field.value === form?.getValues('generatedOtp') ? "hidden" : "block"} text-sm text-red-500 flex flex-row mt-2 items-center`}>
                                <IoWarning className="text-lg mr-1" />OTP does&apos;t match</p>
                            <div className="flex flex-row w-11/12 bottom-0 mt-auto  space-x-5">
                                <Button isDisabled={timeLeft === 0 ? false : true} size="md" radius="none" className="mt-10 border-2 border-green-600 bg-transparent uppercase w-full self-center" onClick={previousStep}>Back</Button>
                                <Button isDisabled={field.value === form?.getValues('generatedOtp') ? false : true} onClick={nextStep} variant="solid" size="md" radius="none" className="bg-green-500 mt-10 uppercase w-full self-center">Next</Button>
                            </div>
                        </>
                    )} />
            </div>
        </div>
    </div>
    )
}