
import { ProductDetailComp } from "@/components";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Product Detail"
};


export default function ProductDetailPage() {
    return (
        <>
            <ProductDetailComp />
        </>
    )
}