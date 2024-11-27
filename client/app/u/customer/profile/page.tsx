'use client'
import { montserratSubrayada } from "@/langs";
import { ImageDetailPage } from "./user-detail";
import { NotificationPage } from "./notifications";
import { DeleteAccountPage } from "./delete-account";
import { AddressPage } from "./address-container";
import { CustomerInterface } from "@/interfaces/customer";
import { PasswordPage } from "./password";

/**
 * The component that is used as a wrapper for the profile page
 * 
 * @returns Profile Page
 */
export default function CustomerProfileApp() {
    const customer: CustomerInterface = {
        "phoneNo": "+910808453231",
        "addressId": [],
        "notification": {
            "delivery": true,
            "review": false,
            "promotional": true,
            "return": false,
            "order": true
        },
        "updatedAt": "2024-11-25T17:49:28.587Z",
        "lastLoggedInAt": "2024-11-25T17:49:28.587Z"
    }


    return (
        <form className="p-5 md:w-2/3 w-full mx-auto space-y-5">
            <div className={`${montserratSubrayada.className} text-xl `}>My Profile</div>
            <ImageDetailPage phoneNo={customer.phoneNo} lastLoggedIn={customer.lastLoggedInAt} updatedAt={customer.updatedAt} />
            <AddressPage address={customer.addressId} />
            <PasswordPage />
            <NotificationPage notifications={customer.notification} />
            <DeleteAccountPage />
        </form>
    )
}

