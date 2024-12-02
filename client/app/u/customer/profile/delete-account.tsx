import { ResponseInterface } from "@/interfaces/response";
import { montserratSubrayada } from "@/langs";
import { useUserStore } from "@/store";
import { ToastUtil } from "@/utility/toast";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import Cookies from 'js-cookie';

/**
 * The Component that is used for the the user account
 * 
 * @returns Delete account and update the account
 */
export function DeleteAccountPage() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { logOut } = useUserStore();
    const router = useRouter();
    const onSubmitDelete = () => {
        fetch('/s/customer/account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((result: ResponseInterface) => {
                if (result.status === "error" && result.message) {
                    ToastUtil.error(result.message);
                }
                if (result.status === "success" && result.message) {
                    ToastUtil.success(result.message);
                    Cookies.remove('token');
                    logOut();
                    router.push("/u/login");
                }
            });
    }
    return (
        <div className="border-2 border-neutral-300 rounded-xl p-4">
            <span className={`${montserratSubrayada.className} text-lg`}>Account Privacy</span>
            <div className="flex flex-col space-y-2 bg-red-200 border-2 border-red-400 p-4 rounded-md mt-5">
                <span className="font-semibold text-red-700">Delete Personal Account</span>
                <span>Please note that this action will permanently delete your personal account and all associated credentials from the SZhoes platform. This action cannot be undone. Proceed with caution and ensure that you have considered all implications before continuing.</span>
                <Button onClick={onOpen} variant="flat" className="w-fit bg-red-400 text-red-950" color="danger" radius="none" >Delete Account</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 bg-red-400">Delete Account </ModalHeader>
                                <ModalBody>
                                    <div className="flex space-x-5 items-center">
                                        <div className="text-8xl p-1 rounded-full bg-red-300 w-60 text-red-800"><MdDeleteForever /></div>
                                        <div>
                                            <div className="text-3xl mb-5">Delete Account</div>
                                            <div className="text-neutral-600">Are you sure you want to delete your account? If you delete your account you will permanently lose your all credentials</div>
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" radius="none" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={() => onSubmitDelete()} color="danger" radius="none" variant="shadow" onPress={onClose}>
                                        Delete Account
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div >
    )
}