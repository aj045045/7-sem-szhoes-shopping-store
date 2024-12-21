import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button"
import Image from "next/image";
import { IoWarning } from "react-icons/io5";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

/**
 * The component that is used to update the password if he forget
 * 
 * @returns The Login 3 Page 
 */
export function LoginPage_3({ formData, validationErrors, handleInputChange, handleSubmit, setStep }: { formData: any, validationErrors: any, handleInputChange: any, handleSubmit: any, setStep: any }) {
    const [isVisible, setIsVisible] = useState(false);
    const previousStep = () => {
        setStep(2);
    }
    return (<div className="sm:flex-row sm:flex w-3/4 mx-auto mt-20 shadow-xl shadow-neutral-300 rounded-3xl">
        <div className="w-full hidden sm:block bg-green-500 rounded-s-3xl content-center">
            <Image src={"/images/reset-password.png"} alt="Login Image" priority width={0} height={0} className="w-full p-5" unoptimized />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:w-2/3 w-full py-10 bg-white sm:rounded-e-3xl sm:rounded-s-none rounded-2xl pl-10">
            <div className="space-y-2 mb-5">
                <div className="text-3xl">Login</div>
            </div>
            <Input label="New Password" name="newPassword" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} isRequired labelPlacement="outside" placeholder="Enter New Password" variant="bordered" radius="sm"
                errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-3xl" /><p>Passwords must be at least 8 characters long and include letters, numbers, and special characters.</p></div>}
                endContent={<button className="focus:outline-none" type="button" onMouseEnter={() => setIsVisible(true)} onMouseLeave={()=>setIsVisible(false)}>{isVisible ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>} type={isVisible ? "text" : "password"} onChange={handleInputChange} value={formData.newPassword} isInvalid={validationErrors.newPassword} />
            <Input label="Confirm Password" name="confirmPassword" classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }} isRequired labelPlacement="outside" placeholder="Enter Password again to Confirm" variant="bordered" radius="sm" onChange={handleInputChange} value={formData.confirmPassword} isInvalid={validationErrors.confirmPassword}
                endContent={<button className="focus:outline-none" type="button" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>{isVisible ? (<FaEyeSlash className="text-2xl text-neutral-400 pointer-events-none" />) : (<FaEye className="text-2xl text-neutral-400 pointer-events-none" />)}</button>} type={isVisible ? "text" : "password"} />
            {formData.newPassword === formData.confirmPassword ? "" : <div className="flex flex-row space-x-2 items-center text-sm mt-1 text-red-500"><IoWarning className="text-medium" /><p>New Password and Confirm Password are not same</p></div>}
            <div className="flex flex-row w-11/12 bottom-0 mt-auto  space-x-5">
                <Button isDisabled={true} size="md" radius="none" className="mt-10 border-2 border-green-600 bg-transparent uppercase w-full self-center" onClick={previousStep}>Back</Button>
                <Button isDisabled={formData.newPassword === formData.confirmPassword && formData.newPassword.length > 3 ? false : true} type="submit" variant="solid" size="md" radius="none" className="bg-green-500 mt-10 uppercase w-full self-center">Submit</Button>
            </div>
        </form>
    </div>
    )
}
