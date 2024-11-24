'use client'
import { FooterUtil } from "@/utility/footer";
import { NavbarUtil } from "@/utility/navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <NavbarUtil />
            {children}
            <FooterUtil />
        </>
    );
}
