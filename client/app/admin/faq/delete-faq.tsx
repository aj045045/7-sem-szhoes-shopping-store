import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";
import { SubmitHandlerUtil } from "@/utility/submit-handler";

/**
 * The Component that is used for the the user account
 * 
 * @returns Delete account and update the account
 */
export function DeleteFaqPage({ _id }: { _id: string }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const onSubmitDelete = () => {
        SubmitHandlerUtil.onSubmitDelete(`/s/admin/faq/${_id}`)
    }
    return (
        <div className="rounded-xl">
            <MdDeleteForever onClick={onOpen} className="bg-red-500 text-red-950 block p-0.5 text-3xl rounded-md" />
            {/* <Button onClick={onOpen} variant="flat" className="w-fit bg-red-400 text-red-950" color="danger" radius="none" >Delete FAQ</Button> */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 bg-red-400">Delete FAQ</ModalHeader>
                            <ModalBody>
                                <div className="flex space-x-5 items-center">
                                    <div className="text-8xl p-1 rounded-full bg-red-300 w-60 text-red-800"><MdDeleteForever /></div>
                                    <div>
                                        <div className="text-3xl mb-5">Delete FAQ</div>
                                        <div className="text-neutral-600">Are you sure you want to delete your FAQ? If you delete your FAQ you will permanently lose the details</div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" radius="none" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button onClick={() => onSubmitDelete()} color="danger" radius="none" variant="shadow" onPress={onClose}>
                                    Delete FAQ
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div >
    )
}