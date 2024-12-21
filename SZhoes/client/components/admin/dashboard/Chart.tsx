'use client'
import { montserrat_Subrayada } from "@/langs";
import { DataCardInterface } from "@/components/utility/admin/interface";
import { useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import { useGetHook } from "@/hooks";
import { Skeleton } from "@nextui-org/skeleton";

/**
 * The component that is used to display the Chart 
 * 
 * @param title - The title of the chart component
 * @param data - The Data to be display as a Chart
 * @returns The chart and their filters 
 */
export function Chart({ title, imagePath }: DataCardInterface) {
    const { data, fetchData, status } = useGetHook<{ data: string, status: string }>(imagePath || '');
    useEffect(() => {
        fetchData();
    }, [data, fetchData]);
    return (
        <div className="bg-neutral-300 border-1 border-neutral-400 space-y-3 p-4 my-4 rounded-lg w-full">
            <div className="flex justify-between">
                <div className={`${montserrat_Subrayada.className} text-xl [word-spacing:10px] text-green-950`}>{title}</div>
                <Select
                    aria-label="Select box"
                    defaultSelectedKeys={["1D"]}
                    labelPlacement="outside-left"
                    className="w-28"
                >
                    <SelectItem key="1D">1&nbsp;Day</SelectItem>
                    <SelectItem key="1W">1&nbsp;Week</SelectItem>
                    <SelectItem key="1M">1&nbsp;Month</SelectItem>
                    <SelectItem key="1Y">1&nbsp;Year</SelectItem>
                    <SelectItem key="MAX">Max</SelectItem>
                </Select>
            </div>
            <Skeleton className="bg-white min-w-1/2 mx-auto min-h-60 rounded-md p-4 " isLoaded={status}>
                <Image className="bg-white w-2/3 mx-auto h-full rounded-md p-4 object-cover" src={`data:image/webp;base64,${data}`} alt="Charts image" width={0} height={0} />
            </Skeleton>
        </div>
    )
}
