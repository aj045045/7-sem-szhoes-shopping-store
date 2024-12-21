'use client'
import { UserProfile } from "@/components/customer/profile/interface";
import { useGetHook } from "@/hooks";
import { comforter_Brush, montserrat_Subrayada } from "@/langs";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiPurchaseTag } from "react-icons/bi";
import { BsDiagram3Fill } from "react-icons/bs";
import { FaPercentage, FaRegEdit, FaRegQuestionCircle, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { FaCheck, FaIndustry, FaMoneyBillTrendUp, FaPersonShelter, FaRegMessage, } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { GiExpense, GiMaterialsScience, GiPayMoney } from "react-icons/gi";
import { IoMdChatbubbles } from "react-icons/io";
import { IoBookmarksOutline, IoPersonCircleOutline } from "react-icons/io5";
import { LuLayoutDashboard, LuLogOut, LuWarehouse } from "react-icons/lu";
import { MdAttachMoney, MdOutlineCategory, MdOutlineFeedback, MdOutlineInventory2, MdOutlineLockPerson, MdPrecisionManufacturing } from "react-icons/md";
import { PiBroadcastFill } from "react-icons/pi";
import { RiContactsBook3Line, RiProductHuntLine } from "react-icons/ri";
import { TbUserHexagon } from "react-icons/tb";
import { TiArrowBackOutline } from "react-icons/ti";

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data, fetchData, status } = useGetHook<UserProfile>("/s/customer");
    useEffect(() => {
        if (!status) {
            fetchData();
        }
    }, [fetchData, status]);
    const { fetchData: logOutFetchData } = useGetHook<boolean>("/s/customer/logout");
    const router = useRouter();
    const path = usePathname();
    const [isDisplay, setIsDisplay] = useState(false);
    interface MenuProps {
        link: string;
        icon: React.ReactNode;
        data: string;
    }
    const logOutAdmin = () => {
        logOutFetchData();
        localStorage.removeItem("token");
        router.push('/login');
    }
    const MenuMap: MenuProps[] = [
        { link: "/", data: "dashboard", icon: <LuLayoutDashboard /> },
        // { link: "profile", data: "profile", icon: <MdOutlineLockPerson /> },
        // { link: "role", data: "role", icon: <TbUserHexagon /> },
        { link: "customer", data: "customer", icon: <FaRegUserCircle /> },
        // { link: "order", data: "order", icon: <FiShoppingCart /> },
        { link: "product", data: "product", icon: <RiProductHuntLine /> },
        // { link: "discount", data: "discount", icon: <FaPercentage /> },
        // { link: "review", data: "review", icon: <FaRegEdit /> },
        // { link: "return", data: "return", icon: <TiArrowBackOutline /> },
        // { link: "blog", data: "blog", icon: <PiBroadcastFill /> },
        // { link: "faq", data: "FAQ", icon: <FaRegQuestionCircle /> },
        { link: "category", data: "Category", icon: <MdOutlineCategory /> },
        { link: "feedback", data: "Feedback", icon: <MdOutlineFeedback /> },

        // ERP Implementation

        // { link: "inventory", data: "Inventory", icon: <MdOutlineInventory2 /> },
        // { link: "chat", data: "Chat", icon: <IoMdChatbubbles /> },
        // { link: "cart", data: "Cart", icon: <FaShoppingCart /> },
        // { link: "wishlist", data: "Wishlist", icon: <IoBookmarksOutline /> },
        // { link: "supplier", data: "Supplier", icon: <FaIndustry /> },
        // { link: "purchase", data: "Purchase", icon: <BiPurchaseTag /> },
        // { link: "material", data: "Material", icon: <GiMaterialsScience /> },
        // { link: "warehouse", data: "Warehouse", icon: <LuWarehouse /> },
        // { link: "sales", data: "Sales", icon: <FaMoneyBillTrendUp /> },
        // { link: "manufacturing", data: "Manufacturing", icon: <MdPrecisionManufacturing /> },
        // { link: "employee", data: "Employee", icon: <IoPersonCircleOutline /> },
        // { link: "attendance", data: "Attendance", icon: <FaCheck /> },
        // { link: "department", data: "Department", icon: <BsDiagram3Fill /> },
        // { link: "payroll", data: "Payroll", icon: <GiPayMoney /> },
        // { link: "income", data: "Income", icon: <MdAttachMoney /> },
        // { link: "expenses", data: "Expenses", icon: <GiExpense /> },
        // { link: "seller", data: "Seller", icon: <FaPersonShelter /> },
        // { link: "contact", data: "Contact", icon: <RiContactsBook3Line /> },
    ];


    const sortedMenuMap = MenuMap.sort((a, b) => a.data.localeCompare(b.data));
    return (
        <div className="w-full min-h-screen  flex flex-row">
            <div className={`${isDisplay ? "w-52" : "w-16"} bg-white px-2 ml-2 select-none py-2 rounded-lg shadow-xl sticky top-0 h-screen transition-width ease-in duration-300`}>
                <div className="flex flex-row items-center rounded-t-md mb-2" onClick={() => setIsDisplay(!isDisplay)}>
                    {isDisplay ? (
                        <>
                            <div className="flex items-end bg-green-100 rounded-full p-2 border-2 border-green-300">
                                <div className={`${montserrat_Subrayada.className} text-2xl`}>S</div>
                                <div className={`${comforter_Brush.className} text-green-600 text-2xl`}>Z</div>
                            </div>
                            <div className="flex flex-col">
                                <span className="capitalize">Sales Dep.</span>
                                <span className="text-sm text-neutral-500">Sales manager</span>
                            </div>
                        </>
                    ) : (
                        <Tooltip
                            radius="sm"
                            placement="left-end"
                            showArrow
                            offset={10}
                            content={
                                <div className="flex flex-col">
                                    <span className="capitalize">Sales Dep.</span>
                                    <span className="text-sm text-neutral-500">Sales manager</span>
                                    <span className="text-green-600 text-xs mt-2">Click to Toggle Side bar</span>
                                </div>
                            }>
                            <div className="flex items-end bg-green-100 rounded-full p-2 border-2 border-green-300">
                                <div className={`${montserrat_Subrayada.className} text-2xl`}>S</div>
                                <div className={`${comforter_Brush.className} text-green-600 text-2xl`}>Z</div>
                            </div>
                        </Tooltip>
                    )}
                </div>
                <span className={`${isDisplay ? "flex" : "hidden"} text-green-600 pl-4 text-xs pt-1 rounded-b-md pb-2`}>Click to Toggle Side bar</span>
                <div className={`${isDisplay ? 'h-[calc(100vh-160px)]' : 'h-[calc(100vh-130px)]'} py-3 overflow-y-auto scrollbar-hide border-1 border-neutral-400 bg-neutral-50 rounded-sm`}> {/* Adjust height based on your layout */}
                    {sortedMenuMap.map((item, index) =>
                        <Link key={index} href={`/admin/${item.link}`} className={`${path.endsWith(item.link) || (path == "/admin" && item.data === "dashboard") ? "border-l-4 border-y-1 border-r-1 border-y-green-300 border-r-green-300 border-l-green-500 bg-green-100" : ""} flex flex-row space-x-2 items-center text-md pl-3 hover:bg-green-100 hover:border-1 hover:border-green-400 hover:rounded-md rounded-e-md py-2`}>
                            {isDisplay ? (
                                <>
                                    <span>{item.icon}</span>
                                    <span className="capitalize">{item.data}</span>
                                </>
                            ) : (
                                <Tooltip
                                    placement="left-end"
                                    showArrow
                                    offset={30}
                                    radius="sm"
                                    content={<span className="capitalize">{item.data}</span>}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                </Tooltip>
                            )}
                        </Link>
                    )}
                    <div className="flex flex-row space-x-2 items-center text-md hover:border-y-1 hover:border-r-1 hover:border-y-red-300 hover:border-r-red-300 hover:border-l-4 pl-3 hover:border-l-red-500 hover:bg-red-100 rounded-e-md py-2" onClick={logOutAdmin}>
                        {isDisplay ? (
                            <>
                                <span><LuLogOut /></span>
                                <span className="capitalize">log out</span>
                            </>
                        ) : (
                            <Tooltip
                                placement="left-end"
                                radius="sm"
                                showArrow
                                offset={30}
                                content={<span className="capitalize">log out</span>}
                            >
                                <span className="text-lg"><LuLogOut /></span>
                            </Tooltip>
                        )}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center space-x-2">
                    {!isDisplay ? (
                        <Tooltip placement="left-end" showArrow offset={20} radius="sm" content={
                            <div className="flex flex-col">
                                <span>{data?.name}</span>
                                <span className="text-xs text-neutral-500">{data?.email}</span>
                            </div>
                        }>
                            <div className="text-2xl rounded-full bg-gradient-to-tl from-lime-400 to-orange-400 py-1 px-3">{data?.name[0]}</div>
                        </Tooltip>
                    ) : (
                        <>
                            <div className="text-2xl rounded-full bg-gradient-to-tl from-lime-400 to-orange-400 py-1 px-3">{data?.name[0]}</div>
                            <div className="flex flex-col">
                                <span>{data?.name}</span>
                                <span className="text-xs text-neutral-500">{data?.email}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="flex-1 ml-5 mr-2">
                {children}
            </div>
        </div>
    );
}

