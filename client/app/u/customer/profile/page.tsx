'use client'
import { montserratSubrayada } from "@/langs";
import { ImageDetailPage } from "./user-detail";
import { NotificationPage } from "./notifications";
import { DeleteAccountPage } from "./delete-account";
import { AddressPage } from "./address-container";
import { CustomerInterface } from "@/interfaces/customer";
import { PasswordPage } from "./password";
import useSWR from "swr";
import { useUserStore } from "@/store";
import { SkeletonPage } from "./skeleton";
import { useEffect } from "react";

/**
 * The component that is used as a wrapper for the profile page
 * 
 * @returns Profile Page
 */
export default function CustomerProfileApp() {
    const userId = useUserStore.getState().loadUserId();
    const { data, isLoading } = useSWR<CustomerInterface>(`/s/customer/detail/${userId}`);
    useEffect(() => console.log(data));
    if (isLoading || !data) return <SkeletonPage />;
    return (
        <form className="p-5 md:w-2/3 w-full mx-auto space-y-5">
            <div className={`${montserratSubrayada.className} text-xl `}>My Profile</div>
            <ImageDetailPage phoneNo={data.phoneNo} lastLoggedIn={data.lastLoggedInAt} updatedAt={data.updatedAt} />
            <AddressPage address={data.addressId} />
            <PasswordPage />
            <NotificationPage notifications={data.notification} />
            <DeleteAccountPage />
        </form>
    )
}

