import { HomeComp } from "@/components";

import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Home"
};
export default function HomePage() {
    return <>
        <HomeComp />
    </>
}