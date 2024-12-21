'use client'
import { DataCardMap } from "@/components/utility/admin/DataCardMap"
import { FaRegNewspaper } from "react-icons/fa6"
import { MdPreview } from "react-icons/md"
import { PiShoppingCartSimpleBold } from "react-icons/pi"
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb"
import { Chart } from "@/components/utility/admin/Chart"
import { NumberOfCardInterface } from "@/components/utility/admin/interface"
import { Summary } from "./Summary"
import { useGetHook } from "@/hooks"
import { useEffect } from "react"
import { Datum } from "./interface"

export function AdminCustomerComp() {

    const { data, fetchData, status } = useGetHook<Datum[]>('/s/customer/counter');
    useEffect(() => {
        if (!status) {
            fetchData();
        }
    }, [fetchData, status]);
    const datum = data || [];
    const balanceSheet: NumberOfCardInterface[] = [
        { icon: <TbTruckDelivery />, title: "Delivery", value: String(datum[0]?.deliveryCount || 0) },
        { icon: <MdPreview />, title: "Review", value: String(datum[0]?.reviewCount || 0) },
        { icon: <FaRegNewspaper />, title: "Promotional", value: String(datum[0]?.promotionalCount || 0) },
        { icon: <TbTruckReturn />, title: "Return", value: String(datum[0]?.returnCount || 0) },
        { icon: <PiShoppingCartSimpleBold />, title: "Order", value: String(datum[0]?.orderCount || 0) },
    ];

    const summaryList = ['Registered customer', 'Updated customer', 'Recently visited customer', 'Last visited customer', 'Notification Preference'];

    return (
        <div className="space-y-5">
            <Summary customer={String(datum[0]?.totalDocuments || 0)} summaryList={summaryList} />
            <DataCardMap title="Notification Summary" dataList={balanceSheet} />
            <Chart title="Registered customer" imagePath="/f/graph/customer" display="createdAt" />
            <Chart title="Updated customer" imagePath="/f/graph/customer" display="updatedAt" />
            <Chart title="Recently visited customer" imagePath="/f/graph/customer" display="loggedInAt" />
            <Chart title="Last visited customer" imagePath="/f/graph/customer" display="lastLoggedInAt" />
            <Chart title="Notification Preference" imagePath="/f/graph/customer/notification" />
        </div>
    );
}