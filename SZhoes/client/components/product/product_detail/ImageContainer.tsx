'use client'
import { Checkbox } from "@nextui-org/checkbox";
import { Tooltip } from "@nextui-org/tooltip";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiRupee } from "react-icons/bi";
import { FaBookmark, FaRegBookmark, FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaPercentage } from "react-icons/fa";
import confetti from 'canvas-confetti';
import { montserrat_Subrayada } from "@/langs";

/**
 * The component that is used to display the images and select the color and size of the product
 * 
 * @returns Image Hero container
 */
export function ImageContainer() {
    const Images: string[] = ["/temp/image-1.png", "/temp/image-3.png", "/images/hero_section.png", "/images/image-4.png", "/temp/image-1.png", "/temp/image-3.png", "/images/hero_section.png", "/images/image-4.png",]
    const Sizes: number[] = [4, 5, 7, 8, 9, 12, 14, 16];
    const Colors: string[] = ["bg-red-600", "bg-stone-600", "bg-neutral-600", "bg-zinc-600", "bg-gray-600", "bg-slate-600", "bg-orange-600", "bg-amber-600", "bg-yellow-600", "bg-lime-600", "bg-green-600", "bg-emerald-600", "bg-teal-600", "bg-cyan-600", "bg-sky-600", "bg-blue-600", "bg-indigo-600", "bg-violet-600", "bg-purple-600", "bg-fuchsia-600", "bg-pink-600", "bg-rose-600"];
    const [image, setImage] = useState(Images[0]);
    const [isBookmark, setIsBookmark] = useState(false);
    const rate = 3.5;
    useEffect(() => {
        const end = Date.now() + (2 * 1000);
        const colors = ["#ea580c", "#f8fafc", "#dc2626", "#2563eb", "#ca8a04", "#7c3aed"];
        function frame() {
            confetti({
                particleCount: 6,
                angle: 60,
                spread: 60,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 6,
                angle: 120,
                spread: 60,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }
        if (isBookmark) {
            frame();
            return () => { };
        }
    }, [isBookmark]);

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

    const nextImage = () => {
        let img = 0;
        for (let i = 0; i < Images.length; i++) {
            if (image === Images[Images.length - 1]) {
                img = 0;
            }
            else if (Images[i] === image) {
                img = i + 1;
                break;
            }
        }
        setImage(Images[img]);
    }
    const prevImage = () => {
        let img = 0;
        for (let i = 0; i < Images.length; i++) {
            if (image === Images[0]) {
                img = Images.length - 1;
            }
            else if (Images[i] === image) {
                img = i - 1;
                break;
            }
        }
        setImage(Images[img]);
    }


    interface ProductDescriptionProps {
        [key: string]: string;
    }

    const ProductDescription: ProductDescriptionProps[] = [
        { "Item Weight": " 900 g" },
        { "Net Quantity": " 1 Pair" },
        { "Generic Name": " Sneaker" },
    ]

    function getColorName(colorClass: string): string {
        const colorName = colorClass.replace(/^bg-/, '').replace(/-600$/, '');
        return colorName.charAt(0).toUpperCase() + colorName.slice(1);
    }


    return (<>
        <div className="flex flex-col md:flex-row md:relative md:space-x-4 w-full">
            <div className="flex md:flex-row flex-col md:sticky top-0 md:h-screen h-fit items-center md:w-1/2 w-full select-none">
                <div className="space-y-3  pb-5 mx-5 h-3/4 hidden md:block overflow-y-auto scrollbar-hide">
                    {Images.map((img, index) =>
                        <Image key={index} className="w-20 bg-white rounded-xl shadow-lg" unoptimized alt="Product-1" src={img} width={0} onMouseEnter={() => setImage(img)} height={0} />
                    )}
                </div>
                <div className="w-full justify-center items-center px-2 space-y-4 mt-5 md:mt-0">
                    <div onClick={() => setIsBookmark(!isBookmark)}>
                        {isBookmark ? <FaBookmark className="text-3xl text-neutral-600 right-0 absolute" /> : <FaRegBookmark className="text-3xl text-neutral-600  right-0 absolute" />}
                    </div>
                    <Image className="w-5/6 mx-auto" unoptimized alt="Product-1" src={image} width={0} height={0} />
                    <div className="relative w-full">
                        <button className="absolute left-0 w-fit md:left-auto md:right-14 md:text-xl text-lg bg-neutral-400 rounded-full md:px-3 md:py-2 px-2.5 py-1" onClick={prevImage}>
                            &#10094;
                        </button>
                        <button className="absolute  right-0  md:text-xl text-lg bg-neutral-400 rounded-full md:px-3 md:py-2 px-2.5 py-1" onClick={nextImage}>
                            &#10095;
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-10 md:mt-0 md:w-1/2 w-full">
                <div className="overflow-y-auto h-full flex-1 p-4 md:ml-20 ml-0">
                    <div className="my-3 space-x-3 flex flex-row select-none">
                        <div className="rounded-full px-2 py-1 border-2 text-sm md:text-medium border-teal-400 bg-teal-100 capitalize w-fit">men</div>
                        <div className="rounded-full px-2 py-1 border-2  md:text-medium text-sm border-teal-400 bg-teal-100 capitalize w-fit">summer</div>
                    </div>
                    <div className="text-neutral-500 md:text-xl text-lg my-2">Release, Mon Jul 08 2024</div>
                    <div className="md:text-4xl text-3xl">Nike Pegasus 41 Blueprint</div>
                    <div className="text-lg md:text-xl mt-2">Men Road Running Shoes</div>
                    {
                        10 <= 10 ? <div className="md:text-medium text-sm  underline underline-offset-4 mt-2 font-mono font-bold text-red-600">5 left in stock</div> : <div className="md:text-medium text-sm  underline underline-offset-4 mt-2 font-mono font-bold">In stock</div>
                    }
                    <div className="flex flex-row space-x-4 text-lg items-end mt-5">
                        <span className="flex flex-row items-end">
                            <span className="md:text-medium text-sm">
                                MRP&#160;&#58;
                            </span>
                            <span className="flex flex-row underline text-2xl md:text-3xl items-center">
                                <BiRupee />10,800
                            </span>
                        </span>
                        <span className="line-through flex text-sm md:text-lg flex-row items-center">
                            <BiRupee />12,000
                        </span>
                        <span className="flex flex-row items-center bg-red-200 text-red-600 text-sm md:text-lg rounded-md px-2 border-2 border-red-300 ">
                            10<FaPercentage />
                        </span>
                    </div>
                    <div className="text-xs md:text-sm text-neutral-500">Incl. of taxes</div>
                    <div className="text-xs md:text-sm text-neutral-500">(Also included all applicable duties)</div>
                    <div className="flex flex-col space-y-1 mt-4">
                        <span className="text-sm md:text-medium">Avg. Rating</span>
                        <div className="flex flex-row space-x-3 items-center">
                            <span className="text-sm md:text-lg">{rate}</span>
                            <span className='flex flex-row text-lg md:text-xl space-x-1 md:space-x-2 text-orange-500 mb-1'>{displayStar()}</span>
                            <span className="text-blue-600 text-sm md:text-medium underline underline-offset-4">14 Reviews</span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className={`${montserrat_Subrayada.className} text-lg md:text-xl [word-spacing:5px]`}>Select Color</div>
                        <div className="grid grid-flow-row grid-cols-5">
                            {Colors.map((value, index) =>
                                <div key={index} className="border-2 ml-5 p-1.5 mt-4 w-fit border-neutral-400 rounded-md">
                                    <Tooltip key={index} placement="top" showArrow size="lg" offset={10} content={<p className="text-sm md:text-medium capitalize">{getColorName(value)}</p>}>
                                        <div className={"p-3 " + value + " rounded-full"}></div>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-10">
                        <div className={`${montserrat_Subrayada.className} text-lg  md:text-xl [word-spacing:5px]`}>Select Size</div>
                        <div className=" grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center text-xl">
                            {Sizes.map((value, index) =>
                                <div key={index} className={`ml-5 mt-4 w-20 md:2-24 lg:w-28 text-center py-1 border-2 border-neutral-400 text-sm md:text-medium rounded-sm`}>IND {value}</div>
                            )}
                        </div>
                    </div>
                    <div className="my-8 mr-5 space-y-2 text-justify">
                        <div className={`${montserrat_Subrayada.className} text-lg md:text-xl [word-spacing:5px]`}>Product Details</div>
                        <div className="[word-spacing:5px] tracking-wide leading-7 text-sm md:text-medium">
                            <div className="flex flex-col space-y-1 w-full min-w-40 mx-auto rounded-md pt-2 overflow-hidden shadow-neutral-300">
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
                        </div>
                    </div>
                    <Accordion variant="splitted">
                        <AccordionItem key="1" aria-label="About this item" classNames={{ content: "text-sm md:text-medium [word-spacing:5px] tracking-wide leading-7", title: "text-lg md:text-xl" }} title="About this item">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus. Mauris quis diam velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </AccordionItem>
                    </Accordion>
                    <div className="flex flex-col space-y-5 my-10 w-full items-center">
                        <Button className="bg-teal-500 w-full" radius="full" size="lg">Add to Cart</Button>
                        <Button className="bg-green-500 w-full" radius="full" size="lg">Buy Now</Button>
                    </div>
                </div>
            </div>
        </div >
    </>);
}


