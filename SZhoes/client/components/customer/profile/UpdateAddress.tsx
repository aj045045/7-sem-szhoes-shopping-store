import { useDeleteHook, usePutHook } from "@/hooks";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { IoWarning } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { AddressInterface } from "./interface";
import { useEffect } from "react";

export function UpdateAddress({ id, data, setProfileFormData }: { data: AddressInterface | null, id: string, setProfileFormData: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { formData, validationErrors, handleInputChange, handleSubmit, setFormData, submitSuccess } = usePutHook(id, "/s/address", { street: "", city: "", state: "", country: "", zip: "" },
        { street: /^[a-zA-Z0-9\s,/.]+$/, city: /^[a-zA-Z\s'-.]+$/, state: /^[a-zA-Z]{2,}$/, country: /^[a-zA-Z\s]+$/, zip: /^\d{5,}(-\d{4,})?$/ });
    const { deleteData, status } = useDeleteHook(id, "/s/address");


    useEffect(() => {
        if (data) {
            setFormData({
                street: data.street,
                city: data.city,
                state: data.state,
                country: data.country,
                zip: data.zip,
            });
        }
    }, [data, setFormData]);

    useEffect(() => {
        if (submitSuccess) {
            window.location.reload();
        }
    }, [submitSuccess])
    const deleteAddress = () => {
        if (!status) {
            deleteData();
        }
    }
    useEffect(() => {
        if (status) {
            setProfileFormData((prevData: any) => {
                const updatedAddressIds = prevData.addressId.filter((iid: string) => iid !== id);
                return {
                    ...prevData,
                    addressId: updatedAddressIds
                };
            });
        }
    }, [id, setProfileFormData, status])

    return (
        <>
            <MdModeEdit onClick={onOpen} className="bg-green-300 border-1 border-green-400 text-green-950 block p-1 text-3xl rounded-md mt-3" />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1 bg-green-200">Update Address </ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2">
                                    <Input label="Street" name="street" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter your street / lane" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid street</p></div>} onChange={handleInputChange} value={formData.street} isInvalid={validationErrors.street} />
                                    <Input label="City" name="city" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter you city " radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid city</p></div>} onChange={handleInputChange} value={formData.city} isInvalid={validationErrors.city} />
                                    <Input label="State" name="state" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter your state" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid state</p></div>} onChange={handleInputChange} value={formData.state} isInvalid={validationErrors.state} />
                                    <Input label="Zip" name="zip" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter zip Address" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid zip</p></div>} onChange={handleInputChange} value={formData.zip} isInvalid={validationErrors.zip} />
                                    <Input label="Country" name="country" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="Enter you country" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid country</p></div>} onChange={handleInputChange} value={formData.country} isInvalid={validationErrors.country} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={deleteAddress} color="danger" radius="none" variant="light" onPress={onClose}>
                                    Delete
                                </Button>
                                <Button className="hover:bg-red-200" color="danger" radius="none" variant="bordered" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type="submit" className="text-green-950 bg-green-500" radius="none" onPress={onClose}>
                                    Update  
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}