import { ProductCardComp } from "@/components/utility/product/ProductCard";
import { ProductInterface, RightPanelInterface } from "./interface";

/**
 * The Component for the right panel of the page
 * 
 * @returns The Right panel of product container page
 */
export function RightPanel({ products, isOpen }: RightPanelInterface) {
    return <>
        <div className={`${isOpen && "hidden md:block"}`}>
            <div className="grid grid-flow-row lg:grid-cols-3 md:grid-cols-2 grid-cols-1  space-x-3 my-5 mr-2 ml-10 md:ml-2">
                {products.map((product: ProductInterface, index: number) =>
                    <ProductCardComp product={product} key={index} />
                )}
            </div>
        </div>
    </>
}