'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import type { NextPage } from 'next'
import Image from "next/image";
import { useGetHook } from "@/hooks";
import { MarkDownConverterComp } from "@/components/utility/MarkdownConverter";


const images = [
    "/temp/image-1.png",
    "/images/hero_section.png",
    "/temp/image-3.png",
    "/images/image-4.png",
];
interface Datum {
    id: string;
    user_name: string;
    full_name: string;
    email_id: string;
    password: string;
    logged_in: string;
    last_logged_in: string;
    user_type: number;
}

const Home: NextPage = () => {
    return <>
        <Carousel images={images} />
        <span>Products</span>
    </>
}

export default Home;

function Carousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [markdown, setMarkdown] = useState("# Hello World");
    // const { fetchData, data, status } = useGetHook<Datum>("/s/user");
    const prevSlide = () => {
        // fetchData();
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [setCurrentIndex, images.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 2000);
        return () => clearInterval(interval);
    }, [nextSlide]);
    return (
        <>
            <div className="p-10 space-x-3 grid grid-flow-row grid-cols-2">
                <textarea cols={30} rows={10} value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="p-3"></textarea>
                <MarkDownConverterComp markdownString={markdown} />
            </div>
            <div className="relative w-full mx-auto">
                <div className="overflow-hidden relative h-64">
                    {images.map((image, index) => (
                        <div key={index} className={`absolute inset-0  ${index === currentIndex ? "translate-x-0" : "translate-x-full"}`}>
                            <Image unoptimized src={image} alt={`Slide ${index}`} width={20} height={20} className="w-80 h-full object-cover mx-auto" />
                        </div>
                    ))}
                </div>
                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                    onClick={prevSlide}
                >
                    &#10094;
                </button>
                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
                    onClick={nextSlide}
                >
                    &#10095;
                </button>
            </div>
        </>
    );
};