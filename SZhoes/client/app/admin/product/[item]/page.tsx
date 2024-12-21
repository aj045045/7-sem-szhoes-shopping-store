import { AdminItemComp } from "@/components/admin/product/Item";

import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Items"
};

export default function ItemPage() {
    return <AdminItemComp />
}