import { CustomerCartComp } from "@/components";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Cart"
};

export default function CartPage() {
    return <>
        <CustomerCartComp />
    </>

}