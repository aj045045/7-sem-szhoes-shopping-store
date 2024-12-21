import { CustomerProfileComp } from "@/components";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Profile"
};
export default function ProfilePage() {
    'use client'
    return (
        <CustomerProfileComp />
    );
}