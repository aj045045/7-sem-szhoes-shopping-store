'use client'
import Image from "next/image";
import Link from "next/link";
import { BlogInterface } from "../interface";

/**
 * The component that is used to display a card for blogs
 *  
 * @param product - The blog data contain the id, link, image, data, title and description of a blog
 * @returns The card contain the data for a blog
 */
export function BlogCardComp({ product }: { product: BlogInterface }) {
    return (
        <Link prefetch={false} href={product.link} key={product.id} className="border-b-transparent inline-block group shadow-neutral-300 shadow-lg mb-7 rounded-sm overflow-hidden w-72">
            <div className="relative w-full h-72 overflow-hidden">
                <Image src={product.image} alt={product.title} priority={true} className='transition-transform duration-300 ease-in-out transform md:group-hover:scale-125 w-full object-cover bg-neutral-300' unoptimized width={0} height={0} />
            </div>
            <div className="p-3 h-full flex flex-col justify-between bg-white border-t-2 border-t-neutral-400">
                <span className="text-medium text-neutral-500">{product.date}</span>
                <div className="text-lg font-bold mb-4 mt-1 tracking-wide">{product.title}</div>
                <div className="text-sm text-neutral-700 overflow-y-auto scrollbar-hide whitespace-normal h-40 text-justify">
                    {product.description}
                </div>
            </div>
        </Link>
    );
}