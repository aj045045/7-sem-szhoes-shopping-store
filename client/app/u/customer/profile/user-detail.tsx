import { CustomerProfileInterface, CustomerProfileValidationSchema } from "@/interfaces/customer";
import { useUserStore } from "@/store";
import { FormWrapperUtil, getErrorMessage } from "@/utility/form-wrapper";
import { formatDateUtil } from "@/utility/other/format-date";
import { SubmitHandlerUtil } from "@/utility/submit-handler";
import { Avatar } from "@nextui-org/avatar";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

interface ImageDetailPageProps {
    lastLoggedIn: string;
    updatedAt: string;
    phoneNo: string;
}

/**
 * The Components that is used to display the user detail
 * 
 * @returns User Detail
 */
export function ImageDetailPage({ lastLoggedIn, updatedAt, phoneNo }: ImageDetailPageProps) {
    const { email, name } = useUserStore();
    const id = useUserStore.getState().loadUserId();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    return (
        <div className=" border-2 border-neutral-300 rounded-xl p-4 flex justify-between ">
            <FormWrapperUtil
                validationSchema={CustomerProfileValidationSchema}
                onSubmit={(data: CustomerProfileInterface) => SubmitHandlerUtil.onSubmitPut<CustomerProfileInterface>(`/s/customer/profile/${id}`, data)}
                className="flex space-x-4 items-center"
                defaultValues={{ name: name, phoneNo: phoneNo }}
            >
                {(register, errors) => (
                    <>
                        <Avatar
                            size="lg"
                            as="button"
                            classNames={{ base: "bg-gradient-to-tl from-lime-400 to-orange-400 ", name: "text-2xl md:text-4xl" }}
                            name={name.charAt(0)}
                            className="transition-transform"
                        />
                        <div className="flex flex-col">
                            {!isEdit ? (
                                <>
                                    <span className="lg:text-lg md:text-medium text-sm">{name}</span>
                                    {phoneNo && <span className="lg:text-medium md:text-sm text-xs text-neutral-500">{phoneNo}</span>}
                                </>
                            ) : (
                                <>
                                    <Input
                                        label="Customer Name"
                                        classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }}
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Customer Name"
                                        radius="sm"
                                        variant="bordered"
                                        {...register('name')}
                                        {...getErrorMessage(errors.name)}
                                    />
                                    <Input
                                        label="Phone Number"
                                        classNames={{ base: "w-11/12 pt-3 z-0", inputWrapper: "h-12" }}
                                        isRequired
                                        labelPlacement="outside"
                                        placeholder="Phone Number"
                                        radius="sm"
                                        variant="bordered"
                                        {...register('phoneNo')}
                                        {...getErrorMessage(errors.phoneNo)}
                                    />
                                    <Button type="submit" variant="solid" size="md" radius="none" className="bg-green-500 my-2 uppercase w-10/12 mr-10 self-center">Update</Button>
                                </>
                            )}
                            <span className="lg:text-medium md:text-sm text-xs text-neutral-500">{email}</span>
                            {lastLoggedIn && (
                                <span className="md:text-sm text-xs text-neutral-500 mt-2">
                                    Reviewed on {formatDateUtil(lastLoggedIn)}
                                </span>
                            )}
                            {updatedAt !== lastLoggedIn && (
                                <span className="md:text-sm text-xs text-neutral-500 mt-2">
                                    Updated on {formatDateUtil(updatedAt)}
                                </span>
                            )}
                        </div>
                    </>
                )}
            </FormWrapperUtil>
            <MdModeEdit onClick={() => setIsEdit(!isEdit)} className="bg-green-300 border-1 border-green-400 text-green-950 block p-0.5 text-2xl rounded-sm mt-3" />
        </div >
    )
}
