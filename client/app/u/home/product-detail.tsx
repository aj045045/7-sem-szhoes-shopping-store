import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";

/**
 * The component that is used to send the product detail for home page
 * 
 * @returns Product detail hero section
 */
export function ProductFeaturePage() {
    const CheckBoxMap: string[] = ["Comfort", "Freshness", "Innovative Designs", "Premium Materials", "Customization", "Durability", "Style"];

    return (<div>
        <div className="grid grid-flow-row md:grid-cols-2 grid-cols-1 items-center my-10">
            <div className="flex flex-col space-y-1 bg-white w-1/2 min-w-40 mx-auto rounded-md md:p-10 p-5 overflow-hidden md:shadow-lg shadow-md shadow-neutral-300">
                <span className="justify-center flex text-lg md:text-2xl font-semibold">Product Detail</span>
                {CheckBoxMap.map((item, index) =>
                    <Checkbox isSelected={true} key={index} size="md" radius="sm" color="success" >{item}</Checkbox>
                )}
            </div>
            <Image priority={true} unoptimized src={`/images/image-4.png`} alt="Shoes Image" width={0} height={0} className="md:w-3/5 hidden md:block" />
        </div>
        <div className="grid grid-flow-row grid-cols-2 my-5">
            <span className="flex justify-end md:mr-10 md:text-2xl text-xl mr-5">Explore Our Collection Today!</span>
            <span className="text-xs md:text-sm [word-spacing:3px] tracking-wide text-justify mr-5 flex flex-col">Step into a world where comfort meets style with SZhoes. Our shoes not only elevate your look but also provide unmatched comfort. From elegant designs to durable craftsmanship, we have something for everyone. Whether it&rsquo;s a casual day out or a formal event, SZhoes has you covered. <span className="underline underline-offset-2">Smell the Difference with SZhoes - Experience the refreshing scent in every shoe.</span> Discover your perfect pair today!</span>
        </div>
    </div>
    )
}