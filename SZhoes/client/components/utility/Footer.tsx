import { FooterProduct } from "./interface";
import { comforter_Brush, montserrat_Subrayada } from "@/langs";
import Link from "next/link";
import { FooterData } from "./api";

/**
 * The component that is used for the footer section page
 * 
 * @returns The footer section
 */
export function FooterComp() {
    const FooterProductData: FooterProduct[] = FooterData();
    return <>
        <div className="flex md:flex-row flex-col px-5  md:px-0 justify-around py-16 bg-white border-t-2 border-t-neutral-200 h-fit select-none">
            <div className="flex flex-col items-center space-y-5">
                <div className="flex flex-row items-end">
                    <div className={`${montserrat_Subrayada.className} text-4xl`}>S</div>
                    <div className={`${comforter_Brush.className} text-green-700 text-4xl`}>Z</div>
                    <div className={`${montserrat_Subrayada.className} ml-2 text-3xl `}>hoes</div>
                </div>
            </div>
            {FooterProductData.map((data, index) => (
                <div key={index}>
                    <div className="font-bold md:mb-5 mt-5">{data.type}</div>
                    <div className="flex flex-col">
                        {data.list.map((value, index) =>
                            <Link  prefetch={false} key={index} href={value.link} className="text-neutral-500 hover:underline hover:underline-offset-2 capitalize">{value.data}</Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
        <div className="text-center bg-white pb-5 text-neutral-500 select-none">Copyright&#169; 2024 SZhoes. All rights are reserved</div>
    </>
}
