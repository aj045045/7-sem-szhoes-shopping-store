import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";

/**
 * The Product Item that has ordered
 * 
 * @returns The Product, Color, Price and Quantity
 */
export function ProductItem() {
    return (
        <div className="flex md:flex-row flex-col justify-between items-center space-y-2 md:space-y-0">
            <div className="flex flex-row space-x-5 items-center">
                <Image className="w-32 rounded-xl bg-neutral-100 p-2 border-2 border-neutral-300" unoptimized alt="Image" src={"/images/image-4.png"} height={0} width={0} />
                <div className="space-y-3">
                    <div className="text-xl">Tasty Granite Towels</div>
                    <div className="flex flex-row space-x-3 text-neutral-500">
                        <div>Green</div>
                        <Divider orientation="vertical" className="bg-neutral-400 w-0.5 h-6" />
                        <div>6</div>
                    </div>
                </div>
            </div>
            <div className="md:space-y-3 space-x-2 flex md:flex-col flex-row">
                <div className="flex flex-row items-center space-x-3 md:text-lg text-medium"><FaIndianRupeeSign />12,000</div>
                <div className="text-neutral-500">Qty: 1</div>
            </div>
        </div>
    )
}
