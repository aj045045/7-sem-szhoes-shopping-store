import { ProductComp } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product"
};

export default function ProductPage() {

    return <>
        <ProductComp/>
    </>

}