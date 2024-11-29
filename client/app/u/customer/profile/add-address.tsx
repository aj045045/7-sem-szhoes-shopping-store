import { AddressInterface, AddressValidationSchema } from "@/interfaces/customer";
import { useUserStore } from "@/store";
import { FormWrapperUtil, getErrorMessage } from "@/utility/form-wrapper";
import { SubmitHandlerUtil } from "@/utility/submit-handler";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { IoMdAdd } from "react-icons/io";

export function AddAddressPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const userId = useUserStore.getState().loadUserId();
    return (
        <>
            <IoMdAdd onClick={onOpen} className="bg-green-500 text-green-950 block p-0.5 text-2xl rounded-md" />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <FormWrapperUtil
                            onSubmit={(data: AddressInterface) => SubmitHandlerUtil.onSubmitPost(`/s/customer/add-address/${userId}`, data)}
                            validationSchema={AddressValidationSchema}
                        >
                            {(register, error) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 bg-green-200">Add New Address</ModalHeader>
                                    <ModalBody>
                                        <div className="grid grid-cols-2">
                                            <Input label="Street" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('street')}
                                                {...getErrorMessage(error.street)}
                                                placeholder="Enter your street / lane" radius="sm" variant="bordered"
                                            />
                                            <Input label="City" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('city')}
                                                {...getErrorMessage(error.city)}
                                                placeholder="Enter you city " radius="sm" variant="bordered"
                                            />
                                            <Input label="State" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('state')}
                                                {...getErrorMessage(error.state)}
                                                placeholder="Enter your state" radius="sm" variant="bordered"
                                            />
                                            <Input label="Zip" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('zip')}
                                                {...getErrorMessage(error.zip)}
                                                placeholder="Enter zip Address" radius="sm" variant="bordered"
                                            />
                                            <Input label="Country" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('country')}
                                                {...getErrorMessage(error.country)}
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
                                </>
                            )}
                        </FormWrapperUtil>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}