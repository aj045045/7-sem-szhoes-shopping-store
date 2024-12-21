import { Checkbox } from "@nextui-org/checkbox";
import Image from "next/image";
import { montserrat_Subrayada } from "@/langs";
import { ProductDescriptionInterface } from "../interface";
import { DescriptionData } from "./api";

/**
 * The component that is used to display the detail description of the user
 * 
 * @returns The Description of the product
 */
export function Description() {
    const cleanDescriptionData = DescriptionData().map(item => {
        let cleanedItem: ProductDescriptionInterface = {};
        for (const key in item) {
            cleanedItem[key] = (item as Record<string, string | undefined>)[key] || '';
        }
        return cleanedItem;
    });
    const ProductDescription: ProductDescriptionInterface[] = cleanDescriptionData;
    const DetailImages: string[] = ["/temp/image-1.png", "/temp/image-3.png", "/images/hero_section.png", "/images/image-4.png", "/temp/image-1.png",];

    return (<>
        <div>
            <div className="flex flex-col space-y-1 w-11/12 min-w-40 mt-5 mx-auto rounded-md md:p-10 p-5 overflow-hidden shadow-neutral-300">
                <span className={`justify-center flex text-lg md:text-xl font-semibold mb-2 ${montserrat_Subrayada.className} [word-spacing:5px]`}>Product Description</span>
                {ProductDescription.map((item, index) =>
                    <Checkbox isSelected={true} key={index} size="md" radius="sm" color="success" >
                        {Object.entries(item).map(([key, value]) => (
                            <span key={key} className="space-x-2 flex-row">
                                <span className="font-semibold tracking-wide text-sm md:text-medium">{key}:</span>
                                <span className="text-sm md:text-medium">{value}</span>
                            </span>
                        ))}
                    </Checkbox>
                )}
            </div>
            <div className="space-y-8 flex flex-col items-center justify-center">
                {DetailImages.map((image, index) =>
                    <Image className="w-11/12 max-h-screen object-contain bg-white rounded-md shadow-md" unoptimized key={index} src={image} alt={`img-index`} width={0} height={0} />
                )}
            </div>

        </div>
    </>)
}