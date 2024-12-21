import { Divider } from "@nextui-org/react";
import { Order } from "./Order";
import { ProductItem } from "./ProductItem";
import { PaymentDetail } from "./PaymentDetail";
import { SummaryDetail } from "./SummaryDetail";

/**
 * The Customer Order Detail Component that is used as a wrapper for the Order detail
 * 
 * @returns Order Detail Page
 */
export function CustomerOrderDetailComp() {
    return (
        <div className="w-10/12 mx-auto bg-white rounded-md my-10 p-5 shadow-lg space-y-5">
            <Order />
            <Divider orientation="horizontal" className="bg-neutral-300 h-0.5" />
            <ProductItem />
            <Divider orientation="horizontal" className="bg-neutral-300 h-0.5" />
            <PaymentDetail />
            <Divider orientation="horizontal" className="bg-neutral-300 h-0.5" />
            <SummaryDetail />
        </div>
    );
}
