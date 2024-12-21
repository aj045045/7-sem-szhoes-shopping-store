import { Button, Divider, Link } from "@nextui-org/react";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { FaIndianRupeeSign, FaTruck } from "react-icons/fa6";
import { MdAssignmentReturn } from "react-icons/md";

/**
 * The Summary of the product that calculate the net price
 * 
 * @returns The Price, net price and discount
 */
export function SummaryDetail() {
    return (
        <div className="grid md:grid-flow-row grid-flow-col md:grid-cols-2 grid-rows-2 md:grid-rows-1 grid-cols-1">
            <div className="space-y-5">
                <div className="text-lg font-semibold">Need Help?</div>
                <div className="flex flex-col w-fit space-y-2">
                    <Button
                        href="#"
                        as={Link}
                        color="default"
                        showAnchorIcon
                        variant="faded"
                        startContent={<BsFillQuestionSquareFill />}
                    >
                        Order Issues
                    </Button>
                    <Button
                        href="#"
                        as={Link}
                        color="default"
                        showAnchorIcon
                        variant="faded"
                        startContent={<FaTruck />}
                    >
                        Delivery Issues
                    </Button>
                    <Button
                        href="#"
                        as={Link}
                        color="default"
                        showAnchorIcon
                        variant="faded"
                        startContent={<MdAssignmentReturn />}
                    >
                        Returns
                    </Button>
                </div>
            </div>
            <div className="space-y-5">
                <div className="text-lg font-semibold">Order Summary</div>
                <div className="space-y-2 text-neutral-500">
                    <div className="flex flex-row justify-between text-lg">
                        <span>Subtotal</span>
                        <span className="flex flex-row items-center space-x-3 md:text-lg text-medium"><FaIndianRupeeSign />12,000</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Discount</span>
                        <span className="flex flex-row items-center space-x-3 md:text-medium text-sm">(10%)<FaIndianRupeeSign />1200</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Delivery</span>
                        <span className="flex flex-row items-center space-x-3 md:text-medium text-sm"><FaIndianRupeeSign />100</span>
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Tax</span>
                        <span className="flex flex-row items-center space-x-3 md:text-medium text-sm"><FaIndianRupeeSign />100</span>
                    </div>
                    <Divider orientation="horizontal" className="bg-neutral-400 h-0.5" />
                    <div className="flex flex-row justify-between text-neutral-800">
                        <span>Total</span>
                        <span className="flex flex-row items-center space-x-3 md:text-lg text-medium"><FaIndianRupeeSign />13,400</span>
                    </div>
                </div>
            </div>
        </div>
    )
}