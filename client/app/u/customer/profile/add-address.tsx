import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";

export function AddAddressPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <IoMdAdd onClick={onOpen} className="bg-green-500 text-green-950 block p-0.5 text-2xl rounded-md" />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <form>
                            <ModalHeader className="flex flex-col gap-1 bg-green-200">Add New Address</ModalHeader>
                            <ModalBody>
                                <div className="grid grid-cols-2">
                                    <Input label="Street" name="street" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                        placeholder="Enter your street / lane" radius="sm" variant="bordered"
                                    />
                                    <Input label="City" name="city" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                        placeholder="Enter you city " radius="sm" variant="bordered"
                                    />
                                    <Input label="State" name="state" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                        placeholder="Enter your state" radius="sm" variant="bordered"
                                    />
                                    <Input label="Zip" name="zip" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                        placeholder="Enter zip Address" radius="sm" variant="bordered"
                                    />
                                    <Input label="Country" name="country" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                        placeholder="Enter you country" radius="sm" variant="bordered"
                                    />
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