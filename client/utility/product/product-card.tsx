'use client'
import { ProductInterface } from "@/interfaces/product";
import Image from "next/image";
import Link from "next/link";
import { FaIndianRupeeSign, FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";

/**
 * The Component that is used for the product card
 * 
 * @param product - The Product detail
 * @returns The Product Card
 */
export function ProductCardUtil({ product }: { product: ProductInterface }) {
    const displayStar = () => {
        const display: React.ReactNode[] = [];
        const integerPart = Math.floor(product.rate);
        let fractionalPart = product.rate - integerPart;

        for (let i = 0; i < 5; i++) {
            if (i < integerPart) {
                display.push(<FaStar key={i} />);
            } else if (fractionalPart >= 0.5) {
                display.push(<FaStarHalfStroke key={i} />);
                fractionalPart = 0;
            } else {
                display.push(<FaRegStar key={i} />);
            }
        }

        return display;
    };
    return (
        <Link href={product.link} key={product.id} className={`${product.percentage ? "bg-red-100 border-2 border-red-300" : "bg-white border-b-2 border-b-transparent"} inline-block group shadow-lg md:shadow-xl shadow-neutral-300 mb-7 rounded-sm overflow-hidden w-72`}>
            <div className="relative w-full h-72  overflow-hidden">
                {product.percentage && product.percentage > 0 ? <div className="absolute z-10 pl-2 font-semibold mt-3 rounded-r-md pr-2 text-red-700 bg-red-200 shadow-md border-1.5 border-l-0 border-red-400">-&nbsp;{product.percentage}%</div> : null}
                <Image src={product.image} alt={product.name} priority={true} className='transition-transform duration-300 ease-in-out transform md:group-hover:scale-125 w-full object-cover bg-neutral-300' unoptimized width={0} height={0} />
            </div>
            <div className="p-3 h-fit overflow-x-auto">
                <div className="flex flex-row items-center space-x-2">
                    <span>{product.rate}</span>
                    <span className='flex flex-row space-x-2 text-orange-500 text-lg mb-1'>{displayStar()}</span>
                </div>
                <div className="text-lg font-bold mt-2 tracking-wide">{product.name}</div>
                <span className="text-medium text-neutral-500">{product.title}</span>
                <div className="flex flex-row space-x-3 items-center">
                    {product.oldPrice && product.oldPrice > 0 ? <p className={`${product.title ? 'mt-2' : "mt-8"} line-through flex flex-row items-center text-md`}><FaIndianRupeeSign />{product.oldPrice.toFixed(2)}</p> : null}
                    <p className={`${product.title ? 'mt-2' : "mt-8"} underline underline-offset-2 flex flex-row items-center text-md`}><FaIndianRupeeSign />{product.price.toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}