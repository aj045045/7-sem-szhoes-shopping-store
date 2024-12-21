import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";

export function ImageMap() {
    const removeProduct = () => {
        alert("Remove product");
    }
    const addToCartProduct = () => {
        alert("Add to cart product");
    }
    return (
        <>
            <Divider className="h-px mb-5" orientation="horizontal" />
            <div className="flex md:flex-row flex-col md:space-x-20 space-y-5 items-center">
                <Image className="w-40 rounded-xl bg-neutral-100 p-2 border-2 border-neutral-300" unoptimized alt="Image" src={"/images/image-4.png"} height={0} width={0} />
                <div className="space-y-3">
                    <div className="lg:text-xl md:text-lg sm:text-medium text-sm">Fantastic Rubber Salad</div>
                    <div className="space-x-5 text-neutral-500">
                        <span>Color :Blue</span>
                        <span>Size :XL</span>
                    </div>
                    <div className="space-x-5">
                        <span onClick={addToCartProduct} className="text-sm text-green-700 border-2 border-green-700 w-fit px-2 py-1 hover:bg-green-500 cursor-pointer hover:border-transparent hover:text-green-950">Add to Cart</span>
                        <span onClick={removeProduct} className="text-sm text-red-600 border-2 border-red-600 w-fit px-2 py-1 hover:bg-red-500 cursor-pointer hover:border-transparent hover:text-red-950">Remove</span>
                    </div>
                </div>
                <span className="flex flex-row items-center space-x-3 md:text-lg text-medium"><FaIndianRupeeSign />12,000</span>
            </div>
        </>
    )
}