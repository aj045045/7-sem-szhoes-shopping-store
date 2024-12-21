import { DataCard } from "@/components/utility/admin/DataCard";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { FaRegUser } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";

export function Summary({ summaryList, customer }: { summaryList: string[], customer: string }) {

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex justify-between w-full">
            <DataCard title="No. of Customer" value={customer} icon={<FaRegUser />} />
            <div className="fixed top-1/3 z-10 right-0">
                <Dropdown placement="left">
                    <DropdownTrigger>
                        <div className="h-fit rounded-s-lg py-2 space-y-2 border-1 border-neutral-600/50 w-fit text-xl bg-neutral-200/50 text-neutral-900">
                            <HiOutlineDotsVertical />
                            <HiOutlineDotsVertical />
                            <HiOutlineDotsVertical />
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu>
                        {summaryList.map((item, key) => (
                            <DropdownItem endContent={<FaLink/>} classNames={{ base: "capitalize" }} key={key} onClick={() => scrollToSection(item.toLowerCase().replace(/ /g, '-'))}>
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}
