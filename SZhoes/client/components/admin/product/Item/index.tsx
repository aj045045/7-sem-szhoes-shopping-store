'use client'
import { useParams } from "next/navigation";
import { ImageContainer } from "./ImageContainer";
import { useEffect } from "react";
import { useGetHook } from "@/hooks";
import { ProductDetail } from "./ProductDetail";
import { ProductItemInterface } from "./interface";

export function AdminItemComp() {
    const params = useParams<{ item: string }>();
    const { data, fetchData } = useGetHook<ProductItemInterface>(`/s/auth/product/${params.item}`);
    useEffect(() => {
        if (!data) {
            fetchData();
        }
    }, [data, fetchData]);
    return (
        <div>
            {data ? (
                <>
                    <ProductDetail product={data} />
                    {data.items.map((item, index) => (
                        <ImageContainer item={item} key={index} />
                    ))}
                </>
            ) : (
                <div>No product data available.</div>
            )}
        </div>
    )
}