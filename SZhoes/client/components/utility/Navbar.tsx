'use client'
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Avatar } from "@nextui-org/avatar";
import { comforter_Brush, montserrat_Subrayada } from "@/langs";
import { motion } from "framer-motion";
import { NavBarItem } from "./interface";
import { usePathname, useRouter } from "next/navigation";
import { LuLogIn, LuSearch } from "react-icons/lu";
import { SearchInterface } from "./interface";
import { FiShoppingCart } from "react-icons/fi";
import { IoBookmarks } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa6";
import { NavbarItemData, SearchItemData } from "./api";
import { useGetHook } from "@/hooks";
import { UserProfile } from "../customer/profile/interface";

/**
 * The Component for the Navbar rendering
 * 
 * @returns The Link and profile of user
 */
export function NavbarComp() {
    const [isScrolled, setIsScrolled] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { data, fetchData, status } = useGetHook("/s/customer/login");
    const searchPath: SearchInterface[] = SearchItemData();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const path = usePathname();
    const menuItems: NavBarItem[] = NavbarItemData();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchData();
        }
    }, [fetchData]);

    useEffect(() => {
        if (status) {
            if (data === "CUSTOMER") {
                setIsLoggedIn(true);
            }
            if (data === "EMPLOYEE") {
                router.push('admin')
            }
        }
    }, [status, data, router]);

    useEffect(() => {
        const handleKeyDownClick = (event: any) => {
            if (event.ctrlKey && event.key === '/') {
                if (inputRef.current) {
                    inputRef.current.focus();
                    event.preventDefault();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDownClick);
        return () => {
            document.removeEventListener('keydown', handleKeyDownClick);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setIsScrolled(prevScrollPos > currentScrollPos || currentScrollPos === 0);
            setPrevScrollPos(currentScrollPos);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);


    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const search = event.currentTarget.value.trim().toLowerCase();
            const matchedItem = searchPath.find(item => item.name.toLowerCase() === search);
            if (matchedItem && matchedItem.link) {
                router.push(matchedItem.link);
            } else {
                // alert('No matching page found');
            }
        }
    };

    return <>
        <Navbar
            position={`${isScrolled ? "sticky" : "static"}`}
            isBlurred={false}
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            classNames={{
                base: "shadow-md shadow-neutral-300 z-20 select-none pt-1 shadow-md shadow-neutral-500/50 justify-center",
                wrapper: "max-w-full",
            }}
        >
            <NavbarContent justify="center">
                <NavbarMenuToggle className="md:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                <NavbarBrand className="space-x-2 flex items-center md:ml-10">
                    <Link className="text-black" href="/">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row items-end">
                                <div className={`${montserrat_Subrayada.className} text-3xl`}>S</div>
                                <div className={`${comforter_Brush.className} text-green-700 text-3xl`}>Z</div>
                            </div>
                        </div>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex gap-4 md:ml-10">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                        >
                            <Link
                                className={`w-full capitalize select-none ${item.link === path
                                    ? " text-green-700  underline-offset-8 underline"
                                    : " text-black"
                                    }`}
                                size="md"
                                href={item.link}
                            >
                                {item.page}
                            </Link>
                        </motion.div>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className={`${isFocused ? "md:absolute" : ""}`}>
                    <motion.div
                        transition={{ duration: 0.3 }}
                        className={`md:relative ${isFocused ? 'z-20 shadow-md shadow-neutral-300 rounded-full bg-neutral-100 md:w-[400px] sm:w-60 w-40' : 'z-10 sm:w-60 w-40'}`}
                    >
                        <Autocomplete
                            ref={inputRef}
                            onFocus={() => setIsFocused(!isFocused)}
                            onBlur={() => setIsFocused(!isFocused)}
                            defaultItems={searchPath}
                            classNames={{
                                listboxWrapper: "max-h-44",
                                selectorButton: "text-default-500"
                            }}
                            inputProps={{
                                classNames: {
                                    input: "ml-1",
                                    inputWrapper: "h-[48px] w-full",
                                },
                            }}
                            listboxProps={{
                                hideSelectedIcon: true,
                                itemClasses: {
                                    base: [
                                        "rounded-medium",
                                        "text-default-500",
                                        "transition-opacity",
                                        "data-[hover=true]:text-foreground",
                                        "dark:data-[hover=true]:bg-default-50",
                                        "data-[pressed=true]:opacity-70",
                                        "data-[hover=true]:bg-green-200",
                                        "data-[selectable=true]:focus:bg-default-100",
                                        "data-[focus-visible=true]:ring-default-500",
                                    ],
                                },
                            }}
                            aria-label="Search details"
                            placeholder="Search Ctrl + /"
                            popoverProps={{
                                offset: 10,
                                classNames: {
                                    base: "rounded-large",
                                    content: "p-1 border-small border-default-100 bg-background",
                                },
                            }}
                            startContent={<LuSearch className="text-default-400" strokeWidth={2.5} size={20} />}
                            radius="full"
                            variant="bordered"
                            selectorButtonProps={{ className: "hidden" }}
                            onKeyDown={handleKeyDown}>
                            {(item) => (
                                <AutocompleteItem key={item.id} textValue={item.name}>
                                    <div className="flex justify-between items-center">
                                        {item.name}
                                    </div>
                                </AutocompleteItem>
                            )}
                        </Autocomplete>
                    </motion.div>
                </NavbarItem>
                <NavbarItem>
                    {isLoggedIn ?
                        (<UserDropDown setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
                        )
                        : (
                            <Tooltip
                                shouldFlip
                                showArrow
                                offset={10}
                                shadow="lg"
                                placement="bottom"
                                size="lg"
                                radius="sm"
                                content={
                                    <div className="px-0.5 py-1">
                                        <div className="text-small font-bold">Login</div>
                                    </div>
                                }
                            >
                                <Link className="text-xl text-black bg-green-500 hover:bg-green-400 px-2 py-1 rounded-md" href="/login">
                                    <LuLogIn />
                                </Link>
                            </Tooltip>
                        )
                    }
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="md:hidden">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className={`w-full capitalize select-none ${item.link === path
                                ? " dark:text-green-300 text-green-700  underline-offset-8 underline"
                                : " text-black"
                                }`}
                            size="md"
                            href={item.link}
                        >
                            {item.page}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>

        </Navbar >
    </>
}

function UserDropDown({ isLoggedIn, setIsLoggedIn }: { isLoggedIn: Boolean, setIsLoggedIn: any }) {
    const { data, fetchData, status } = useGetHook<UserProfile>("/s/customer");
    const { fetchData: logOutFetchData } = useGetHook<boolean>("/s/customer/logout");
    const router = useRouter();
    const logOutUser = () => {
        logOutFetchData();
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push('/login');
    }
    useEffect(() => {
        if (isLoggedIn && !data) {
            fetchData();
        }
    }, [isLoggedIn, fetchData, data]);

    return (
        <div className="flex flex-row items-center space-x-2">
            <Dropdown placement="bottom-end" showArrow>
                <DropdownTrigger>
                    <Avatar
                        size="sm"
                        as="button"
                        classNames={{ base: "bg-gradient-to-tl from-lime-400 to-orange-400 ", name: "text-2xl" }}
                        name={data?.name.charAt(0)}
                        className="transition-transform"
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownSection showDivider >
                        <DropdownItem href="/user/profile" key="profile" className="h-10 py-8 gap-2">
                            <p className="font-semibold">{status && data?.name}</p>
                            <p className="text-xs text-neutral-600">{status && data?.email}</p>
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownSection showDivider title="Actions">
                        <DropdownItem href="/user/wishlist" startContent={<IoBookmarks />} key="wishlist" className="flex flex-row items-center">
                            Wishlist
                        </DropdownItem>
                        <DropdownItem href="/user/order" startContent={<BsFillCartCheckFill />} key="order" className="flex flex-row items-center">
                            Orders
                        </DropdownItem>
                        <DropdownItem href="/user/order-history" startContent={<FaTruck />} key="order-history" className="flex flex-row items-center">
                            Order History
                        </DropdownItem>
                    </DropdownSection>
                    <DropdownItem onClick={logOutUser} startContent={<MdLogout />} key="logout" color="danger">
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Tooltip
                shouldFlip
                showArrow
                offset={10}
                shadow="lg"
                placement="bottom"
                size="lg"
                radius="sm"
                content={
                    <div className="px-0.5 py-1">
                        <div className="text-small font-bold">Cart</div>
                    </div>
                }
            >
                <Link className="text-2xl rounded-full  text-black  p-2" href="/user/cart">
                    <FiShoppingCart />
                </Link>
            </Tooltip>
        </div>
    )
}