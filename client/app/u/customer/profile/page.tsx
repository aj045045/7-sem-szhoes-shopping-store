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

/**
 * The component that is used as a wrapper for the profile page
 * 
 * @returns Profile Page
 */
export default function CustomerProfileApp() {
    const userId = useUserStore.getState().loadUserId();
    const { data, isLoading } = useSWR<CustomerInterface[]>(`/s/customer/detail/${userId}`);
    if (isLoading || !data) return <SkeletonPage />;
    return (
        <div className="p-5 md:w-2/3 w-full mx-auto space-y-5">
            <div className={`${montserratSubrayada.className} text-xl `}>My Profile</div>
            <ImageDetailPage phoneNo={data[0].phoneNo} lastLoggedIn={data[0].lastLoggedInAt} updatedAt={data[0].updatedAt} />
            <AddressPage address={data[0].addresses} />
            <PasswordPage />
            <NotificationPage notifications={data[0].notification} />
            <DeleteAccountPage />
        </div>
    )
}

