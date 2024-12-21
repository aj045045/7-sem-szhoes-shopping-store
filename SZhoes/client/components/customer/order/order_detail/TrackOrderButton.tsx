'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { MdMyLocation } from "react-icons/md";
import { TrackOrderData } from "../api";
import { TrackOrderInterface } from "../interface";

/**
 * The Order Status with their steps
 * 
 * @returns The Status, Date and Title of the order products
 */
export function TrackOrderButton() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const trackOrder: TrackOrderInterface[] = TrackOrderData();
    return (
        <>
            <Button onPress={onOpen} variant="flat" className="w-full md:w-fit bg-green-500 text-green-950" radius="sm" ><MdMyLocation className="text-lg" />Track Order</Button>
            <Modal scrollBehavior="outside" classNames={{ header: "rounded-t-xl" }} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <div>
                            <ModalHeader className="flex flex-col gap-1 bg-green-200">Track Order</ModalHeader>
                            <ModalBody>
                                {/* <!-- component --> */}
                                <section className="relative flex flex-col justify-center overflow-hidden">
                                    <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
                                        <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-10">
                                            <div className="w-full max-w-3xl mx-auto">
                                                <div className="-my-6">
                                                    {trackOrder.map((value, index) =>
                                                        <div key={index} className="relative pl-8 sm:pl-32 py-6 group">
                                                            {/* <!-- label --> */}
                                                            <div className="font-medium space-x-2 mb-1 sm:mb-0">
                                                                {value.status === 1 ? <><span className="text-teal-600">Completed</span> <span className="text-neutral-500 text-sm">{value.date}</span> </> : <span className="text-red-600">Pending</span>}
                                                            </div>
                                                            {/* <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) --> */}
                                                            <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-teal-600 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                                                                {value.status === 1 ? <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full">{value.time}</time> : <time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-red-600 bg-red-100 rounded-full">Pending</time>}
                                                                <div className="text-xl font-bold text-slate-900">{value.title}</div>
                                                            </div>
                                                            {/* <!-- Content --> */}
                                                            <div className="text-slate-500">{value.detail}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </section>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" radius="none" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}