
import { CustomerOrderComp } from "@/components";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Order"
};
export default function OrderPage() {
    return <>
        <CustomerOrderComp />
    </>
}