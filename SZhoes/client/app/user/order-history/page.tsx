
import { CustomerOrderHistoryComp } from "@/components";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Order History"
};
export default function OrderHistoryPage() {
    return <>
        <CustomerOrderHistoryComp />
    </>
}