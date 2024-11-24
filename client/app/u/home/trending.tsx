import { montserratSubrayada } from "@/langs";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

/**
 * The component that is used to send the trending page to the user
 * 
 * @returns The trending page
 */
export function TrendingPage() {
    return (
        <div className="w-11/12 mx-auto rounded-sm shadow-lg shadow-neutral-300 bg-white">
            <div className={`${montserratSubrayada.className} text-2xl ml-10 [word-spacing:15px] pt-2`}>Trending</div>
            <div className="flex flex-col items-center">
                <Image priority={true} src="/images/hero_section.png" alt="Trending Image" className="object-fill w-1/3" width={0} height={0} unoptimized />
                <div className="md:text-5xl text-3xl uppercase font-bold my-5">walk in freshness</div>
                <p className="text-center lg:mx-40 mx-10 md:mx-20 mb-5 text-neutral-600 md:text-md text-sm">Our shoes not only elevate your look but also provide unmatched comfort. From elegant designs to durable craftsmanship, we have something for everyone. Whether it&rsquo;s a casual day out or a formal event, SZhoes has you covered.</p>
                <Button as={Link} href="#" className="bg-green-500 mb-5" radius="none">SHOP NOW</Button>
            </div>
        </div>
    )
}