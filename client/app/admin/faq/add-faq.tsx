import { FaqInterface, FaqYupSchema } from "@/interfaces/faq";
import { FormWrapperUtil, getErrorMessage } from "@/utility/form-wrapper";
import { MarkdownConverterUtil } from "@/utility/other/markdown-converter";
import { SubmitHandlerUtil } from "@/utility/submit-handler";
import { Button, Input, Textarea } from "@nextui-org/react";

export function AddFaqPage() {

    return (
        <>
            <FormWrapperUtil
                onSubmit={(data: FaqInterface) => SubmitHandlerUtil.onSubmitPost<FaqInterface>(`/s/admin/faq`, data)}
                validationSchema={FaqYupSchema}
            >
                {(register, error, form) => (
                    <div className="bg-white rounded-lg mt-5 shadow-lg p-2 space-y-5">
                        <MarkdownConverterUtil markdownString={form?.watch('answer') || ""} />
                        <div className="items-center flex flex-col">
                            <Input label="Question" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside"
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
                            <Button type="submit" className="text-green-950 bg-green-500 mt-5 w-1/2" radius="none" >
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </FormWrapperUtil>
        </>
    )
}