'use client'
import { montserrat_Subrayada } from "@/langs";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import { PersonalInformationInterface } from "./interface";

/**
 * The components that is used to update the password of the user 
 * 
 * @param formData - The formData
 * @param handleInputChange - The Input Handler
 * @param validationErrors - The error validator
 * @returns Update password
 */
export function Password({ formData, handleInputChange, validationErrors }: PersonalInformationInterface) {
    const [isVisible, setIsVisible] = useState([false, false, false]);
    const toggleVisibility = (index: number) => {
        setIsVisible((prev) => {
            const newVisibility = [...prev];
            newVisibility[index] = !newVisibility[index];
            return newVisibility;
        });
    };
    return (
        <div className="space-x-4 border-2 border-neutral-300 rounded-xl p-4">
            <span className={`${montserrat_Subrayada.className} text-lg`}>Update Password</span>
            <Input label="Old Password" name="oldPassword" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter old Password" variant="bordered" radius="sm" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-3xl" /><p>Passwords must be at least 8 characters long and include letters, numbers, and special characters.</p></div>} onChange={handleInputChange} value={formData.oldPassword} isInvalid={validationErrors.oldPassword} endContent={<button className="focus:outline-none" type="button" onClick={() => toggleVisibility(0)}>{isVisible[0] ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>} type={isVisible[0] ? "text" : "password"} />
            <Input label="New Password" name="newPassword" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter new Password" variant="bordered" radius="sm" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-3xl" /><p>Passwords must be at least 8 characters long and include letters, numbers, and special characters.</p></div>} onChange={handleInputChange} value={formData.newPassword} isInvalid={validationErrors.newPassword} endContent={<button className="focus:outline-none" type="button" onClick={() => toggleVisibility(1)}>{isVisible[1] ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>} type={isVisible[1] ? "text" : "password"} />
            <Input label="Confirm Password" name="confirmPassword" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter new Password again to confirm" variant="bordered" radius="sm" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-3xl" /><p>Passwords must be at least 8 characters long and include letters, numbers, and special characters.</p></div>} onChange={handleInputChange} value={formData.confirmPassword} isInvalid={validationErrors.confirmPassword} endContent={<button className="focus:outline-none" type="button" onClick={() => toggleVisibility(2)}>{isVisible[2] ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>} type={isVisible[2] ? "text" : "password"} />
        </div>
    )
}