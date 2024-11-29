'use client'
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/dropdown";
import { Link } from "@nextui-org/link";
import { Tooltip } from "@nextui-org/tooltip";
import { Avatar } from "@nextui-org/avatar";
import { comforterBrush, montserratSubrayada } from "@/langs";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LuLogIn } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { IoBookmarks } from "react-icons/io5";
import { BsFillCartCheckFill } from "react-icons/bs";
import { FaTruck } from "react-icons/fa6";
import { NavBarItem } from "../interfaces/utility";
import { KBarSearchUtil } from "./kbar";
import { useUserStore } from "@/store";
import { MdLogout } from "react-icons/md";

/**
 * The Component for the Navbar rendering
 * 
 * @returns The Link and profile of user
 */
export function NavbarUtil() {

    const [isScrolled, setIsScrolled] = useState<boolean>(true);
    const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const path = usePathname();
    const { name, email, logOut } = useUserStore();
    const menuItems: NavBarItem[] = [
        { page: "Home", link: "/u/home" },
        { page: "Men", link: "/u/men" },
        { page: "Women", link: "/u/women" },
        { page: "Kids", link: "/u/kids" },
        { page: "Perfumes", link: "/u/perfumes" },
        { page: "Accessories", link: "/u/accessories" },
    ];

    useEffect(() => {
        const handleKeyDownClick = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === '/') {
                if (inputRef.current) {
                    inputRef.current.focus();
                    event.preventDefault();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDownClick as unknown as EventListener);
        return () => {
            document.removeEventListener('keydown', handleKeyDownClick as unknown as EventListener);
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

    return <>
        <Navbar
            position={`${isScrolled ? "sticky" : "static"}`}
            isBlurred={false}
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            classNames={{
                base: "shadow-md shadow-neutral-300 z-20 select-none pt-1 shadow-md shadow-neutral-500/50 justify-center bg-white",
                wrapper: "max-w-full",
            }}
        >
            <NavbarContent justify="center">
                <NavbarMenuToggle className="md:hidden" aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                <NavbarBrand className="space-x-2 flex items-center md:ml-10">
                    <Link className="text-black" href="/">
                        <div className="flex flex-col items-center">
                            <div className="flex flex-row items-end">
                                <div className={`${montserratSubrayada.className} text-3xl`}>S</div>
                                <div className={`${comforterBrush.className} text-green-700 text-3xl`}>Z</div>
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
                <NavbarItem>
                    <KBarSearchUtil />
                </NavbarItem>
                <NavbarItem>
                    <div className="flex flex-row items-center space-x-2">
                        {(name && email) ?
                            (
                                <Dropdown placement="bottom-end" showArrow>
                                    <DropdownTrigger>
                                        <Avatar
                                            size="sm"
                                            as="button"
                                            classNames={{ base: "bg-gradient-to-tl from-lime-400 to-orange-400 ", name: "text-2xl" }}
                                            name={name.charAt(0)}
                                            className="transition-transform"
                                        />
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                                        <DropdownSection showDivider >
                                            <DropdownItem href="/u/customer/profile" key="profile" className="h-10 py-8 gap-2">
                                                <p className="font-semibold">{name}</p>
                                                <p className="text-xs text-neutral-600">{email}</p>
                                            </DropdownItem>
                                        </DropdownSection>
                                        <DropdownSection showDivider title="Actions">
                                            <DropdownItem href="/u/customer/wishlist" startContent={<IoBookmarks />} key="wishlist" className="flex flex-row items-center">
                                                Wishlist
                                            </DropdownItem>
                                            <DropdownItem href="/u/customer/order" startContent={<BsFillCartCheckFill />} key="order" className="flex flex-row items-center">
                                                Orders
                                            </DropdownItem>
                                            <DropdownItem href="/u/customer/order-history" startContent={<FaTruck />} key="order-history" className="flex flex-row items-center">
                                                Order History
                                            </DropdownItem>
                                        </DropdownSection>
                                        <DropdownItem onClick={() => logOut} startContent={<MdLogout />} key="logout" color="danger">
                                            Log Out
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
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
                                    <Link className="text-xl text-black bg-green-500 hover:bg-green-400 p-1 rounded-md" href="/u/login">
                                        <LuLogIn />
                                    </Link>
                                </Tooltip>
                            )
                        }
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
                            <Link className="text-2xl rounded-full text-black  p-2" href="/user/cart">
                                <FiShoppingCart />
                            </Link>
                        </Tooltip>
                    </div>
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