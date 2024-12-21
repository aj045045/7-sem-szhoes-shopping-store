import { PersonalInformationInterface } from "./interface";
import { montserrat_Subrayada } from "@/langs";
import { ShowAddress } from "./ShowAddress";
import { AddAddress } from "./AddAddress";

/**
 * The Component that is used to add or update the address of the user
 * 
 * @param formData - The Form Data
 * @parm handleInputChange - The Input Handler
 * @param validationErrors - The Error Validator
 * @returns Address
 */
export function Address({ formData, setFormData }: PersonalInformationInterface) {
    const addressIdArray: string[] = Array.from(formData.addressId).filter((id): id is string => id !== null && id !== undefined && id !== '');

    return (
        <div className="space-x-4 border-2 border-neutral-300 rounded-xl p-4">
            <div className="flex justify-between">
                <span className={`${montserrat_Subrayada.className} text-lg`}>Address</span>
                <AddAddress profileFormData={formData} setProfileFormData={setFormData} />
            </div>
            <div className="px-2">
                {addressIdArray.length > 0 ? (
                    addressIdArray.map((id: string, index: number) => (
                        id && <ShowAddress setProfileFormData={setFormData} key={index} id={id} />
                    ))
                ) : (
                    <div className="w-full h-20 items-center flex justify-center text-lg bg-gray-300 rounded-lg my-5 text-gray-600 ">No address is found</div>
                )}
            </div>
        </div>
    )
}





