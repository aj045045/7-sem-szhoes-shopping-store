'use client'
import { usePostHook } from "@/hooks";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { IoWarning } from "react-icons/io5";

/**
 * The Component that is used a modal for the form
 * 
 * @returns The Order Number, and The Reason for the Complain for return 
 */
export function AddComplaintButton() {
    const { formData, validationErrors, handleInputChange, handleSubmit } = usePostHook("/", { customerId: "", orderNumber: "", description: "", }, { description: /^[A-Za-z0-9\s,.!?()-]{0,400}$/ });
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <Button onPress={onOpen} className="bg-green-500 text-green-950 border-0 block mr-0 ml-auto mb-2" radius="sm" >Add Complaint</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1 bg-green-200">Add New </ModalHeader>
                            <ModalBody>
                                <Input label="Order Number" name="orderNumber" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" placeholder="ORDt4u3owGVHp_6bsn" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid order number</p></div>} onChange={handleInputChange} value={formData.orderNumber} isInvalid={validationErrors.orderNumber} />
                                <Textarea
                                    size="md"
                                    minRows={8}
                                    maxRows={12}
                                    labelPlacement="outside"
                                    isInvalid={validationErrors.description}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    variant="bordered"
                                    errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please ensure description stays within 200 characters.</p></div>}
                                    label="description"
                                    placeholder="Enter your complaint description( within 400 character )"
                                    className="max-w-sm"
                                />
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
