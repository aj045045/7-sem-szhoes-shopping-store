'use client'
import { useGetHook, usePostHook } from "@/hooks";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { usePathname } from "next/navigation";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { UserProfile } from "../customer/profile/interface";

/**
 * It is used to write a feedback for the website
 * 
 * This is a component that is responsible to provide the insight of UI by taking a feedback for the website
 * @returns The Feedback
 */
export function FeedbackComp() {
    const path = usePathname();
    const { data, fetchData, status } = useGetHook<UserProfile>("/s/customer");
    const { setFormData, formData, submitSuccess, validationErrors, handleInputChange, handleSubmit } = usePostHook("/s/auth/feedback", { userIdentification: "", feedback: "", pathName: path }, { feedback: /^[A-Za-z0-9\s,.!?()-]{0,200}$/, userIdentification: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ });

    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [fetchData, token]);

    useEffect(() => {
        if (data) {
            setFormData({
                userIdentification: data?.email,
                pathName: path,
            });
        }
    }, [data, path, setFormData])
    const [isDisplay, setIsDisplay] = useState(0);
    useEffect(() => {
        if (submitSuccess) {
            setIsDisplay(1);
        }
    }, [submitSuccess, formData]);

    return (
        <>
            {
                isDisplay != 1 &&
                <div className="text-medium bg-neutral-300 fixed px-4 py-2 shadow-lg shadow-neutral-400 bottom-4 rounded-lg left-4 z-50 select-none">
                    <div className="flex flex-row items-center  space-x-4">
                        <span className="md:text-medium sm:text-sm text-xs">Did this page help you?</span>
                        <FaThumbsUp className="md:text-xl sm:text-lg text-medium text-neutral-600" onClick={() => setIsDisplay(1)} />
                        <FaThumbsDown className="md:text-xl sm:text-lg text-medium text-neutral-600" onClick={() => setIsDisplay(2)} />
                    </div>
                    {
                        isDisplay == 2 && <form onSubmit={handleSubmit} className="flex justify-center flex-col mt-4 space-y-4 pb-2">
                            <Input size="md" radius="sm" name="userIdentification" classNames={{ inputWrapper: token ? "bg-neutral-400/50 border-neutral-500/50" : "" }} label="Email Id" disabled={token ? true : false} onChange={handleInputChange} value={formData.userIdentification} placeholder="Enter email Id" variant="bordered" labelPlacement="outside" isInvalid={validationErrors.userIdentification} />
                            <Textarea
                                size="md"
                                minRows={5}
                                maxRows={8}
                                labelPlacement="outside"
                                isInvalid={validationErrors.feedback}
                                name="feedback"
                                value={formData.feedback}
                                onChange={handleInputChange}
                                variant="bordered"
                                errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please ensure feedback stays within 200 characters.</p></div>}
                                label="Feedback"
                                placeholder="Enter your Feedback ( within 200 character )"
                                className="max-w-xs"
                            />
                            <Button variant="solid" type="submit" size="sm" radius="none" className="bg-green-500 uppercase w-fit self-center" >Submit</Button>
                        </form>
                    }
                </div>
            }
        </>
    );
}