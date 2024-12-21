import { AdminProductComp } from "@/components/admin/product";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product"
};

export default function ProductPage() {
    return <AdminProductComp />
}