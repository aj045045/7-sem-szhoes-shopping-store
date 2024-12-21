'use client'
import { Divider } from "@nextui-org/divider";
import { AddComplaintButton } from "./AddComplaintButton";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";

/**
 * The components used for the list of order detail
 * 
 * @returns Order detail
 */
export function Order() {
    const removeProduct = () => {
        alert("Cancel product");
    };

    const numbers = Array.from({ length: 3 }, (_, index) => index + 1);
    const price = 12000;
    return (
        <div className="col-span-2 bg-white p-10 rounded-md shadow-xl">
            <AddComplaintButton />
            <div className="text-neutral-500 mb-5">{numbers.length} products</div>
            <div className="space-y-10">
                {numbers.map((index) => (
                    <div key={index}>
                        <Divider className="h-px mb-5" orientation="horizontal" />
                        <Link prefetch={false} href={"order/xyz"} className="flex md:flex-row flex-col lg:space-x-8 space-y-5 md:space-y-0 items-center">
                            <Image
                                className="w-40 rounded-xl bg-neutral-100 p-2 border-2 border-neutral-300"
                                unoptimized
                                alt="Image"
                                src={"/images/image-4.png"}
                                height={0}
                                width={0}
                            />
                            <div className="space-y-3 items-center lg:items-start flex flex-col">
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
                                <div className="md:text-xl text-lg ">Fantastic Rubber Salad</div>
                                <div className="flex justify-between w-full flex-col items-center md:items-start space-y-3">
                                    <div className="flex flex-row items-center space-x-2 md:text-lg text-medium">
                                        <FaIndianRupeeSign />
                                        {price}
                                    </div>
                                    <div
                                        onClick={removeProduct}
                                        className="text-sm text-red-600 border-2 border-red-600 w-fit px-2 py-1 hover:bg-red-500 cursor-pointer hover:border-transparent hover:text-red-950"
                                    >
                                        Cancel Order
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

