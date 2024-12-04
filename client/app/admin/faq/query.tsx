'use client'
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionItem, Chip, Input, Kbd, Pagination } from "@nextui-org/react";
import { FaLink } from "react-icons/fa6";
import { comforterBrush, montserratSubrayada } from "@/langs";
import { IoSearchSharp } from "react-icons/io5";
import { MarkdownConverterUtil } from "@/utility/other/markdown-converter";
import { AddFaqPage } from "./add-faq";
import { IoMdAdd } from "react-icons/io";
import useSWR from "swr";
import { DataCardUtil } from "@/utility/admin/data-card-util";
import { FaQuestion } from "react-icons/fa";
import { FaqSWRInterface } from "@/interfaces/faq";

export function QueryApp() {

    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState("");
    const [isAdd, setIsAdd] = useState(false);
    const [page, setPage] = useState(1);
    const { data, isLoading } = useSWR<FaqSWRInterface>(`/s/admin/faq?page=${page}`);

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

    useEffect(() => console.log(data), [data]);
    if (isLoading) return <>Loading...</>;
    return (
        <>
            <DataCardUtil title="Total FAQs" value={data?.total_faqs || "0"} icon={<FaQuestion />} />
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
                {data?.faqs && <Accordion variant="shadow" className="w-2/3">
                    {data?.faqs.map((item, index: number) => (
                        <AccordionItem key={index} indicator={<FaLink />} aria-label={item.question} title={item.question}>
                            <MarkdownConverterUtil markdownString={item.answer} />
                        </AccordionItem>
                    ))}
                </Accordion>
                }
                {data?.page &&
                    <Pagination classNames={{ wrapper: "mx-auto" }} size="lg" isCompact loop showControls color="success" total={data?.total_pages}
                        onChange={setPage}
                        page={page}
                    />
                }
            </div>
        </>
    );
}
