import { usePostHook } from "@/hooks";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoWarning } from "react-icons/io5";

export function AddAddress({ profileFormData, setProfileFormData }: { profileFormData: any, setProfileFormData: any }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { formData, validationErrors, handleInputChange, handleSubmit, fetchedData } = usePostHook("/s/address",
        { street: "", city: "", state: "", country: "", zip: "" },
        { street: /^[a-zA-Z0-9\s,/.]+$/, city: /^[a-zA-Z\s'-.]+$/, state: /^[a-zA-Z]{2,}$/, country: /^[a-zA-Z\s]+$/, zip: /^\d{5,}(-\d{4,})?$/ });

    useEffect(() => {
        if (fetchedData) {
            setProfileFormData((prevData: any) => {
                if (!prevData.addressId.includes(fetchedData)) {
                    return {
                        ...prevData,
                        addressId: [...prevData.addressId, fetchedData]
                    };
                }
                return prevData;
            });
        }
    }, [fetchedData, setProfileFormData]);

    return (
        <>
            <IoMdAdd onClick={onOpen} className="bg-green-500 text-green-950 block p-0.5 text-2xl rounded-md" />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1 bg-green-200">Add New Address</ModalHeader>
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
                                <Button color="danger" radius="none" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type="submit" className="text-green-950 bg-green-500" radius="none" onPress={onClose}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}