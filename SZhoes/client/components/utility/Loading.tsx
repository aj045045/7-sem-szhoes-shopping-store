import { Modal, ModalContent, ModalBody } from "@nextui-org/react";
import { Progress } from "@nextui-org/progress";
import { GiRunningShoe } from "react-icons/gi";
import { comforter_Brush, montserrat_Subrayada } from "@/langs";
import { useSelector } from "react-redux";
import { RootState } from "@/redux";

/**
 * The component that is used for the loading page of the user
 * 
 * @returns The Loading Page
 */
export function LoadingComp() {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    return <>
        <Modal
            placement="center"
            isOpen={isLoading}
            size="lg"
            backdrop="transparent"
            isDismissable={false}
            hideCloseButton
            defaultOpen={true}
            classNames={{
                base: "shadow-lg shadow-green-200 border-2 border-green-300 cursor-wait",
                body: "py-5 bg-green-100 select-none space-y-2"
            }}
            motionProps={{
                variants: {
                    enter: {
                        y: 20,
                        opacity: 1,
                        transition: {
                            duration: 0.5,
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -20,
                        opacity: 0,
                        transition: {
                            duration: 0.5,
                            ease: "easeIn",
                        },
                    },
                }
            }}
            isKeyboardDismissDisabled={true}>
            <ModalContent >
                {() => (
                    <>
                        <ModalBody className="flex flex-col items-center">
                            <div className="h-full overflow-hidden  ml-20 flex flex-row justify-center mr-20">
                                <div className={`${montserrat_Subrayada.className} text-8xl lg:text-[200px]`}>S</div>
                                <div className={`${comforter_Brush.className} text-green-600 text-8xl lg:text-[200px]`}>Z</div>
                            </div>
                            <div className="flex flex-row items-center">
                                <div className="flex flex-row items-end">
                                    <div className={`${montserrat_Subrayada.className} text-4xl lg:text-5xl`}>S</div>
                                    <div className={`${comforter_Brush.className} text-green-700 text-4xl lg:text-5xl`}>Z</div>
                                    <div className={`${montserrat_Subrayada.className} ml-2 text-2xl lg:text-3xl`}>hoes</div>
                                </div>
                            </div>
                            <Progress
                                size="sm"
                                isIndeterminate
                                aria-label="Loading..."
                                className="max-w-md"
                                classNames={{
                                    base: "bg-neutral-200",
                                    indicator: "bg-green-600"
                                }}
                            />
                            <div className="flex flex-row space-x-2">
                                <div className="text-2xl"><GiRunningShoe /></div>
                                <div className="text-md text-center">&quot;Welcome to SZhoes, Smell the Difference with SZhoes&quot;</div>
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>

    </>
}