import { AddressInterface, AddressValidationSchema } from "@/interfaces/customer";
import { useUserStore } from "@/store";
import { FormWrapperUtil, getErrorMessage } from "@/utility/form-wrapper";
import { SubmitHandlerUtil } from "@/utility/submit-handler";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { MdModeEdit } from "react-icons/md";

export function UpdateAddressPage({ address }: { address: AddressInterface }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const customerId = useUserStore.getState().loadUserId();
    interface UpdateAddressInterface {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
    }
    return (
        <>
            <MdModeEdit onClick={onOpen} className="bg-green-300 border-1 border-green-400 text-green-950 block p-0.5 text-2xl rounded-sm mt-3" />
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <FormWrapperUtil
                            onSubmit={(data: UpdateAddressInterface) => SubmitHandlerUtil.onSubmitPut<UpdateAddressInterface>(`/s/customer/address/${address._id}`, data)}
                            validationSchema={AddressValidationSchema}
                            defaultValues={{ city: address.city, country: address.country, state: address.state, street: address.street, zip: address.zip }}
                        >
                            {(register, errors) => (
                                <>

                                    <ModalHeader className="flex flex-col gap-1 bg-green-200">Update Address </ModalHeader>
                                    <ModalBody>
                                        <div className="grid grid-cols-2">
                                            <Input label="Street" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('street')} {...getErrorMessage(errors.street)}
                                                placeholder="Enter your street / lane" radius="sm" variant="bordered" />
                                            <Input label="City" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('city')} {...getErrorMessage(errors.city)}
                                                placeholder="Enter you city " radius="sm" variant="bordered" />
                                            <Input label="State" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('state')} {...getErrorMessage(errors.state)}
                                                placeholder="Enter your state" radius="sm" variant="bordered" />
                                            <Input label="Zip" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('zip')} {...getErrorMessage(errors.zip)}
                                                placeholder="Enter zip Address" radius="sm" variant="bordered" />
                                            <Input label="Country" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('country')} {...getErrorMessage(errors.country)}
                                                placeholder="Enter you country" radius="sm" variant="bordered" />
                                        </div>

                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" radius="none" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button onClick={() => SubmitHandlerUtil.onSubmitDelete(`/s/customer/address/${address._id}/${customerId}`)} className="hover:bg-rose-600 hover:text-white" color="danger" radius="none" variant="bordered" onPress={onClose}>
                                            Delete
                                        </Button>
                                        <Button type="submit" className="text-green-950 bg-green-500" radius="none" onPress={onClose}>
                                            Update
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