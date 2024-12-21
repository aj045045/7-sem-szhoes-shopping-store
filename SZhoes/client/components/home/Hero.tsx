import { comforter_Brush, courgette, montserrat_Subrayada } from "@/langs";
import { TypingComp } from "@/components/utility/Typing";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
/**
 * The component that is used for the hero section of the home page
 * 
 * @returns Hero section
 */
export function Hero() {
    const data: string[] = ["Smell the difference with SZ...", "Discover Comfort, Style, and Freshness", "SZhoes - Shoes That Keep You Fresh!", "Where comfort meets style...", "Explore our collection and step into your perfect pair...",]
    return (
        <div className="select-none  bg-green-200/80 md:flex-row w-full items-center md:grid-flow-col md:grid-cols-3 md:grid py-5 h-min border-b-2 border-b-neutral-300">
            <div className="items-center md:items-start flex flex-col text-justify  md:col-span-2 mx-10">
                <div className="text-2xl font-medium  cursor-text">
                    <div className="flex flex-row items-center font-semibold space-x-2 mb-2">
                        <span>Welcome to</span>
                        <div className="flex flex-row items-end">
                            <div className={`${montserrat_Subrayada.className} text-4xl lg:text-3xl`}>S</div>
                            <div className={`${comforter_Brush.className} text-green-600 text-4xl lg:text-3xl`}>Z</div>
                            <div className={`${montserrat_Subrayada.className} ml-2 text-3xl lg:text-2xl`}>hoes</div>,
                        </div>
                    </div>
                    <TypingComp langClass={`${courgette.className} text-4xl`} words={data} />
                </div>
                <div className="my-3 md:text-medium text-sm text-neutral-600">&#34;At SZhoes, we provide the perfect pair for every occasion. Enjoy fresh, innovative designs, premium comfort, and custom fits. Step out with confidence and style.&#34;</div>
                <div className="my-4 text-neutral-600 md:text-lg text-medium font-semibold">Explore Our Collection and Customize Your Fit Today!</div>
                <Button  as={Link} href="product" className="bg-green-500" radius="none">SHOP NOW</Button>
            </div>
            <Image unoptimized src={'/images/hero_section.png'} alt="Blob Background" width={0} height={0} className="w-80 hidden md:block" />
        </div>
    )
}