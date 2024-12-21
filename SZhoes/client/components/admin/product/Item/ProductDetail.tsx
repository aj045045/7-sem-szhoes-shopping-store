import { ImageUploadComp } from "@/components/utility/ImageUpload";
import { useDeleteHook, useGetHook, usePostHook, usePutHook } from "@/hooks";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { IoWarning } from "react-icons/io5";
import { ProductItemInterface } from "./interface";

export function ProductDetail({ product }: { product: ProductItemInterface }) {

    // Hooks
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { data: categoryData, fetchData: fetchCategoryData } = useGetHook<string[]>("/s/auth/product/category");
    const { setFormData, formData, validationErrors, handleInputChange, handleSubmit } = usePutHook(product.id, "/s/auth/product", {
        name: "",
        title: "",
        categoryId: "",
        about: "",
        description: "",
    }, {
        name: /^[A-Za-z0-9\s,.!?()-]{1,50}$/,
        title: /^[A-Za-z0-9\s,.!?()-]{1,100}$/,
        categoryId: /^[A-Za-z0-9,]+$/,
        about: /^[A-Za-z0-9\s,.!?()-]{0,255}$/,
        description: /^[A-Za-z0-9\s,:]{0,500}$/,
    });
    const { setFormData: setImageFormData, handleSubmit: handleImageSubmit } = usePostHook("/f/image?key=products", {}, {});

    // Delete logic
    const [deleteId, setDeleteId] = useState("");
    const { deleteData: imageDelete } = useDeleteHook(`?id=${deleteId}`, "/f/image");
    const { deleteData: productImageDelete } = useDeleteHook(`${product.id}?id=${deleteId}`, "/s/auth/product/image");

    useEffect(() => {
        if (deleteId) {
            imageDelete();
            productImageDelete();
        }
    }, [imageDelete, productImageDelete, deleteId]);

    const deleteImageHandler = (id: string) => {
        setDeleteId(id.slice(1));
    };

    // use Effect method

    const queryParam = encodeURIComponent(JSON.stringify(product.images));
    const { data, fetchData } = useGetHook<string[]>(`/f/image?name=${queryParam}`);
    useEffect(() => {
        if (!data) {
            fetchData();
        }
    }, [data, fetchData]);

    useEffect(() => {
        const description = Object.entries(product.description).map(([key, value]) => `${key}:${value}`).join(',');
        setFormData({
            name: product.name,
            title: product.title,
            about: product.about,
            categoryId: product.categoryId,
            description: description
        })
    }, [product, setFormData]);

    useEffect(() => {
        fetchCategoryData();
    }, [fetchCategoryData]);

    // Set Data to variable
    const descriptionObject: Record<string, string> = formData.description.split(",").map((item: string) => item.split(":"))
        .reduce((acc: Record<string, string>, [key, value]: [string, string]) => {
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);

    const category = categoryData ? categoryData.map((item: any) => ({ key: item._id, label: item.category })) : [];

    // Handler method
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData((prevData: any) => ({
            ...prevData,
            categoryId: typeof e.target.value === 'string' ? e.target.value : prevData.categoryId
        }));
    };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            await handleSubmit(event);
            await handleImageSubmit(event);
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="my-5" onSubmit={onSubmit}>
            <div className="flex flex-wrap mb-5">
                {data && data.map((image, index) =>
                    <div className="flex flex-col mr-5 mb space-y-2 mb-5" key={index}>
                        <Image className="w-40 h-40  object-contain bg-white rounded-md shadow-md" unoptimized key={index} src={`data:image/webp;base64,${image}`} alt={`img-index`} width={0} height={0} />
                        <Button color="danger" variant="flat" radius="none" fullWidth onClick={() => deleteImageHandler(product.images[index])}>Delete</Button>
                    </div>
                )}
            </div>
            <ImageUploadComp maxImages={10} name="products" setFormData={setFormData} setImageFormData={setImageFormData} folder="/products" />
            <div className="flex space-x-5">
                <Input isRequired label="Name" placeholder=" " name="name" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid name</p></div>} onChange={handleInputChange} value={formData.name} isInvalid={validationErrors.name} />
                <Input isRequired label="Title" placeholder=" " name="title" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid title</p></div>} onChange={handleInputChange} value={formData.title} isInvalid={validationErrors.title} />
            </div>
            <div className="flex space-x-5 items-center">
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
            <div>
                <div className="flex flex-col space-y-1 w-full min-w-40 mx- auto rounded-md mt-5 overflow-hidden shadow-neutral-300">
                    {Object.entries(descriptionObject).map(([key, value]) => (
                        <Checkbox key={key} isSelected={true} size="md" radius="sm" color="success" >
                            <div className="flex flex-row space-x-2">
                                <div className="font-semibold tracking-wide text-sm md:text-medium">{key}:</div>
                                <div className="text-sm md:text-medium">{value}</div>
                            </div>
                        </Checkbox>
                    ))}
                </div>
                <Input isRequired label="Description" placeholder=" " name="description" classNames={{ base: "w-11/12 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid description</p></div>} onChange={handleInputChange} value={formData.description} isInvalid={validationErrors.description} />
            </div>
            <div className="flex justify-center">
                <Button type="submit" className="text-green-950 bg-green-500 w-1/4 my-2 mx-auto" radius="none" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
                <Button className={`${product.active ? "text-red-900 bg-transparent border-red-500" : "text-teal-900 bg-transparent border-teal-500"}  border-2 w-1/4 my-2 mx-auto`} radius="none">
                    {product.active ? "Disable" : "Enable"}
                </Button>
            </div>
        </form>
    )
}