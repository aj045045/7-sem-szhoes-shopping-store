'use client'
import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { FaPercentage } from "react-icons/fa";
import { montserrat_Subrayada } from "@/langs";
import { Button, Input } from "@nextui-org/react";
import { colorBackground, colorBorder, colorPill, Item } from "./interface";
import { FormatDate } from "@/components/utility/FormatData";
import { useGetHook, usePostHook } from "@/hooks";
import { ImageUploadComp } from "@/components/utility/ImageUpload";
import { FaEdit } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";

/**
 * The component that is used to display the images and select the color and size of the product
 * 
 * @returns Image Hero container
 */
export function ImageContainer({ item }: { item: Item }) {
    const queryParam = encodeURIComponent(JSON.stringify(item.images));
    const { data, fetchData } = useGetHook<string[]>(`/f/image?name=${queryParam}`);
    useEffect(() => {
        if (!data) {
            fetchData();
        }
    }, [data, fetchData]);

    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        if (data && data.length > 0 && !image) {
            setImage(data[0]); // Set the first image if `data` is available
        } else if (!data) {
            fetchData();
        }
    }, [data, fetchData, image]);

    const nextImage = () => {
        if (!data || data.length === 0) return; // Guard clause
        let img = 0;
        for (let i = 0; i < data.length; i++) {
            if (image === data[data.length - 1]) {
                img = 0;
            }
            else if (data[i] === image) {
                img = i + 1;
                break;
            }
        }
        setImage(data[img]);
    };
    const prevImage = () => {
        if (!data || data.length === 0) return; // Guard clause
        let img = 0;
        for (let i = 0; i < data.length; i++) {
            if (image === data[0]) {
                img = data.length - 1;
            }
            else if (data[i] === image) {
                img = i - 1;
                break;
            }
        }
        setImage(data[img]);
    };

    // ADD IMAGE
    const { setFormData: setImageFormData, formData: imageFormData, handleSubmit: handleImageSubmit } = usePostHook("/f/image?key=products&key=items", {}, {});
    const { setFormData, formData, validationErrors, handleInputChange, handleSubmit } = usePostHook("/s/auth/product/item", {
        detail: "",
        price: "",
        maxReorderLevel: "",
        minReorderLevel: ""
    }, {
        detail: /^[A-Za-z0-9\s,:]{0,500}$/,
        price: /^\d+$/,
        maxReorderLevel: /^\d+$/,
        minReorderLevel: /^\d+$/,
    });

    // IS EDIT
    const [isEdit, setIsEdit] = useState<boolean>(false);
    // const detailObject: Record<string, string> = formData.description.split(",").map((item: string) => item.split(":"))
    //     .reduce((acc: Record<string, string>, [key, value]: [string, string]) => {
    //         acc[key] = value;
    //         return acc;
    //     }, {} as Record<string, string>);

    useEffect(() => {
        const detail = Object.entries(item.detail).map(([key, value]) => `${key}:${value}`).join(',');
        setFormData({
            detail: detail,
            maxReorderLevel: item.maxReorderLevel,
            minReorderLevel: item.minReorderLevel,
            price: item.price,
        })
    }, [setFormData, item]);

    const detailObject: Record<string, string> = formData.detail.split(",").map((item: string) => item.split(":"))
        .reduce((acc: Record<string, string>, [key, value]: [string, string]) => {
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);

    return (<>
        <div className={`flex flex-col md:flex-row md:relative md:space-x-4 w-full ${colorBackground[item.color]} ${colorBorder[item.color]}  border-2  rounded-md my-10`}>
            <div className="flex md:flex-row flex-col md:sticky top-0 md:h-screen h-fit items-center md:w-1/2 w-full select-none">
                <div className="space-y-3  pb-5 mx-5 h-3/4 hidden md:block overflow-y-auto scrollbar-hide">
                    {data && data.map((img, index) =>
                        <Image key={index} className="w-20 h-20 bg-white rounded-xl shadow-lg p-1" unoptimized alt="Product-1" src={`data:image/webp;base64,${img}`} width={0} onMouseEnter={() => setImage(img)} height={0} />
                    )}
                </div>
                <div className="w-full justify-center items-center px-2 space-y-4 mt-5 md:mt-0">
                    <div className="text-3xl text-neutral-600 right-0 absolute">Size: {item.size}</div>
                    <Image className="w-5/6 h-96 mx-auto" unoptimized alt="Product-1" src={`data:image/webp;base64,${image}`} width={0} height={0} />
                    <div className="relative w-full">
                        <button className="absolute left-0 w-fit md:left-auto md:right-14 md:text-xl text-lg bg-neutral-400 rounded-full md:px-3 md:py-2 px-2.5 py-1" onClick={prevImage}>
                            &#10094;
                        </button>
                        <button className="absolute  right-0  md:text-xl text-lg bg-neutral-400 rounded-full md:px-3 md:py-2 px-2.5 py-1" onClick={nextImage}>
                            &#10095;
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2 w-full">
                <div className="overflow-y-auto h-full flex-1 p-4 md:ml-20 ml-0">
                    <div>
                        <div className="flex justify-between items-center">
                            <div className="text-neutral-500 md:text-lg text-medium my-2">Released, {FormatDate(item.createdAt)}</div>
                            <div className={`w-16 h-5 rounded-full ${colorPill[item.color]}`}></div>
                        </div>
                        {item.updatedAt && <div className="text-neutral-500 md:text-lg text-medium my-2">Updated, {FormatDate(item.updatedAt)}</div>}
                    </div>
                    <div className="md:text-lg text-medium  underline underline-offset-4 mt-2 font-mono font-bold text-red-600">{item.quantity} left in stock</div>
                    <div className="flex flex-row space-x-4 text-lg items-end mt-5">
                        {item.discount ?
                            (
                                <>
                                    <span className="flex flex-row items-end">
                                        <span className="md:text-medium text-sm">
                                            MRP&#160;&#58;
                                        </span>
                                        <span className="flex flex-row underline text-2xl md:text-3xl items-center">
                                            <BiRupee />
                                        </span>
                                    </span>
                                    <span className="line-through flex text-sm md:text-lg flex-row items-center">
                                        <BiRupee />{item.price}
                                    </span>
                                    <span className="flex flex-row items-center bg-red-200 text-red-600 text-sm md:text-lg rounded-md px-2 border-2 border-red-300 ">
                                        {item.discount.discountPercentage}<FaPercentage />
                                    </span>
                                </>
                            ) : (
                                <span className="flex flex-row items-end">
                                    <span className="md:text-medium text-sm">
                                        MRP&#160;&#58;
                                    </span>
                                    <span className="flex flex-row underline text-2xl md:text-3xl items-center">
                                        <BiRupee />{item.price}
                                    </span>
                                </span>
                            )}
                    </div>
                    {
                        isEdit && <Input isRequired label="Price" placeholder=" " name="price" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid Price</p></div>} onChange={handleInputChange} value={formData.price} isInvalid={validationErrors.price} />
                    }
                    <div className="my-8 mr-5 space-y-2 text-justify">
                        <div className="flex justify-between">
                            <div className={`${montserrat_Subrayada.className} text-lg md:text-xl [word-spacing:5px]`}>Product Details</div>
                            <FaEdit className="text-xl" onClick={() => setIsEdit(!isEdit)} />
                        </div>
                        <div className="[word-spacing:5px] tracking-wide leading-7 text-sm md:text-medium">
                            <div className="flex flex-col space-y-1 w-full min-w-40 mx-auto rounded-md pt-2 overflow-hidden shadow-neutral-300">
                                {
                                    Object.entries(detailObject).map(([key, value]) => (
                                        <Checkbox key={key} isSelected={true} size="md" radius="sm" color="success" >
                                            <div className="flex flex-row space-x-2">
                                                <div className="font-semibold tracking-wide text-sm md:text-medium">{key}:</div>
                                                <div className="text-sm md:text-medium">{value}</div>
                                            </div>
                                        </Checkbox>
                                    ))
                                }
                                {
                                    isEdit && <Input isRequired label="Detail" placeholder=" " name="detail" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid detail</p></div>} onChange={handleInputChange} value={formData.detail} isInvalid={validationErrors.detail} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className={`${montserrat_Subrayada.className} text-lg md:text-xl [word-spacing:5px]`}>Inventory level</div>
                        <FaEdit className="text-xl" onClick={() => setIsEdit(!isEdit)} />
                    </div>
                    <div className="flex flex-col space-y-1 mt-3">
                        <Checkbox isSelected={true} size="md" radius="sm" color="success" >
                            <div className="flex flex-row space-x-2">
                                <div className="font-semibold tracking-wide text-sm md:text-medium">Quantity:</div>
                                <div className="text-sm md:text-medium">{item.quantity}</div>
                            </div>
                        </Checkbox>
                        <Checkbox isSelected={true} size="md" radius="sm" color="success" >
                            <div className="flex flex-row space-x-2">
                                <div className="font-semibold tracking-wide text-sm md:text-medium">Min Reorder Level:</div>
                                <div className="text-sm md:text-medium">{item.minReorderLevel}</div>
                            </div>
                        </Checkbox>
                        {
                            isEdit && <Input isRequired label="Minimum Reorder Level" placeholder=" " name="minReorderLevel" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid minReorderLevel</p></div>} onChange={handleInputChange} value={formData.minReorderLevel} isInvalid={validationErrors.minReorderLevel} />
                        }
                        <Checkbox isSelected={true} size="md" radius="sm" color="success" >
                            <div className="flex flex-row space-x-2">
                                <div className="font-semibold tracking-wide text-sm md:text-medium">Max Reorder Level:</div>
                                <div className="text-sm md:text-medium">{item.maxReorderLevel}</div>
                            </div>
                        </Checkbox>

                        {
                            isEdit && <Input isRequired label="Maximum Reorder Level" placeholder=" " name="maxReorderLevel" classNames={{ base: "w-11/12 pt-5 z-0", inputWrapper: "h-12 bg-neutral-200/50 border-2 border-neutral-400" }} labelPlacement="outside" radius="sm" variant="bordered" errorMessage={<div className="flex flex-row space-x-2 items-center"><IoWarning className="text-lg" /><p>Please enter valid maxReorderLevel</p></div>} onChange={handleInputChange} value={formData.maxReorderLevel} isInvalid={validationErrors.maxReorderLevel} />
                        }
                    </div>
                    <ImageUploadComp folder="/items" maxImages={5} name="items" setFormData={setFormData} setImageFormData={setImageFormData} />
                    <Button className={` bg-green-500 w-full mt-5`} radius="full" size="lg">Submit</Button>
                    <Button className={`${item.isActive ? "bg-teal-500" : "bg-red-500"} w-full mt-5`} radius="full" size="lg">{item.isActive ? "Disable" : "Enable"}</Button>
                </div>
            </div>
        </div >
    </>);
}


