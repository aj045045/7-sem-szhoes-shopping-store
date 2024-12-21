import { montserrat_Subrayada } from "@/langs";
import { Button } from "@nextui-org/button";
import { FaIndianRupeeSign } from "react-icons/fa6";

/**
 * The Product Components that is used to calculate the taxes and over all expenses
 * 
 * @returns Net Total of the prices
 */
export function Product() {
    return (
        <div className="space-y-5 mt-10 md:mt-0">
            <div className={`${montserrat_Subrayada.className} text-2xl [word-spacing:5px]`}>Cart total</div>
            <div className="flex flex-row justify-between bg-neutral-300 px-6 py-3 rounded-md">
                <div>Subtotal</div>
                <div className="flex flex-row items-center space-x-3 md:text-lg text-medium"><FaIndianRupeeSign />12,000</div>
            </div>
            <div className="flex flex-row justify-between bg-neutral-300 px-6 py-3 rounded-md">
                <div>Shipping</div>
                <div className="flex flex-row items-center space-x-3 md:text-lg text-medium"><FaIndianRupeeSign />1,000</div>
            </div>
            <div className="flex flex-row justify-between bg-neutral-300 px-6 py-3 rounded-md">
                <div>Total</div>
                <div className="flex flex-row items-center space-x-3 md:text-lg text-medium"><FaIndianRupeeSign />13,000</div>
            </div>
            <Button className="bg-green-500" radius="none" size="lg">Order</Button>
        </div>
    )
}