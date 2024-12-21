'use client'
import { Button, ButtonGroup } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Divider } from "@nextui-org/divider";
import Image from "next/image";
import { useState } from "react";
import { FaIndianRupeeSign, FaMinus, FaPlus } from "react-icons/fa6";
import { HiOutlineSelector } from "react-icons/hi";

/**
 * The Product Detail in Cart's
 * 
 * @returns The Detail of product
 */
export function Total() {
    const [quantities, setQuantities] = useState(Array(6).fill(1));

    const removeProduct = () => {
        alert("Remove product");
    };

    const incrementQuantity = (index: number, max_value: number) => {
        if (quantities[index] < max_value) {
            setQuantities((prevQuantities) => {
                const newQuantities = [...prevQuantities];
                newQuantities[index] = newQuantities[index] + 1;
                return newQuantities;
            });
        }
    };

    const decrementQuantity = (index: number) => {
        setQuantities((prevQuantities) => {
            const newQuantities = [...prevQuantities];
            if (newQuantities[index] > 1) {
                newQuantities[index] = newQuantities[index] - 1;
            }
            return newQuantities;
        });
    };
    const getColorName = (colorClass: string): string => {
        const colorName = colorClass.replace(/^bg-/, '').replace(/-600$/, '');
        return colorName.charAt(0).toUpperCase() + colorName.slice(1);
    }

    function CalculatePrice(index: number, price: number, max_value: number) {
        if (quantities[index] <= max_value) {
            return price * quantities[index];
        }
    }

    const numbers = Array.from({ length: 5 }, (_, index) => index + 1);
    const price = 12000;
    const Sizes: number[] = [4, 5, 7, 8, 9, 12, 14, 16];
    const Colors: { key: number, value: string }[] = [{ key: 1, value: "bg-red-600" }, { key: 2, value: "bg-stone-600" }, { key: 3, value: "bg-neutral-600" }, { key: 4, value: "bg-zinc-600" }, { key: 5, value: "bg-gray-600" }, { key: 6, value: "bg-slate-600" }, { key: 7, value: "bg-orange-600" }, { key: 8, value: "bg-amber-600" }, { key: 9, value: "bg-yellow-600" }, { key: 10, value: "bg-lime-600" }, { key: 11, value: "bg-green-600" }, { key: 12, value: "bg-emerald-600" }, { key: 13, value: "bg-teal-600" }, { key: 14, value: "bg-cyan-600" }, { key: 15, value: "bg-sky-600" }, { key: 16, value: "bg-blue-600" }, { key: 17, value: "bg-indigo-600" }, { key: 18, value: "bg-violet-600" }, { key: 19, value: "bg-purple-600" }, { key: 20, value: "bg-fuchsia-600" }, { key: 21, value: "bg-pink-600" }, { key: 22, value: "bg-rose-600" }];
    return (
        <div className="col-span-2 bg-white rounded-md p-4 shadow-xl">
            <div className="text-neutral-500 mb-5">5 products</div>
            <div className="space-y-10">
                {numbers.map((index) => (
                    <div key={index}>
                        <Divider className="h-px mb-5" orientation="horizontal" />
                        <div className="flex md:flex-row flex-col lg:space-x-8 space-y-5 items-center">
                            <Image
                                className="w-40 rounded-xl bg-neutral-100 p-2 border-2 border-neutral-300"
                                unoptimized
                                alt="Image"
                                src={"/images/image-4.png"}
                                height={0}
                                width={0}
                            />
                            <div className="space-y-3 items-center lg:items-start flex flex-col">
                                <div className="lg:text-xl md:text-lg sm:text-medium text-sm">Fantastic Rubber Salad</div>
                                <div className=" text-neutral-500 flex flex-row space-x-4">
                                    <Select
                                        defaultSelectedKeys={Sizes[0].toString()}
                                        aria-label="Sizes"
                                        placeholder=""
                                        className="w-20"
                                        disableSelectorIconRotation
                                        selectorIcon={<HiOutlineSelector />}
                                    >
                                        {Sizes.map((animal, index) => (
                                            <SelectItem
                                                textValue={animal.toString()}
                                                key={index}>
                                                {animal}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        defaultSelectedKeys={Colors[6].key.toString()}
                                        aria-label="Colors"
                                        items={Colors}
                                        placeholder=""
                                        className="w-40"
                                        disableSelectorIconRotation
                                        selectorIcon={<HiOutlineSelector />}
                                        renderValue={(items) => {
                                            return items.map((item) => (
                                                <div key={item.key} className="flex flex-row items-center space-x-2">
                                                    <div className="w-fit border-neutral-400 rounded-md items-center">
                                                        <div className={`p-3 ${item.textValue} rounded-full`}></div>
                                                    </div>
                                                    <div>{getColorName(item.textValue || '')}</div>
                                                </div>
                                            ));
                                        }}
                                    >
                                        {(item) => (
                                            <SelectItem
                                                classNames={{ base: "capitalize" }}
                                                textValue={item.value}
                                                startContent={
                                                    <div key={item.key} className="w-fit border-neutral-400 rounded-md items-center">
                                                        <div className={`p-3 ${item.value} rounded-full`}></div>
                                                    </div>
                                                }
                                                key={item.key}>
                                                {getColorName(item.value)}
                                            </SelectItem>
                                        )}
                                    </Select>
                                </div>
                                <div className="flex flex-row justify-between w-full md:flex-col md:space-y-3">
                                    <div className="flex flex-row items-center space-x-3 md:text-medium text-sm text-neutral-700">
                                        <FaIndianRupeeSign />
                                        {price}
                                    </div>
                                    <div
                                        onClick={removeProduct}
                                        className="text-sm text-red-600 border-2 border-red-600 w-fit px-2 py-1 hover:bg-red-500 cursor-pointer hover:border-transparent hover:text-red-950"
                                    >
                                        Remove
                                    </div>
                                </div>
                            </div>
                            <ButtonGroup>
                                <Button
                                    key={`decrement-${index}`}
                                    className="h-8 min-w-5 px-2"
                                    radius="sm"
                                    onClick={() => decrementQuantity(index)}
                                >
                                    <FaMinus />
                                </Button>
                                <Button
                                    key={`quantity-${index}`}
                                    className="h-8 min-w-5 px-2"
                                    radius="none"
                                >
                                    {quantities[index]}
                                </Button>
                                <Button
                                    key={`increment-${index}`}
                                    className="h-8 min-w-5 px-2"
                                    radius="sm"
                                    onClick={() => incrementQuantity(index, 10)}
                                >
                                    <FaPlus />
                                </Button>
                            </ButtonGroup>
                            <span className="flex flex-row items-center space-x-2 md:text-lg text-medium">
                                <FaIndianRupeeSign />
                                {CalculatePrice(index, price, 10)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );


}
