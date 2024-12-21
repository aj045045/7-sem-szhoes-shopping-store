import Link from "next/link";
import { ProductItemInterface } from "./interface";
import { Divider } from "@nextui-org/react";

export function ProductItem({ category, itemCount, name, _id, categoryId }: ProductItemInterface) {

    return (
        <Link href={`product/${_id}`} className="flex flex-col justify-between bg-white rounded-md items-center px-2 py-2 h-fit shadow-md w-fit mb-5 space-y-2">
            <div className="flex flex-row space-x-5 px-5 items-center">
                <div className="text-medium md:text-lg">{name}</div>
                <div className="font-mono">{itemCount} items</div>
            </div>
            <Divider orientation="horizontal" />
            <div className="bg-teal-100 border-teal-400 border px-2 rounded-full text-teal-800 text-sm mx-5">{category}</div>
        </Link>
    )
}