'use client'
import { useState } from "react";
import { ProductInterface } from "./interface";
import { LeftPanel } from "./LeftPanel";
import { RightPanel } from "./RightPanel";
import { ProductData } from "./api";

/**
 * The component that is used as wrapper for the products
 * 
 * @returns The product page
 */
export function ProductComp() {
    const products: ProductInterface[] = ProductData();
    const [isOpen, setIsOpen] = useState(true);
    return <div className="flex flex-row h-full">
        <LeftPanel isOpen={isOpen} setIsOpen={setIsOpen} />
        <RightPanel products={products} isOpen={isOpen} />
    </div>
}