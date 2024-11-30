'use client'
import { montserratSubrayada } from "@/langs";
import { FormWrapperUtil, getErrorMessage } from "@/utility/form-wrapper";
import { SubmitHandlerUtil } from "@/utility/submit-handler";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import * as Yup from 'yup';

/**
 * The components that is used to update the password of the user 
 * 
 * @param formData - The formData
 * @param handleInputChange - The Input Handler
 * @param validationErrors - The error validator
 * @returns Update password
 */
export function PasswordPage() {
    const [isVisible, setIsVisible] = useState([false, false, false]);
    const toggleVisibility = (index: number) => {
        setIsVisible((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };

    interface PasswordUpdate {
        password: string;
        confirmPassword: string;
        newPassword: string;
    }

    const UpdatePasswordValidationSchema = Yup.object({
        password: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                'Password must contain letters, numbers, and special characters and must be 8 characters long'
            )
            .required("Password is required"),
        confirmPassword: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                'Password must contain letters, numbers, and special characters and must be 8 characters long'
            )
            .required("Password is required").oneOf([Yup.ref('newPassword')], 'Passwords must match'),
        newPassword: Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
                'Password must contain letters, numbers, and special characters and must be 8 characters long'
            )
            .required("Password is required"),

    });

    return (
        <FormWrapperUtil
            validationSchema={UpdatePasswordValidationSchema}
            onSubmit={(data: PasswordUpdate) => SubmitHandlerUtil.onSubmitPut<PasswordUpdate>("/s/customer/password", data)}
            className="space-x-4 border-2 border-neutral-300 rounded-xl p-4"
        >
            {(register, errors, form) => (
                <>
                    <span className={`${montserratSubrayada.className} text-lg`}>Update Password</span>
                    <div className="flex flex-col items-center w-full">
                        <Input label="Old Password" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                            {...register('password')} {...getErrorMessage(errors.password)}
                            placeholder="Enter old Password" variant="bordered" radius="sm" endContent={<button className="focus:outline-none" type="button" onClick={() => toggleVisibility(0)}>{isVisible[0] ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>}
                            type={isVisible[0] ? "text" : "password"} />
                        <Input label="New Password" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                            {...register('newPassword')} {...getErrorMessage(errors.newPassword)}
                            placeholder="Enter new Password" variant="bordered" radius="sm" endContent={<button className="focus:outline-none" type="button" onClick={() => toggleVisibility(1)}>{isVisible[1] ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>}
                            type={isVisible[1] ? "text" : "password"} />
                        <Input label="Confirm Password" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter new Password again to confirm" variant="bordered" radius="sm"
                            {...register('confirmPassword')} {...getErrorMessage(errors.confirmPassword)}
                            endContent={<button className="focus:outline-none" type="button" onClick={() => toggleVisibility(2)}>{isVisible[2] ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>}
                            type={isVisible[2] ? "text" : "password"} />
                        {form?.watch('password') && (form.watch('password').length > 8 && form.watch('newPassword').length > 8 && form.watch('confirmPassword').length > 8) && <Button type="submit" className="text-green-950 bg-green-500 mt-5" radius="none">Update Password</Button>}
                    </div>
                </>
            )}
        </FormWrapperUtil>
    )
}