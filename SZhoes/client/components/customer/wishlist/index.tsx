'use client'
import { ImageMap } from "./ImageMap";

export function WishlistComp() {
    const numbers = Array.from({ length: 5 }, (_, index) => index + 1);
    return (
        <div className="mx-auto">
            <div className="text-neutral-500 mb-5">5 products</div>
            <div className="md:space-y-10 space-y-5">
                {numbers.map((index) =>
                    <ImageMap key={index} />
                )}
            </div>
        </div>
    )
}