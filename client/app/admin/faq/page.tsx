import { DataCardUtil } from "@/utility/admin/data-card-util";
import { Metadata } from "next";
import { FaQuestion } from "react-icons/fa";
import { QueryApp } from "./query";

export const metadata: Metadata = {
    title: "FAQ's"
};

export default function FAQApp() {
    return (
        <>
            <DataCardUtil title="Total FAQs" value="12" icon={<FaQuestion />} />
            <QueryApp />
        </>
    )
}