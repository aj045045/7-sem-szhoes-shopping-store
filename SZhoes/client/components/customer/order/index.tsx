import { montserrat_Subrayada } from "@/langs"
import { Order } from "./Order"

/**
 * The list of Order Detail that is used as a wrapper for the components
 * 
 * @returns The order detail
 */
export function CustomerOrderComp() {
    return (
        <div className="flex items-center flex-col space-y-5 my-5 w-full px-10">
            <div className={`${montserrat_Subrayada.className} text-2xl [word-spacing:10px]`}>Your Orders</div>
            <Order />
        </div>
    )
}