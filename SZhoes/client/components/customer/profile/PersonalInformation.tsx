import { montserrat_Subrayada } from "@/langs";
import { Input } from "@nextui-org/input";
import { IoWarning } from "react-icons/io5";
import { PersonalInformationInterface } from "./interface";

/**
 * The component that is used to update the detail of the user
 * 
 * @param formData - The form data
 * @param handleInputChange - The input handler
 * @param validationErrors - The error validator
 * @returns The User Information to be updated
 */
export function PersonalInformation({ formData, handleInputChange, validationErrors }: PersonalInformationInterface) {
    return (
        <div className="space-x-4 border-2 border-neutral-300 rounded-xl p-4">
            <span className={`${montserrat_Subrayada.className} text-lg`}>Personal Information</span>
            <div className="grid grid-cols-2">
                <Input label="Full Name" name="name" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter Your name" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please Enter valid name</p></div>} onChange={handleInputChange} value={formData.name} isInvalid={validationErrors.name} />
                <Input label="Email Address" isReadOnly name="email" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-300 border-2 border-neutral-400" }} disabled labelPlacement="outside" placeholder="" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please Enter a Valid Email address</p></div>} onChange={handleInputChange} value={formData.email} isInvalid={validationErrors.email} />
                <Input label="Phone Number" name="phoneNo" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter phone number (with +)" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please Enter valid phone Number</p></div>} onChange={handleInputChange} value={formData.phoneNo} isInvalid={validationErrors.phoneNo} />
            </div>
        </div>
    )
}