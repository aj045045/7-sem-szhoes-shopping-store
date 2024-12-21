import { montserrat_Subrayada } from "@/langs";
import { Product } from "./Product";
import { Total } from "./Total";

/**
 * The Components that used as a wrapper for the Cart 
 * 
 * @returns the cart components
 */
export function CustomerCartComp() {
    return (
        <div className="w-5/6 mx-auto my-10">
            <div className={`${montserrat_Subrayada.className} text-center text-3xl [word-spacing:10px]`}>Your Cart</div>
            <div className="md:grid-flow-row md:grid-cols-3 mt-10 grid space-x-3">
                <Total />
                <Product />
            </div>
        </div>
    )
}