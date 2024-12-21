
import { CustomerOrderDetailComp } from "@/components";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Order Detail"
};
export default function OrderPage() {
    return <>
        <CustomerOrderDetailComp />
    </>
}