'use client'
import { montserrat_Subrayada } from "@/langs";
import { useEffect, useRef, useState } from "react";
import { FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { ImageSize } from "./ImageSize";
import { ReviewMap } from "./ReviewMap";
import { AddReview } from "./AddReview";
import { Progress } from "@nextui-org/progress";
import { ProductReviewInterface } from "../interface";

/**
 * The component that is used to provide the detail review of the product
 * 
 * @param rate - The Rate of the product review
 * @param total - The total number of review
 * @param feedback - The feedback of the the text
 * @param reviewImages - List of Images
 * @returns The Review detail of the product
 */
export function Review({ rate, total, feedback, reviewImages }: ProductReviewInterface) {
    const displayStar = () => {
        let display: React.ReactNode[] = [];
        let integerPart = Math.floor(rate);
        let fractionalPart = rate - integerPart;

        for (let i = 0; i < 5; i++) {
            if (i < integerPart) {
                display.push(<FaStar key={i} />);
            } else if (fractionalPart >= 0.5) {
                display.push(<FaStarHalfStroke key={i} />);
                fractionalPart = 0;
            } else {
                display.push(<FaRegStar key={i} />);
            }
        }
        return display;
    };
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    const scrollLeft = () => {
        if (isAutoScrolling) {
            setIsAutoScrolling(false);
        }
        if (scrollContainerRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
            if (scrollLeft === 0) {
                scrollContainerRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
            }
        }
    };

    const scrollRight = () => {
        if (isAutoScrolling) {
            setIsAutoScrolling(false);
        }
        if (scrollContainerRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
            if (scrollLeft + clientWidth >= scrollWidth) {
                scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
            }
        }
    };

    useEffect(() => {
        if (isAutoScrolling) {
            const interval = setInterval(() => {
                if (scrollContainerRef.current) {
                    const { scrollWidth, clientWidth, scrollLeft } = scrollContainerRef.current;
                    if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
                        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
                    }
                }
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isAutoScrolling]);
    return (
        <div className="w-full flex md:flex-row flex-col my-10">
            <div className="md:w-1/4 w-60 mx-auto md:mx-5">
                <span className={`${montserrat_Subrayada.className} md:text-2xl text-xl`}>Customer Review</span>
                <div className="flex flex-row items-center space-x-3 text-lg mt-2">
                    <span className="flex flex-row text-orange-500 text-xl space-x-1">
                        {displayStar()}
                    </span>
                    <span>
                        {rate} out of 5
                    </span>
                </div>
                <span className=" text-neutral-500">{total} global ratings</span>
                <div className="my-5">
                    {feedback.map((value: any, index: number) =>
                        <Progress key={index} classNames={{
                            base: "max-w-md mb-2",
                            track: "drop-shadow-md border border-neutral-400",
                            indicator: "bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500",
                            label: "tracking-wider font-medium text-default-600",
                            value: "text-foreground/60",
                        }}
                            label={`${value.key} Star`}
                            showValueLabel
                            value={value.value} />
                    )}
                </div>
                <AddReview />
            </div>
            <div className="md:w-3/4 w-full mx-auto md:mx-0 space-y-10">
                <div className="relative space-y-3">
                    <span className={`${montserrat_Subrayada.className} text-medium md:text-lg ml-5 md:ml-0`}>Satisfied Customer</span>
                    <div ref={scrollContainerRef} className="w-full space-x-4 overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth px-10 flex flex-row">
                        {reviewImages.map((product: string, index: number) => (
                            <ImageSize img={product} key={index} size={60} />
                        ))}
                    </div>
                    <button className="absolute left-0  transform -translate-y-60 bg-neutral-700 shadow-md shadow-neutral-500 text-white text-xl px-1.5  rounded-r-md h-52" onClick={scrollLeft}>
                        &#10094;
                    </button>
                    <button className="absolute right-0 transform -translate-y-60 bg-neutral-700 text-white px-1 text-xl rounded-l-md h-52 shadow-md shadow-neutral-500" onClick={scrollRight}>
                        &#10095;
                    </button>
                </div>
                <div className="ml-5 md:ml-0">
                    <span className={`${montserrat_Subrayada.className} text-medium md:text-lg `}>Top Reviews</span>
                    <ReviewMap rate={4.5} reviewImages={reviewImages} />
                </div>
            </div>
        </div>
    )
}