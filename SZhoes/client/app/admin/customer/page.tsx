import { AdminCustomerComp } from "@/components/admin/customer";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Customer"
};
export default function CustomerAdminPage() {
    return (
        <AdminCustomerComp />
    )


}