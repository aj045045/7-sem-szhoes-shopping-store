import { montserratSubrayada } from "@/langs";
import { Button } from "@nextui-org/button";

/**
 * The Component that is used for the the user account
 * 
 * @returns Delete account and update the account
 */
export function DeleteAccountPage() {

    return (
        <div className="border-2 border-neutral-300 rounded-xl p-4">
            <span className={`${montserratSubrayada.className} text-lg`}>Account Privacy</span>
            <div className="flex flex-col space-y-2 bg-red-200 border-2 border-red-400 p-4 rounded-md mt-5">
                <span className="font-semibold text-red-700">Delete Personal Account</span>
                <span>Please note that this action will permanently delete your personal account and all associated credentials from the SZhoes platform. This action cannot be undone. Proceed with caution and ensure that you have considered all implications before continuing.</span>
                <Button variant="flat" className="w-fit bg-red-400 text-red-950" color="danger" radius="none" >Delete Account</Button>
            </div>
        </div>
    )
}