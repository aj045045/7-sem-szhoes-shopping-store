import { montserrat_Subrayada } from "@/langs";
import { Order } from "./Order";

/**
 * The Order history component used as a wrapper for the history of products
 * 
 * @returns The Order History Record
 */
export function CustomerOrderHistoryComp() {
    return (
        <div className="flex items-center flex-col space-y-5 my-10 w-full px-10">
            <div className={`${montserrat_Subrayada.className} text-2xl [word-spacing:10px]`}>Your Order History </div>
            <Order />
        </div>
    )
}