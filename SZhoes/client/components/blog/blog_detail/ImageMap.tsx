import Image from "next/image";

/**
 * The component that is used to display the images for blog
 * 
 * @param DetailImages - A array of string contain list of image to be displayed in the blogs
 * @returns Images in a column for the rending
 */
export function ImageMap({ DetailImages }: { DetailImages: string[]; }) {
    return (
        <div className="space-y-8 flex flex-col items-center justify-center py-5">
            {DetailImages.map((image, index) =>
                index != 0 && <Image className="w-11/12 max-h-screen object-contain bg-white rounded-md shadow-md" unoptimized key={index} src={image} alt={`img-index`} width={0} height={0} />
            )}
        </div>
    )
}