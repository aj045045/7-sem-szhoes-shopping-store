import { BlogDetailComp } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog Details"
};

export default function BlogDetailPage() {
    return (
        <>
            <BlogDetailComp />
        </>
    )
};