import { useDeleteHook } from "@/hooks";
import { montserrat_Subrayada } from "@/langs";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * The Component that is used for the the user account
 * 
 * @returns Delete account and update the account
 */
export function Account({ data, formData }: { data: any, formData: any }) {
    const { deleteData, status } = useDeleteHook(formData.id, "/s/customer");
    const router = useRouter();
    const deleteAccount = () => {
        if (!status) {
            deleteData();
            router.push("/register");
        }
    }
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (data && data.addressId && formData.addressId) {
            if (data.addressId.length !== formData.addressId.length) {
                const timer = setTimeout(() => {
                    if (buttonRef.current) {
                        buttonRef.current.click();
                    }
                }, 2000);
                return () => clearTimeout(timer);
            }
        }
    }, [data, formData]);


    return (
        <div className="space-x-4 border-2 border-neutral-300 rounded-xl p-4 space-y-5">
            <span className={`${montserrat_Subrayada.className} text-lg`}>Account Privacy</span>
            <div className="flex flex-col space-y-2 bg-green-100 border-2 border-green-400 p-4 rounded-md">
                <span className="font-semibold text-green-700">Update Personal Account</span>
                <span>You are about to update your personal account settings on the SZhoes platform. Please review your changes carefully before confirming, as some modifications may affect your account functionality. Proceed with caution and ensure that all updates align with your preferences.</span>
                <Button ref={buttonRef} type="submit" className="bg-green-500 w-fit" radius="none">Update Account</Button>
            </div>
            <div className="flex flex-col space-y-2 bg-red-200 border-2 border-red-400 p-4 rounded-md">
                <span className="font-semibold text-red-700">Delete Personal Account</span>
                <span>Please note that this action will permanently delete your personal account and all associated credentials from the SZhoes platform. This action cannot be undone. Proceed with caution and ensure that you have considered all implications before continuing.</span>
                <Button onClick={deleteAccount} variant="flat" className="w-fit bg-red-400 text-red-950" color="danger" radius="none" >Delete Account</Button>
            </div>
        </div>
    )
}