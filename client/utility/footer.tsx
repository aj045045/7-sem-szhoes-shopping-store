import { comforterBrush, montserratSubrayada } from "@/langs";
import Link from "next/link";
import { FooterProduct } from "@/interfaces/utility";


/**
 * The component that is used for the footer section page
 * 
 * @returns The footer section
 */

export function FooterUtil() {

    const FooterProductData: FooterProduct[] = [
        {
            type: "Product", list: [
                { link: "#", data: "Small Cotton Cheese" },
                { link: "#", data: "Refined Concrete Bike" },
                { link: "#", data: "Practical Concrete Salad" },
            ]
        },
        {
            type: "Perfume", list: [
                { link: "#", data: "Intelligent Plastic Chicken" },
                { link: "#", data: "Fantastic Wooden Bacon" },
                { link: "#", data: "Intelligent Steel Mouse" },
            ]
        },
        {
            type: "Accessories", list: [
                { link: "#", data: "Sausages" },
                { link: "#", data: "Chair" },
                { link: "#", data: "Gloves" },
            ]
        },
        {
            type: "Help", list: [
                { link: "/login", data: "Login" },
                { link: "/register", data: "Register" },
                { link: "/home", data: "Home" },
                { link: "/blog", data: "Blogs" },
                { link: "/men", data: "men" },
                { link: "/women", data: "women" },
                { link: "/kids", data: "kids" },
            ]
        },
    ]

    return <>
        <div className="mt-20 flex md:flex-row flex-col px-5  md:px-0 justify-around py-16 bg-white border-t-2 border-t-neutral-200 h-fit select-none">
            <div className="flex flex-col items-center space-y-5">
                <div className="flex flex-row items-end">
                    <div className={`${montserratSubrayada.className} text-4xl`}>S</div>
                    <div className={`${comforterBrush.className} text-green-700 text-4xl`}>Z</div>
                    <div className={`${montserratSubrayada.className} ml-2 text-3xl `}>hoes</div>
                </div>
            </div>
            {FooterProductData.map((data, index) => (
                <div key={index}>
                    <div className="font-bold md:mb-5 mt-5">{data.type}</div>
                    <div className="flex flex-col">
                        {data.list.map((value, index) =>
                            <Link prefetch={false} key={index} href={value.link} className="text-neutral-500 hover:underline hover:underline-offset-2 capitalize">{value.data}</Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center bg-white pb-5 text-neutral-500 select-none">Copyright&#169; 2024 SZhoes. All rights are reserved</div>
    </>
}
