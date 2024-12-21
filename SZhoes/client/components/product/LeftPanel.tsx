'use client'
import { useState } from "react";
import { LeftPanelInterface } from "./interface";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Radio, RadioGroup } from "@nextui-org/radio";
import { Slider, SliderValue } from "@nextui-org/slider";
import { Tooltip } from "@nextui-org/tooltip";
import { FaList, FaRegStar, FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaPercentage } from "react-icons/fa";
import { LuBoxes } from "react-icons/lu";
import { HiColorSwatch } from "react-icons/hi";
import { IoIosPricetags } from "react-icons/io";

/**
 * The Component for the left panel of the page
 * 
 * @returns The Left panel of product container page
 */
export function LeftPanel({ isOpen, setIsOpen }: LeftPanelInterface) {
    const [star, setStar] = useState(0);
    const [value, setValue] = useState<SliderValue>([0, 10000]);
    const Colors: string[] = ["bg-red-600", "bg-stone-600", "bg-neutral-600", "bg-zinc-600", "bg-gray-600", "bg-slate-600", "bg-orange-600", "bg-amber-600", "bg-yellow-600", "bg-lime-600", "bg-green-600", "bg-emerald-600", "bg-teal-600", "bg-cyan-600", "bg-sky-600", "bg-blue-600", "bg-indigo-600", "bg-violet-600", "bg-purple-600", "bg-fuchsia-600", "bg-pink-600", "bg-rose-600"];
    const Sizes: number[] = [4, 5, 7, 8, 9, 12, 14, 16];
    const Type: string[] = ["sneaker", "sport", "wedding", "football", "office"];
    const Occasion: string[] = ["wedding", "summer", "winter", "monsoon"];
    const displayStar = () => {
        let display: React.ReactNode[] = [];
        let integerPart = Math.floor(star);
        let fractionalPart = star - integerPart;

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

    const changeIsOpen = () => {
        setIsOpen(!isOpen);
    }
    function getColorName(colorClass: string): string {
        const colorName = colorClass.replace(/^bg-/, '').replace(/-600$/, '');
        return colorName.charAt(0).toUpperCase() + colorName.slice(1);
    }


    return (
        <>
            <div className="text-3xl select-none flex m-2 sm:hidden fixed items-center" onClick={changeIsOpen}>{isOpen ? <TbLayoutSidebarLeftCollapseFilled /> : <TbLayoutSidebarLeftExpandFilled />}</div>
            {isOpen &&
                <Accordion variant="shadow" showDivider={false} className="px-0 w-4/5 md:w-1/5 py-2  flex min-h-screen flex-col gap-2 mx-2 my-10 md:my-5 min-w-40" isCompact itemClasses={{
                    base: "py-0 w-full px-0",
                    indicator: "text-green-600",
                    content: "px-4 py-10 border-y-2 border-y-neutral-300 bg-neutral-100",
                    trigger: "data-[hover=true]:bg-green-200 h-12 px-4",
                }}>
                    <AccordionItem key="1" aria-label="type" title="Type" indicator={<FaList />}>
                        <div className="flex flex-col space-y-3 text-neutral-600">
                            {Type.map((value, index) =>
                                <span key={index} className="hover:text-black hover:underline hover:underline-offset-4 capitalize">{value}</span>
                            )}
                        </div>
                    </AccordionItem>
                    <AccordionItem key="2" aria-label="Occasion" title="Occasion" indicator={<BiSolidCategoryAlt />}>
                        <div className="flex flex-col space-y-3 text-neutral-600">
                            {Occasion.map((value, index) =>
                                <span key={index} className="hover:text-black hover:underline hover:underline-offset-4 capitalize">{value}</span>
                            )}
                        </div>
                    </AccordionItem>
                    <AccordionItem key="3" aria-label="Price" title="Price" indicator={<IoIosPricetags />}>
                        <div className="flex flex-col gap-2 space-y-2 w-full h-full max-w-md items-start justify-center">
                            <RadioGroup size="md" className="mb-3">
                                <Radio value="low-to-high">Low to High</Radio>
                                <Radio value="high-to-low">High to Low</Radio>
                            </RadioGroup>
                            <Slider
                                size="sm"
                                step={100}
                                maxValue={10000}
                                minValue={0}
                                value={value}
                                onChange={setValue}
                                className="w-full"
                            />
                            <p className="text-default-500 font-medium text-small">
                                Selected budget: {Array.isArray(value) && value.map((b) => `${b}`).join(" – ")}
                            </p>
                        </div>
                    </AccordionItem>
                    <AccordionItem key="4" aria-label="Rating" title="Rating" indicator={<FaStar />}>
                        <div className="flex my-2 space-y-2 flex-col">
                            <span className="flex flex-row text-xl space-x-2 text-orange-500">{displayStar()}</span>
                            <Slider color="warning"
                                classNames={{ label: "hidden" }}
                                showTooltip
                                tooltipProps={{
                                    offset: 10,
                                    placement: "bottom",
                                    classNames: {
                                        base: ["w-10"],
                                        content: [
                                            " shadow-xl",
                                        ],
                                    },
                                }}
                                size="md"
                                label="Select rating" hideValue maxValue={5} minValue={0} showSteps={true} step={0.5} onChange={(e) => setStar(Number(e.valueOf()))} />
                        </div>
                    </AccordionItem>
                    <AccordionItem key="5" aria-label="Discount" title="Discount" indicator={<FaPercentage />}>
                        <div className="flex flex-col space-y-3 text-neutral-600">
                            <span className="hover:text-black hover:underline hover:underline-offset-4">10% or more</span>
                            <span className="hover:text-black hover:underline hover:underline-offset-4">25% or more</span>
                            <span className="hover:text-black hover:underline hover:underline-offset-4">35% or more</span>
                            <span className="hover:text-black hover:underline hover:underline-offset-4">50% or more</span>
                            <span className="hover:text-black hover:underline hover:underline-offset-4">60% or more</span>
                            <span className="hover:text-black hover:underline hover:underline-offset-4">70% or more</span>
                        </div>
                    </AccordionItem>
                    <AccordionItem key="7" aria-label="Size" title="Size" indicator={<LuBoxes />}>
                        <div className=" grid grid-flow-row grid-cols-2 items-center text-xl">
                            {Sizes.map((value, index) =>
                                <div key={index} className={`mt-4 w-20 sm:w-32 md:w-10 lg:w-24 text-center py-1 border-2 border-neutral-400 text-sm md:text-medium rounded-sm`}>IND {value}</div>
                            )}
                        </div>
                    </AccordionItem>
                    <AccordionItem key="6" aria-label="Color" title="Color" indicator={<HiColorSwatch />}>
                        <div className="grid grid-flow-row grid-cols-3">
                            {Colors.map((value, index) =>
                                <div key={index} className="border-2 ml-5 p-1.5 mt-4 w-fit border-neutral-400 rounded-md">
                                    <Tooltip key={index} placement="top" showArrow size="lg" offset={10} content={<p className="text-sm md:text-medium capitalize">{getColorName(value)}</p>}>
                                        <div className={"p-3 " + value + " rounded-full"}></div>
                                    </Tooltip>
                                </div>
                            )}
                        </div>
                    </AccordionItem>
                </Accordion>
            }
        </>
    );
}