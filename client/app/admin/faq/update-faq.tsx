import { FaqInterface, FaqSWRInterface, FaqYupSchema } from "@/interfaces/faq";
import { FormWrapperUtil, getErrorMessage } from "@/utility/form-wrapper";
import { MarkdownConverterUtil } from "@/utility/other/markdown-converter";
import { SubmitHandlerUtil } from "@/utility/submit-handler";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea, useDisclosure } from "@nextui-org/react";
import { MdModeEdit } from "react-icons/md";

export function EditFaqPage({ _id, answer, question }: FaqSWRInterface) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <>
            <MdModeEdit onClick={onOpen} className="bg-green-500 text-green-950 block p-0.5 text-3xl rounded-md" />
            <Modal scrollBehavior="outside" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} size="5xl" isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <FormWrapperUtil
                            defaultValues={{ answer: answer, question: question }}
                            onSubmit={(data: FaqInterface) => SubmitHandlerUtil.onSubmitPut<FaqInterface>(`/s/admin/faq/${_id}`, data)}
                            validationSchema={FaqYupSchema}
                        >
                            {(register, error,form) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1 bg-green-200 rounded-t-xl">Update FAQ</ModalHeader>
                                    <ModalBody>
                                        <>
                                            <MarkdownConverterUtil markdownString={form?.watch('answer') || ""} />
                                            <Input label="Questions" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
                                                {...register('question')}
                                                {...getErrorMessage(error.question)}
                                                placeholder="Enter your question here..." radius="sm" variant="bordered"
                                            />
                                            <Textarea
                                                label="Answer"
                                                radius="sm"
                                                variant="bordered"
                                                placeholder="Write your answer here..."
                                                disableAnimation
                                                {...register('answer')}
                                                {...getErrorMessage(error.answer)}
                                                disableAutosize
                                                labelPlacement="outside"
                                                classNames={{
                                                    base: "w-11/12 pt-5 z-0",
                                                    input: "resize-y min-h-36",
                                                }}
                                            />
                                        </>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" radius="none" variant="light" onPress={onClose}>
                                            Close
                                        </Button>
                                        <Button type="submit" color="success" radius="none" variant="shadow" onPress={onClose}>
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