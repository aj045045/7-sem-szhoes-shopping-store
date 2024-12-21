import { montserrat_Subrayada } from "@/langs";
import Image from "next/image";

/**
 * The component that is used for the Heading in the Blog Detail Page
 * 
 * @param image - The image for the blog container
 * @returns The Image Card Component with a summary
 */
export function Title({ image }: { image: string }) {
    return (
        <>
            <div className="w-4/5 mx-auto">
                <div className="my-2">
                    <span className="bg-teal-200 border-2 border-teal-500 px-2 py-1 rounded-full md:text-medium text-sm">Men</span>
                </div>
                <span className="text-lg md:text-xl">
                    July 19, 2024
                </span>
                <p className="text-4xl md:text-6xl md:text-justify "> Great Athletes Remind the World There&apos;s Nothing Wrong With Wanting to Win</p>
            </div>
            <div className="flex md:flex-row flex-col w-full px-5">
                <Image className="w-full p-10 h-screen object-contain" unoptimized src={image} alt="blog image" width={0} height={0} />
                <div className="md:w-1/3 w-full">
                    <span className={`${montserrat_Subrayada.className} text-2xl`}>Summary</span>
                    <p className="text-justify">
                    The Ultimate Guide to Choosing the Perfect Shoes emphasizes the importance of selecting the right footwear for comfort, style, and durability. It covers various types of shoes, including athletic shoes for fitness enthusiasts, casual sneakers for everyday wear, dress shoes for formal occasions, boots for colder weather, and sandals for warm climates. 

Key considerations when buying shoes include comfort, fit, purpose, quality, and style. The guide recommends specific shoes for different uses: Nike Air Zoom Pegasus and Adidas Ultraboost for athletic purposes; Converse Chuck Taylor and Vans Old Skool for casual wear; Clarks Tilden Cap and Allen Edmonds Park Avenue for formal events; Timberland Waterproof Boots and UGG Classic Short II for winter; and Birkenstock Arizona and Teva Original Universal for summer.

Overall, the right shoes can enhance daily experiences, making it essential to prioritize comfort and fit. Readers are encouraged to share their favorite shoe brands and experiences. Happy shoe shopping!
                    </p>
                </div>
            </div>
        </>
    )
}