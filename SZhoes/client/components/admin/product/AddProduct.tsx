'use client'
import { useGetHook, usePostHook } from "@/hooks";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IoWarning } from "react-icons/io5";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { montserrat_Subrayada } from "@/langs";
import { ImageUploadComp } from "@/components/utility/ImageUpload";

/**
 * The Component that is used a modal for the form
 * 
 * @returns The Order Number, and The Reason for the Complain for return 
 */
export function AddProduct({ isOpen, setIsOpen }: { setIsOpen: any, isOpen: boolean }) {
    const { data: colorData, fetchData: fetchColorData } = useGetHook<string[]>("/s/auth/product/colors");
    const { data: sizeData, fetchData: fetchSizeData } = useGetHook<string[]>("/s/auth/product/sizes");
    const { data: warehouseData, fetchData: fetchWarehouseData } = useGetHook<string[]>("/s/auth/product/warehouse");
    const { data: categoryData, fetchData: fetchCategoryData } = useGetHook<string[]>("/s/auth/product/category");

    useEffect(() => {
        fetchColorData();
        fetchSizeData();
        fetchWarehouseData();
        fetchCategoryData();
    }, [fetchColorData, fetchCategoryData, fetchSizeData, fetchWarehouseData]);

    const colors = colorData ? colorData.map((item: any, index: any) => ({ key: index + 1, label: item })) : [];
    const sizes = sizeData ? sizeData.map((item: any, index: any) => ({ key: index + 1, label: item })) : [];
    const warehouse = warehouseData ? warehouseData.map((item: any, index: any) => ({ key: index + 1, label: item })) : [];
    const category = categoryData ? categoryData.map((item: any) => ({ key: item._id, label: item.category })) : [];

    // Form to send data to server
    const { setFormData, formData, validationErrors, handleInputChange, handleSubmit } = usePostHook("/s/auth/product", {
        name: "",
        title: "",
        categoryId: "",
        about: "",
        description: "",
        size: "",
        price: "",
        color: "",
        detail: "",
        quantity: "",
        // warehouse: "",
        maxReorder: "",
        minReorder: ""
    }, {
        name: /^[A-Za-z0-9\s,.!?()-]{1,50}$/,
        title: /^[A-Za-z0-9\s,.!?()-]{1,100}$/,
        categoryId: /^[A-Za-z0-9,]+$/,
        about: /^[A-Za-z0-9\s,.!?()-]{0,255}$/,
        description: /^[A-Za-z0-9\s,:]{0,500}$/,
        size: /^[A-Za-z0-9\s]{0,20}$/,
        price: /^\d+(\.\d{1,2})?$/,
        color: /^[A-Za-z0-9\s#]{0,20}$/,
        detail: /^[A-Za-z0-9\s,:]{0,500}$/,
        quantity: /^\d{0,20}$/,
        maxReorder: /^\d{0,20}$/,
        minReorder: /^\d{0,20}$/,
    });

    const { setFormData: setImageFormData, formData: imageFormData, handleSubmit: handleImageSubmit } = usePostHook("/f/image?key=products&key=items", {}, {});

    // const handleWarehouseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFormData((prevData: any) => ({
    //         ...prevData,
    //         warehouse: typeof e.target.value === 'string' ? e.target.value : prevData.warehouse
    //     }));
    // };
    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData: any) => ({
            ...prevData,
            size: typeof e.target.value === 'string' ? e.target.value : prevData.size
        }));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData: any) => ({
            ...prevData,
            color: typeof e.target.value === 'string' ? e.target.value : prevData.color
        }));
    };
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData: any) => ({
            ...prevData,
            categoryId: typeof e.target.value === 'string' ? e.target.value : prevData.categoryId
        }));
    };
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            await handleSubmit(event);
            await handleImageSubmit(event);
            setIsOpen(!isOpen);
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false); // Re-enable the button
        }
    };

    return (
        <>
            <form onSubmit={onSubmit}>
                <ImageUploadComp maxImages={10} name="products" setFormData={setFormData} setImageFormData={setImageFormData} folder="/products" />
                <div className="flex space-x-5">
                    <Input isRequired label="Name" placeholder=" " name="name" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid name</p></div>} onChange={handleInputChange} value={formData.name} isInvalid={validationErrors.name} />
                    <Input isRequired label="Title" placeholder=" " name="title" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid title</p></div>} onChange={handleInputChange} value={formData.title} isInvalid={validationErrors.title} />
                </div>
                <div className="flex space-x-5 items-center">
                    <Input isRequired label="Description" placeholder="key:value,key:value" name="description" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid description</p></div>} onChange={handleInputChange} value={formData.description} isInvalid={validationErrors.description} />
                    <Input isRequired label="About" placeholder=" " name="about" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid about</p></div>} onChange={handleInputChange} value={formData.about} isInvalid={validationErrors.about} />
                    <Select
                        classNames={{ trigger: "h-12 bg-neutral-200/50 border-2 border-neutral-400", selectorIcon: "hidden" }}
                        variant="bordered"
                        items={category}
                        name="tag"
                        radius="sm"
                        labelPlacement="outside"
                        label="Choose category"
                        className="max-w-xs"
                        selectedKeys={[formData.categoryId]}
                        isRequired
                        onChange={handleCategoryChange}
                        placeholder=" "
                    >
                        {(animal) => <SelectItem key={animal.key}>{animal.label}</SelectItem>}
                    </Select>
                </div>
                <div className="bg-neutral-400/50 p-4 m-5 rounded-lg border border-neutral-500">
                    <div className={`${montserrat_Subrayada.className} text-xl [word-spacing:10px] text-green-950`} >Add Item Detail</div>
                    <div className="flex space-x-5">
                        <Input isRequired label="Price" placeholder=" " name="price" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid price</p></div>} onChange={handleInputChange} value={formData.price} isInvalid={validationErrors.price} />
                        <Input isRequired label="Detail" placeholder=" " name="detail" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid Detail</p></div>} onChange={handleInputChange} value={formData.detail} isInvalid={validationErrors.detail} />
                    </div>
                    <div className="flex space-x-5">
                        <Select
                            classNames={{ trigger: "h-12 bg-neutral-200/50 border-2 border-neutral-400", selectorIcon: "hidden" }}
                            variant="bordered"
                            items={colors}
                            name="color"
                            radius="sm"
                            labelPlacement="outside"
                            label="Choose color"
                            className="max-w-xs"
                            selectedKeys={[formData.color]}
                            isRequired
                            onChange={handleColorChange}
                            placeholder=" "
                        >
                            {(animal) => <SelectItem key={animal.label}>{animal.label}</SelectItem>}
                        </Select>
                        <Select
                            classNames={{ trigger: "h-12 bg-neutral-200/50 border-2 border-neutral-400", selectorIcon: "hidden" }}
                            variant="bordered"
                            items={sizes}
                            name="size"
                            radius="sm"
                            labelPlacement="outside"
                            label="Choose size"
                            className="max-w-xs"
                            selectedKeys={[formData.size]}
                            isRequired
                            onChange={handleSizeChange}
                            placeholder=" "
                        >
                            {(animal) => <SelectItem key={animal.label}>{animal.label.replace('SIZE_', '')}</SelectItem>}
                        </Select>
                        {/* <Select
                            classNames={{ trigger: "h-12 bg-neutral-200/50 border-2 border-neutral-400", selectorIcon: "hidden" }}
                            variant="bordered"
                            items={warehouse}
                            name="warehouse"
                            radius="sm"
                            labelPlacement="outside"
                            label="Choose warehouse"
                            className="max-w-xs"
                            selectedKeys={[formData.warehouse]}
                            isRequired
                            onChange={handleWarehouseChange}
                            placeholder=" "
                        >
                            {(animal) => <SelectItem key={animal.label}>{animal.label}</SelectItem>}
                        </Select> */}
                    </div>
                    <div className="flex space-x-5">
                        <Input isRequired label="Quantity" placeholder=" " name="quantity" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid quantity</p></div>} onChange={handleInputChange} value={formData.quantity} isInvalid={validationErrors.quantity} />
                        <Input isRequired label="Max Reorder" placeholder=" " name="maxReorder" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid Max Reorder</p></div>} onChange={handleInputChange} value={formData.maxReorder} isInvalid={validationErrors.maxReorder} />
                        <Input isRequired label="Min Reorder" placeholder=" " name="minReorder" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid Min Reorder</p></div>} onChange={handleInputChange} value={formData.minReorder} isInvalid={validationErrors.minReorder} />
                    </div>
                    <ImageUploadComp maxImages={10} name="items" setFormData={setFormData} setImageFormData={setImageFormData} folder="/items" />
                </div>
                <div className="flex justify-around mx-40 my-5">
                    <Button color="danger" radius="none" variant="light" onClick={() => setIsOpen(!isOpen)}>
                        Close
                    </Button>
                    <Button type="submit" className="text-green-950 bg-green-500" radius="none" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </>
    )
}