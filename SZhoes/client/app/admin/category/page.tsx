import { AdminCategoryComp } from "@/components/admin/category";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Category"
};

export default function CategoryAdminPage() {
    return <AdminCategoryComp />
}