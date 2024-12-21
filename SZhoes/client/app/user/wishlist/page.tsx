
import { WishlistComp } from "@/components";
import { montserrat_Subrayada } from "@/langs";
import type { Metadata } from "next";
export const metadata: Metadata = {
    title: "Wishlist"
};
export default function WishlistPage() {
    return <>
        <div className="w-fit mx-auto my-10 bg-white py-5 px-10 rounded-lg shadow-lg">
            <div className={`${montserrat_Subrayada.className} text-center text-3xl [word-spacing:10px]`}>Your Wishlist</div>
            <WishlistComp />
        </div>
    </>
}