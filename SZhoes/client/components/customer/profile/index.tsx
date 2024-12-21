'use client'
import { montserrat_Subrayada } from "@/langs";
import { ImageDetail } from "./ImageDetail";
import { PersonalInformation } from "./PersonalInformation";
import { Address } from "./Address";
import { Password } from "./Password";
import { Notification } from "./Notification";
import { Account } from "./Account";
import { useGetHook, usePutHook } from "@/hooks";
import { useEffect } from "react";
import { UserProfile } from "./interface";

/**
 * The component that is used as a wrapper for the profile page
 * 
 * @returns Profile Page
 */
export function CustomerProfileComp() {
    const { data, fetchData, status } = useGetHook<UserProfile>("/s/customer");
    const { formData, validationErrors, handleInputChange, handleSubmit, setFormData, } = usePutHook(data?.id, "/s/customer",
        {
            id: "",
            name: "",
            email: "",
            phoneNo: "",
            addressId: "",
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
            notification: "",
        }, { name: /^[a-zA-Z ]{7,19}$/, phoneNo: /^\+\d{12}$/, confirmPassword: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s: ])([^\s]){8,}$/, newPassword: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s: ])([^\s]){8,}$/, oldPassword: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s: ])([^\s]){8,}$/, });

    useEffect(() => {
        if (data) {
            setFormData({
                id: data.id,
                name: data.name,
                email: data.email,
                notification: data.notification,
                phoneNo: data.phoneNo,
                addressId: data.addressId,
            });
        } else if (!status) {
            fetchData();
        }
    }, [data, status, fetchData, setFormData]);

    return (
        <form onSubmit={handleSubmit} className="p-5 md:w-2/3 w-full mx-auto space-y-5">
            <div className={`${montserrat_Subrayada.className} text-xl `}>My Profile</div>
            <ImageDetail emailId={data?.email} lastLoggedIn={data?.lastLoggedInAt} name={data?.name} updatedAt={data?.updatedAt} />
            <PersonalInformation handleInputChange={handleInputChange} formData={formData} validationErrors={validationErrors} />
            <Address formData={formData} setFormData={setFormData} />
            <Password handleInputChange={handleInputChange} validationErrors={validationErrors} formData={formData} />
            <Notification setFormData={setFormData} formData={formData} handleInputChange={handleInputChange} />
            <Account data={data} formData={formData} />
        </form>
    )
}

