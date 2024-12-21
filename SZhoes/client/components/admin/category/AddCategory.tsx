'use client'
import { useGetHook, usePostHook } from "@/hooks";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IoWarning } from "react-icons/io5";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";

/**
 * The Component that is used a modal for the form
 * 
 * @returns The Order Number, and The Reason for the Complain for return 
 */
export function AddCategory() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Fetch tags for server 
    const { data, fetchData } = useGetHook<string[]>("/s/category/tags");
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const tags = data ? data.map((item: any, index: any) => ({
        key: index + 1,
        label: item
    })) : [];

    // Form to send data to server
    const { setFormData, formData, validationErrors, handleInputChange, handleSubmit } = usePostHook("/s/category", { category: "", tag: "" }, { category: /^[A-Za-z0-9\s,.!?()-]{0,30}$/ });
    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            category: formData.category,
            tag: e.target.value
        })
    };
    return (
        <>
            <Button onPress={onOpen} className="bg-green-500 text-green-950 border-0 block mr-0 ml-auto mb-2" radius="sm"> Add Category</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled hideCloseButton>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={handleSubmit}>
                            <ModalHeader className="flex flex-col gap-1 bg-green-200">Add New Category </ModalHeader>
                            <ModalBody>
                                <Select
                                    classNames={{ trigger: "w-[370px] h-12", selectorIcon: "hidden" }}
                                    variant="bordered"
                                    items={tags}
                                    name="tag"
                                    radius="sm"
                                    labelPlacement="outside"
                                    label="Choose tag"
                                    className="max-w-xs"
                                    selectedKeys={[formData.tag]}
                                    isRequired
                                    onChange={handleSelectionChange}
                                    description="Choose tag for category"
                                    placeholder=" "
                                >
                                    {(animal) => <SelectItem key={animal.label}>{animal.label}</SelectItem>}
                                </Select>
                                <Input isRequired label="Category" placeholder=" " name="category" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid Category</p></div>} onChange={handleInputChange} value={formData.category} isInvalid={validationErrors.category} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" radius="none" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type="submit" className="text-green-950 bg-green-500" radius="none" onPress={onClose}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
