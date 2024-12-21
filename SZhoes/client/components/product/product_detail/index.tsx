import { ProductMapComp } from "@/components/utility/product";
import { FeedbackInterface, ProductInterface } from "../interface";
import { FeedbackData, ProductData } from "./api";
import { Description } from "./Description";
import { ImageContainer } from "./ImageContainer";
import { Review } from "./Review";

/**
 * The components that is used as a wrapper for the product detail
 * 
 * @returns Product Detail Page
 */
export function ProductDetailComp() {
    const Images: string[] = ["/temp/image-1.png", "/temp/image-3.png", "/images/hero_section.png", "/images/image-4.png", "/temp/image-1.png", "/temp/image-3.png", "/images/hero_section.png", "/images/image-4.png",]
    const FeedbackStar: FeedbackInterface[] = FeedbackData();
    const products: ProductInterface[] = ProductData();

    return (
        <>
            <ImageContainer />
            <Description />
            <Review rate={4.5} total={200} feedback={FeedbackStar} reviewImages={Images} />
            <ProductMapComp products={products} title="Recommended" />
            <ProductMapComp products={products} title="inspired by your browsing history" />
        </>
    )
}