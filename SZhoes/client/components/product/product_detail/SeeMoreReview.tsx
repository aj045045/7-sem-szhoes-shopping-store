import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { FaAngleDoubleRight } from "react-icons/fa";
import { ReviewDetail } from "./ReviewDetail";
import { montserrat_Subrayada } from "@/langs";

/**
 * The component that is used for the see more review of products
 * 
 * @returns The see more review
 */
export function SeeMoreReview() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const Images: string[] = ["/temp/image-1.png", "/temp/image-3.png", "/images/hero_section.png", "/images/image-4.png", "/temp/image-1.png", "/temp/image-3.png", "/images/hero_section.png", "/images/image-4.png",]
    return (
        <>
            <div onClick={onOpen} className=" text-teal-600 hover:underline hover:underline-offset-4 flex flex-row  items-center">
                <span>See more Reviews</span>
                <FaAngleDoubleRight className="ml-0.5" />
            </div>
            <Modal classNames={{ closeButton: "text-3xl" }} isOpen={isOpen} size="full" onClose={onClose}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className={`${montserrat_Subrayada.className} border-b-1 border-b-neutral-400 [word-spacing:5px] text-lg md:text-xl`}>Client Review about this product</ModalHeader>
                            <ModalBody className="overflow-y-auto">
                                <ReviewDetail rate={4} reviewImages={Images} />
                                <ReviewDetail rate={4} reviewImages={Images} />
                                <ReviewDetail rate={4} reviewImages={Images} />
                                <ReviewDetail rate={4} reviewImages={Images} />
                                <ReviewDetail rate={4} reviewImages={Images} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}