import { montserrat_Subrayada } from "@/langs";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import Image from "next/image";

/**
 * The component used to display a image in a modal for better view
 * 
 * @param img - The image to be displayed
 * @param size - The size of the Image 
 * @returns Image with a modal
 */
export function ImageSize({ img, size = 40 }: { img: string, size?: number }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Image className={`w-${size} bg-neutral-300 rounded-sm`} unoptimized onClick={onOpen} src={img} width={0} height={0} alt="Feedback Image" />
            <span className="hidden">w-40 w-60</span>
            <Modal
                size={"xl"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className={`${montserrat_Subrayada.className} text-xl mt-2 [word-spacing:10px]`}>Image</ModalHeader>
                            <hr className="bg-neutral-400 w-full h-px max-w-6xl my-2" />
                            <ModalBody className="">
                                <Image className="w-4/5 bg-neutral-200 rounded-sm mx-auto" unoptimized onClick={onOpen} src={img} width={0} height={0} alt="Feedback Image" />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" radius="none" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}