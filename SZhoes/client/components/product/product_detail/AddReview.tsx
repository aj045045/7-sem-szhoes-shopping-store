'use client'
import { ImageUploadComp } from "@/components/utility/ImageUpload";
import { montserrat_Subrayada } from "@/langs";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";
import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";

/**
 * The component that is used to add a new review to the user
 * 
 * @returns Review Modal
 */
export function AddReview() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [star, setStar] = useState(0);
    const displayStar = () => {
        let display: React.ReactNode[] = [];
        let integerPart = Math.floor(star);
        let fractionalPart = star - integerPart;

        for (let i = 0; i < 5; i++) {
            if (i < integerPart) {
                display.push(<FaStar key={i} />);
            } else if (fractionalPart >= 0.5) {
                display.push(<FaStarHalfStroke key={i} />);
                fractionalPart = 0;
            } else {
                display.push(<FaRegStar key={i} />);
            }
        }
        return display;
    };
    return (
        <>
            <div className="flex flex-col space-y-5 my-10">
                <span className={`${montserrat_Subrayada.className} md:text-xl text-lg [word-spacing:5px]`}>Review this product</span>
                <Button onClick={onOpen} className="bg-green-500 w-full md:text-medium text-sm" radius="none" size="sm">Write a product review</Button>
            </div>
            <Modal
                scrollBehavior="inside"
                hideCloseButton
                isKeyboardDismissDisabled={true}
                isDismissable={false}
                backdrop="opaque"
                size={"xl"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className={`${montserrat_Subrayada.className} text-xl mt-2 [word-spacing:10px]`}>Review this product</ModalHeader>
                            <hr className="bg-neutral-400 w-full h-px max-w-6xl my-2" />
                            <ModalBody>
                                <div className="flex my-2 space-y-2 flex-col">
                                    <span className={` text-medium tracking-wide`}>Select Rating</span>
                                    <span className="flex flex-row text-xl space-x-2 text-orange-500">{displayStar()}</span>
                                    <Slider color="warning"
                                        classNames={{ label: "hidden" }}
                                        showTooltip
                                        tooltipProps={{
                                            offset: 10,
                                            placement: "bottom",
                                            classNames: {
                                                base: ["w-10"],
                                                content: [
                                                    " shadow-xl",
                                                ],
                                            },
                                        }}
                                        size="md"
                                        label="Select rating" hideValue maxValue={5} minValue={0} showSteps={true} step={0.5} onChange={(e) => setStar(Number(e.valueOf()))} />
                                </div>
                                <Textarea
                                    isRequired
                                    label="Description"
                                    variant="bordered"
                                    labelPlacement="outside"
                                    placeholder="Enter your Feedback"
                                    minRows={4}
                                    maxRows={8}
                                    className="w-full"
                                />
                                <span className={` text-medium tracking-wide`}>Select Image</span>
                                {/* <ImageUploadComp maxImages={5} folder="" name="" setFormData={} setImageFormData={} key={} /> */}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" radius="none" onPress={onClose}>
                                    Close
                                </Button>
                                <Button onClick={onOpen} className="bg-green-500 text-medium" radius="none" size="md">Submit</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    )
}


