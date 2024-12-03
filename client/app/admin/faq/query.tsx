'use client'
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionItem, Chip, Input, Kbd, Pagination } from "@nextui-org/react";
import { FaLink } from "react-icons/fa6";
import { comforterBrush, montserratSubrayada } from "@/langs";
import { IoSearchSharp } from "react-icons/io5";
import { MarkdownConverterUtil } from "@/utility/other/markdown-converter";
import { AddFaqPage } from "./add-faq";
import { IoMdAdd } from "react-icons/io";

export function QueryApp() {
    const defaultContent = `## Lorem ipsum dolor 
    - sit amet, consectetur adipiscing elit, 
    - sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isAdd, setIsAdd] = useState(false);

    const handleSearch = () => {
        alert("Search initiated for:" + inputValue);
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="w-full flex flex-col items-center space-y-5">
            <Chip classNames={{ base: "bg-teal-200 text-teal-900" }}>FREQUENTLY ASK QUESTIONS</Chip>
            <div><span className={`${montserratSubrayada.className} text-4xl`}>You <span className={`${comforterBrush.className} text-5xl mr-5`}>ask?</span> We</span> <span className={`${comforterBrush.className} text-5xl`}>answer</span></div>
            <div className="w-2/3 flex flex-col ">
                <div className="flex space-x-2 items-center">
                    <Input
                        ref={searchInputRef} // Set the ref to the input field
                        startContent={<IoSearchSharp />}
                        endContent={<Kbd keys={["ctrl"]}>K</Kbd>}
                        variant="faded"
                        size="lg"
                        onChange={() => setInputValue(searchInputRef.current?.value || "")}
                        classNames={{ inputWrapper: "border-neutral-300" }}
                        placeholder="Search..."
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />

                    <IoMdAdd onClick={() => setIsAdd(!isAdd)} className="bg-green-500 text-green-950 block p-0.5 text-4xl rounded-md" />

                </div>
                {isAdd && <AddFaqPage />}
                <span className={`${inputValue.length > 3 ? "block" : "text-transparent"} text-sm text-red-600 mt-2`}>Please press the Enter key in order to submit your query and initiate the search process.</span>
            </div>
            <Accordion variant="shadow" className="w-2/3">
                <AccordionItem key="1" indicator={<FaLink />} aria-label="Accordion 1" title="Accordion 1">
                    <MarkdownConverterUtil markdownString={defaultContent} />
                </AccordionItem>
                <AccordionItem key="2" indicator={<FaLink />} aria-label="Accordion 2" title="Accordion 2">
                    <MarkdownConverterUtil markdownString={defaultContent} />
                </AccordionItem>
                <AccordionItem key="3" indicator={<FaLink />} aria-label="Accordion 3" title="Accordion 3">
                    <MarkdownConverterUtil markdownString={defaultContent} />
                </AccordionItem>
                <AccordionItem key="4" indicator={<FaLink />} aria-label="Accordion 4" title="Accordion 4">
                    <MarkdownConverterUtil markdownString={defaultContent} />
                </AccordionItem>
            </Accordion>
            <Pagination classNames={{ wrapper: "mx-auto" }} size="lg" isCompact loop showControls color="success" total={10} initialPage={1} />
        </div>
    );
}
