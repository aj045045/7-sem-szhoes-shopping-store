import "react-cmdk/dist/cmdk.css";
import CommandPalette, { filterItems, getItemIndex } from "react-cmdk";
import { useEffect, useState } from "react";
import { Kbd } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";
import { ToastUtil } from "./toast";
import Cookies from 'js-cookie';
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdMale } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { TbPerfume } from "react-icons/tb";
import { FaQuestionCircle } from "react-icons/fa";

export function KBarSearchUtil() {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState("");


    const filteredItems = filterItems(
        [
            {
                heading: "Task",
                id: "Task",
                items: [
                    {
                        id: "home",
                        children: "Home",
                        icon: "HomeIcon",
                        href: "/u/home",
                    },
                    {
                        id: "Register",
                        children: "Register",
                        icon: "UserCircleIcon",
                        href: "/u/register"
                    },
                    {
                        id: "login",
                        children: "Login",
                        icon: "ArrowLeftOnRectangleIcon",
                        href: "/u/login"
                    },
                    {
                        id: "faq",
                        children: "Faq",
                        icon: FaQuestionCircle,
                        href: "/u/faq"
                    }
                ],
            },
            {
                heading: "Category",
                id: "category",
                items: [
                    {
                        id: "men",
                        children: "Men Products",
                        icon: IoMdMale,
                        href: "#",
                    },
                    {
                        id: "women",
                        children: "Women Products",
                        icon: IoFemale,
                        href: "#",
                    },
                    {
                        id: "kids",
                        children: "Kids Products",
                        icon: "UserCircleIcon",
                        href: "#",
                    },
                    {
                        id: "perfume",
                        children: "Perfumes",
                        icon: TbPerfume,
                        href: "#",
                    },
                    {
                        id: "accessories",
                        children: "Accessories",
                        icon: "WalletIcon",
                        href: "#",
                    },
                    // Conditionally add the Log out item based on the TOKEN cookie
                    ...(Cookies.get("TOKEN")
                        ? [{
                            id: "log-out",
                            children: "Log out",
                            icon: HiOutlineLogout,  // Resolve icon name to component
                            onClick: () => {
                                ToastUtil.success("Logged Out Successfully!");
                                Cookies.remove("TOKEN"); // Optionally remove the TOKEN cookie on logout
                            },
                        }]
                        : []
                    ),
                ],
            },
        ],
        search
    );


    // REVIEW - Ctrl + K Press Handler
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (
                (navigator?.platform?.toLowerCase().includes("mac")
                    ? e.metaKey
                    : e.ctrlKey) &&
                e.key === "k"
            ) {
                e.preventDefault();
                e.stopPropagation();
                setOpen((currentValue) => {
                    return !currentValue;
                });
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <div onClick={() => setOpen(!open)} className="flex flex-row w-52 items-center justify-between border-2 border-neutral-300 p-1 rounded-lg">
                <div className="flex flex-row items-center space-x-2">
                    <div className="text-lg"><IoIosSearch /></div>
                    <div className="text-sm">Quick Search...</div>
                </div>
                <Kbd keys={["ctrl"]}>K</Kbd>
            </div>
            <CommandPalette
                onChangeSearch={setSearch}
                onChangeOpen={setOpen}
                search={search}
                isOpen={open}
                page="root"
            >
                <CommandPalette.Page id="root" >
                    {
                        filteredItems.length ? (
                            filteredItems.map((list) => (
                                <CommandPalette.List key={list.id} heading={list.heading} >
                                    {
                                        list.items.map(({ id, ...rest }) => (
                                            <CommandPalette.ListItem
                                                key={id}
                                                index={getItemIndex(filteredItems, id)}
                                                {...rest}
                                            />
                                        ))}
                                </CommandPalette.List>
                            ))
                        ) : (
                            <CommandPalette.FreeSearchAction />
                        )}
                </CommandPalette.Page>
            </CommandPalette>
        </>
    );

};