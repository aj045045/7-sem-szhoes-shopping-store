import { AdminFeedbackComp } from "@/components/admin/feedback";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Feedback"
};
export default function ComplaintAdminPage() {
    return <AdminFeedbackComp />
}