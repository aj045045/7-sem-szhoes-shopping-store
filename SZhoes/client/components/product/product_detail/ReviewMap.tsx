import { ReviewDetail } from "./ReviewDetail";
import { SeeMoreReview } from "./SeeMoreReview";

/**
 * The component that is used for the wrapper of the images
 * 
 * @param rate - The rate of the product
 * @param reviewImages - The list of image used for product review
 * @returns The Review Images
 */
export function ReviewMap({ rate, reviewImages }: { rate: number, reviewImages: any }) {

    return (
        <div className="space-y-4 mt-5 mb-10 ">
            <ReviewDetail rate={rate} reviewImages={reviewImages} />
            <ReviewDetail rate={rate} reviewImages={reviewImages} />
            <SeeMoreReview />
        </div>
    )
}


