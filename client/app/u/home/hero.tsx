'use client'
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import { comforterBrush, courgette, montserratSubrayada } from "@/langs";
import { useEffect, useState, useMemo } from "react";

/**
 * The component that is used for the hero section of the home page
 * 
 * @returns Hero section
 */
export function HeroPage() {
    const [index, setIndex] = useState<number>(0);
    const data: string[] = useMemo(() => [
        "Smell the difference with SZ...",
        "Discover Comfort, Style, and Freshness",
        "SZhoes - Shoes That Keep You Fresh!",
        "Where comfort meets style...",
        "Explore our collection and step into your perfect pair..."
    ], []);

    // REVIEW - Change title every 2 sec 
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % data.length;
                return nextIndex;
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [data]);

    return (
        <div className="select-none  bg-green-200/80 md:flex-row w-full items-center md:grid-flow-col md:grid-cols-3 md:grid py-5 h-min border-b-2 border-b-neutral-300">
            <div className="items-center md:items-start flex flex-col text-justify  md:col-span-2 mx-10">
                <div className="text-2xl font-medium  cursor-text">
                    <div className="flex flex-row items-center font-semibold space-x-2 mb-2">
                        <span>Welcome to</span>
                        <div className="flex flex-row items-end">
                            <div className={`${montserratSubrayada.className} text-4xl lg:text-3xl`}>S</div>
                            <div className={`${comforterBrush.className} text-green-600 text-4xl lg:text-3xl`}>Z</div>
                            <div className={`${montserratSubrayada.className} ml-2 text-3xl lg:text-2xl`}>hoes</div>,
                        </div>
                    </div>
                    <div className={`${courgette.className} text-4xl`}>{data[index]}</div>
                </div>
                <div className="my-3 md:text-medium text-sm text-neutral-600">&#34;At SZhoes, we provide the perfect pair for every occasion. Enjoy fresh, innovative designs, premium comfort, and custom fits. Step out with confidence and style.&#34;</div>
                <div className="my-4 text-neutral-600 md:text-lg text-medium font-semibold">Explore Our Collection and Customize Your Fit Today!</div>
                <Button as={Link} href="product" className="bg-green-500" radius="none">SHOP NOW</Button>
            </div>
            <Image priority={true} unoptimized src={'/images/hero_section.png'} alt="Blob Background" width={0} height={0} className="w-80 hidden md:block" />
        </div>
    );
}
