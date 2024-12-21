'use client'
import { montserrat_Subrayada } from "@/langs";
import { AddProduct } from "./AddProduct";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ProductItem } from "./ProductItem";
import { useGetHook } from "@/hooks";
import { ProductItemInterface } from "./interface";

export function ProductDetail() {
    const [isOpen, setIsOpen] = useState(false);
    const { data, fetchData } = useGetHook<ProductItemInterface[]>("/f/aggregation/product");
    useEffect(() => {
        if (!data) {
            fetchData();
        }
    }, [fetchData, data]);

    return (
        <div className="w-full p-4 my-4 space-y-3 rounded-lg bg-neutral-300 border-1 border-neutral-400">
            <div className="flex justify-between">
                {isOpen ? <div className={`${montserrat_Subrayada.className} text-xl [word-spacing:10px] text-green-950`} >Add New Product</div> : <div className={`${montserrat_Subrayada.className} text-xl [word-spacing:10px] text-green-950`} >Product List</div>}
                {!isOpen && <Button onClick={() => setIsOpen(!isOpen)} className="bg-green-500 text-green-950 border-0 block mr-0 ml-auto mb-2" radius="sm">Add Product</Button>}
            </div>
            {isOpen ? <AddProduct isOpen={isOpen} setIsOpen={setIsOpen} /> :
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center">
                    {data && data.map((data, index) => (
                        <ProductItem key={index} category={data.category} itemCount={data.itemCount} name={data.name} _id={data._id} categoryId={data.categoryId} />
                    ))}
                </div>
            }
        </div>
    );
}