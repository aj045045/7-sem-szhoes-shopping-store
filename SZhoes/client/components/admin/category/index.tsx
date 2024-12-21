'use client'
import { DataCardMap } from "@/components/utility/admin/DataCardMap";
import { NumberOfCardInterface } from "@/components/utility/admin/interface";
import { GiPearlNecklace } from "react-icons/gi";
import { IoMdMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { MdCollectionsBookmark, MdOutlineChildFriendly } from "react-icons/md";
import { DataList } from "./DataList";
import { useGetHook } from "@/hooks";
import { useEffect } from "react";
import { CountCategory } from "./interface";

export function AdminCategoryComp() {
    const { data, fetchData } = useGetHook<CountCategory[]>("/f/count/category");

    useEffect(() => {
        if (!data) {
            fetchData();
        }
    }, [fetchData, data]);


    const dataTitle = (title: string) => {
        const foundItem = data && data.find(item => item._id === title);
        return foundItem ? foundItem._id : "";
    };

    const dataValue = (title: string) => {
        const foundItem = data && data.find(item => item._id === title);
        return foundItem ? String(foundItem.count) : "";
    };

    const balanceSheet: NumberOfCardInterface[] = [
        { icon: <IoMdMale />, title: dataTitle("MEN"), value: dataValue("MEN") },
        { icon: <IoFemale />, title: dataTitle("WOMEN"), value: dataValue("WOMEN") },
        { icon: <MdOutlineChildFriendly />, title: dataTitle("KIDS"), value: dataValue("KIDS") },
        { icon: <GiPearlNecklace />, title: dataTitle("ACCESSORIES"), value: dataValue("ACCESSORIES") },
        { icon: <MdCollectionsBookmark />, title: dataTitle("COLLECTIONS"), value: dataValue("COLLECTIONS") },
    ];

    return (
        <>
            <DataCardMap title="Tag Summary" dataList={balanceSheet} />
            <DataList />
        </>
    );
}
