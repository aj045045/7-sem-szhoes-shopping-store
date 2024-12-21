import { Button, Divider, Snippet } from "@nextui-org/react";
import { AddComplaintButton } from "../AddComplaintButton";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { TrackOrderButton } from "./TrackOrderButton";
import { IoMdDownload } from "react-icons/io";

/**
 * The Order Section Page with date and time
 * 
 * @returns Add complain, Delivery Date and Track Order Detail
 */
export function Order() {
    return (
        <div className="space-y-2">
            <div className="flex md:flex-row flex-col md:justify-between md:items-center">
                <Snippet symbol="ID:" classNames={{ base: "border-0 text-xl md:text-2xl lg:text-3xl" }} variant="bordered">ORD349102482943</Snippet>
                <div className="flex md:flex-row flex-col space-y-2 md:space-y-0 md:space-x-5 md:items-center">
                    <AddComplaintButton />
                    <Button className="border-green-500 text-green-900" variant="bordered" radius="sm" > <IoMdDownload className="text-lg" /> Invoice</Button>
                    <TrackOrderButton />
                </div>
            </div>
            <div className="flex md:flex-row flex-col md:space-x-3 space-y-2 md:space-y-0 md:items-center">
                <div className="space-x-2">
                    <span className="text-neutral-500">Order Date:</span>
                    <span className="text-neutral-700">Feb 16, 2024</span>
                </div>
                <Divider orientation="horizontal" className="bg-neutral-400 w-0.5 h-6 hidden md:flex" />
                <div className="space-x-2 flex flex-row place-items-center">
                    <MdOutlineAirplanemodeActive className="text-lg text-green-600" />
                    <span className="text-green-600">Estimate Delivery:</span>
                    <span className="text-green-800">May 14, 2022</span>
                </div>
            </div>
        </div>
    )
}