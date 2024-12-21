import { BlogComp } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blogs"
};

export default function BlogPage() {
    return <>
        <BlogComp />
    </>
};