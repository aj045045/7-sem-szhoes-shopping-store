'use client';
import { Modal, ModalContent, ModalBody, useDisclosure } from "@nextui-org/modal";
import { useCallback, useEffect } from "react";
import { ErrorData } from "./interface";
import { remove_error } from "@/redux/feature/error";
import { AppDispatch, RootState } from "@/redux";
import { useDispatch, useSelector } from "react-redux";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

/**
 * The component that is used to denote the error occur in the page
 * @returns The Error modal
 */
export function ErrorComp() {
    const error = useSelector((state: RootState) => state.error);
    const dispatch = useDispatch<AppDispatch>();


    const { isOpen, onOpen, onClose } = useDisclosure();
    const errorData: ErrorData = {
        "success": {
            icon: <FaCheckCircle />,
            dataColor: "text-green-800",
            shadow: "shadow-green-200",
            border: "border-l-green-600",
            textColor: "text-green-600",
            modal: "bg-green-100"
        },
        "question": {
            icon: <FaQuestionCircle />,
            dataColor: "text-blue-800",
            shadow: "shadow-blue-200",
            border: "border-l-blue-600",
            textColor: "text-blue-600",
            modal: "bg-blue-100"
        },
        "warning": {
            icon: <IoWarning />,
            dataColor: "text-yellow-800",
            shadow: "shadow-yellow-300",
            border: "border-l-yellow-500",
            textColor: "text-yellow-600",
            modal: "bg-yellow-100"
        },
        "alert": {
            icon: <MdCancel />,
            dataColor: "text-red-800",
            shadow: "shadow-red-200",
            border: "border-l-red-400",
            textColor: "text-red-600",
            modal: "bg-red-100"
        },
    };
    const dataToggle = errorData[error.type];
    const removeError = useCallback(() => {
        dispatch(remove_error());
        onClose();
    }, [dispatch, onClose]);

    useEffect(() => {
        if (error && error.setError) {
            const openModal = () => {
                setTimeout(() => {
                    onOpen();
                }, 1000);
            };
            openModal();
        }
    }, [removeError, error, onOpen]);

    return (
        <>
            <Modal
                size="xl"
                backdrop="transparent"
                radius="none"
                isOpen={isOpen}
                onClose={removeError}
                isDismissable={false}
                isKeyboardDismissDisabled
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.5,
                                ease: "easeOut",
                            },
                        },
                        exit: {
                            y: -50,
                            opacity: 0,
                            transition: {
                                duration: 0.3,
                                ease: "easeIn",
                            },
                        },
                    }
                }}
                classNames={{
                    closeButton: "text-xl mt-2 mr-2"
                }}
                className={`flex self-start shadow-xl  w-3/4 mt-5 ${dataToggle?.shadow} ${dataToggle?.modal} ${dataToggle?.border} border-l-4 rounded-e-md  py-2`}
            >
                <ModalContent>
                    <ModalBody>
                        <div className={`flex flex-row items-center space-x-4`}>
                            <div className={`md:text-2xl text-xl ${dataToggle?.textColor}`}>
                                {dataToggle?.icon}
                            </div>
                            <div className={`text-center ${dataToggle?.dataColor} md:text-lg text-base select-none`}>
                                {error.data}
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
