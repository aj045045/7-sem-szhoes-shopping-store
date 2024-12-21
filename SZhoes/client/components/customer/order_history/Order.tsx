import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import Link from "next/link";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { MdOutlineAirplanemodeActive } from "react-icons/md";

/**
 * The component that is used to display the order details
 * @returns Product Image
 */
export function Order() {
    const numbers = Array.from({ length: 3 }, (_, index) => index + 1);
    const price = 12000;
    return (
        <div className="col-span-2 bg-white rounded-md p-5 md:p-10 shadow-xl mt-12 md:w-11/12 w-full">
            <div className="text-neutral-500 mb-5">{numbers.length} products</div>
            <div className="space-y-10">
                {numbers.map((index) => (
                    <div key={index}>
                        <Divider className="h-px mb-5" orientation="horizontal" />
                        <Link prefetch={false} href={"/product/xyz"} className="flex md:flex-row flex-col lg:space-x-8 space-y-5 md:space-y-0 items-center">
                            <Image
                                className="w-40 rounded-xl bg-neutral-100 p-2 border-2 border-neutral-300"
                                unoptimized
                                alt="Image"
                                src={"/images/image-4.png"}
                                height={0}
                                width={0}
                            />
                            <div className="space-y-3 items-center lg:items-start flex flex-col">
                                <div className="space-x-2 flex flex-row place-items-center">
                                    <MdOutlineAirplanemodeActive className="text-lg text-green-600" />
                                    <span className="text-green-600"> Delivery On</span>
                                    <span className="text-green-800">May 14, 2022</span>
                                </div>
                                <div className="md:text-xl text-lg ">Fantastic Rubber Salad</div>
                                <div className="flex justify-between w-full flex-col items-center md:items-start space-y-3">
                                    <div className="flex flex-row items-center space-x-2 md:text-lg text-medium">
                                        <FaIndianRupeeSign />
                                        {price}
                                    </div>
                                </div>
                            </div>

                        </Link>
                    </div>
                ))}
            </div>
        </div >
    )
}