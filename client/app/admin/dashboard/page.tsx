import { FaArrowDown, FaCartShopping, FaIndianRupeeSign } from "react-icons/fa6";
import { PiKeyReturnFill } from "react-icons/pi";
import { IoMdPerson } from "react-icons/io";
import { GreetingPage } from "./greeting";
import type { Metadata } from "next";
import React from "react";
import { DataCardListUtil } from "@/utility/admin/data-card-util";
import { ChartDisplayUtil } from "@/utility/admin/chart-display";
import { DetailTabsInterface } from "@/interfaces/admin";
import { DetailTabsPage } from "./detail-tabs";

export const metadata: Metadata = {
    title: "Dashboard"
};

/**
 * The Admin Dashboard Components that hold the other admin components used as wrapper component
 * 
 * @returns The Admin Dashboard Page 
 */
export default function AdminDashboardComp() {
    const balanceSheet: { icon: React.ReactNode, title: string, value: string }[] = [
        { icon: <FaIndianRupeeSign />, title: "Income", value: "12000" },
        { icon: <FaArrowDown />, title: "Expenses", value: "15000" },
        { icon: <FaCartShopping />, title: "Order", value: "4500" },
        { icon: <PiKeyReturnFill />, title: "Return", value: "15" },
        { icon: <IoMdPerson />, title: "Customer", value: "45" },
    ]

    const imagePath = "f/image?name=bar-diagram.webp&type=admin/dashboard";
    const detailTabsData: DetailTabsInterface[] = [
        {
            icon: <FaIndianRupeeSign />,
            title: "Income",
            data: {
                columns: [
                    { key: "product", label: "Product" },
                    { key: "price", label: "Price" },
                    { key: "sold", label: "Sold" },
                    { key: "amount", label: "Amount" },
                ],
                rows: [
                    { key: "1", product: "Intelligent Plastic Tuna", price: "158.00", sold: "10", amount: "1580" },
                    { key: "2", product: "Small Concrete Hat", price: "23.00", sold: "10", amount: "230" },
                    { key: "3", product: "Generic Metal Chair", price: "360.00", sold: "10", amount: "3600" },
                    { key: "4", product: "Ergonomic Rubber Table", price: "455.00", sold: "10", amount: "4550" },
                    { key: "5", product: "Practical Frozen Car", price: "554.00", sold: "10", amount: "5540" },
                    { key: "6", product: "Intelligent Plastic Tuna", price: "158.00", sold: "10", amount: "1580" },
                    { key: "7", product: "Small Concrete Hat", price: "23.00", sold: "10", amount: "230" },
                    { key: "8", product: "Generic Metal Chair", price: "360.00", sold: "10", amount: "3600" },
                    { key: "9", product: "Ergonomic Rubber Table", price: "455.00", sold: "10", amount: "4550" },
                    { key: "10", product: "Practical Frozen Car", price: "554.00", sold: "10", amount: "5540" },
                ]
            }
        },
        {
            icon: <FaArrowDown />,
            title: "Expenses",
            data: {
                columns: [
                    { key: "title", label: "Title" },
                    { key: "description", label: "Description" },
                    { key: "tag", label: "Tag" },
                    { key: "amount", label: "Amount" },
                    { key: "date", label: "Date" },

                ],
                rows: [
                    { key: "1", title: "suscipit", description: "Tempora nesciunt est facilis commodi libero.", tag: "Sports", amount: "176.00", date: "Sun Aug 11 2024 13:20" },
                    { key: "2", title: "nostrum", description: "Eligendi nostrum consequatur nemo deleniti dolor nam alias aut.", tag: "Shoes", amount: "433.00", date: "Sat Aug 10 2024 16:27" },
                    { key: "3", title: "fugit", description: "Consequatur aut autem quisquam ipsam commodi.", tag: "Beauty", amount: "184.00", date: "Sat Aug 10 2024 19:22" },
                    { key: "4", title: "tenetur", description: "Doloremque et aut tenetur incidunt voluptatum ullam cumque sit corporis.", tag: "Games", amount: "349.00", date: "Sat Aug 10 2024 16:31" },
                    { key: "5", title: "delectus", description: "Eaque aut ut consequatur qui deserunt rerum quas itaque.", tag: "Games", amount: "333.00", date: "Sun Aug 11 2024 09:52" },
                    { key: "6", title: "suscipit", description: "Tempora nesciunt est facilis commodi libero.", tag: "Sports", amount: "176.00", date: "Sun Aug 11 2024 13:20" },
                    { key: "7", title: "nostrum", description: "Eligendi nostrum consequatur nemo deleniti dolor nam alias aut.", tag: "Shoes", amount: "433.00", date: "Sat Aug 10 2024 16:27" },
                    { key: "8", title: "fugit", description: "Consequatur aut autem quisquam ipsam commodi.", tag: "Beauty", amount: "184.00", date: "Sat Aug 10 2024 19:22" },
                    { key: "9", title: "tenetur", description: "Doloremque et aut tenetur incidunt voluptatum ullam cumque sit corporis.", tag: "Games", amount: "349.00", date: "Sat Aug 10 2024 16:31" },
                    { key: "10", title: "delectus", description: "Eaque aut ut consequatur qui deserunt rerum quas itaque.", tag: "Games", amount: "333.00", date: "Sun Aug 11 2024 09:52" },

                ]
            }
        },
        {
            icon: <FaCartShopping />,
            title: "Order",
            data: {
                columns: [
                    { key: "product", label: "Product" },
                    { key: "price", label: "Price" },
                    { key: "qty", label: "Qty" },
                    { key: "total", label: "Total" },
                ],
                rows: [
                    { key: "1", product: "Unbranded Concrete Pants", price: "414.00", qty: "10", total: "4140" },
                    { key: "2", product: "Gorgeous Soft Shirt", price: "955.00", qty: "10", total: "9550" },
                    { key: "3", product: "Licensed Cotton Pants", price: "925.00", qty: "10", total: "9250" },
                    { key: "4", product: "Small Concrete Sausages", price: "820.00", qty: "10", total: "820" },
                    { key: "5", product: "Licensed Cotton Shirt", price: "704.00", qty: "10", total: "7040" },
                    { key: "6", product: "Unbranded Concrete Pants", price: "414.00", qty: "10", total: "4140" },
                    { key: "7", product: "Gorgeous Soft Shirt", price: "955.00", qty: "10", total: "9550" },
                    { key: "8", product: "Licensed Cotton Pants", price: "925.00", qty: "10", total: "9250" },
                    { key: "9", product: "Small Concrete Sausages", price: "820.00", qty: "10", total: "820" },
                    { key: "10", product: "Licensed Cotton Shirt", price: "704.00", qty: "10", total: "7040" },
                ]
            }
        },
        {
            icon: <PiKeyReturnFill />,
            title: "Return",
            data: {
                columns: [
                    { key: "product", label: "Product" },
                    { key: "price", label: "Price" },
                    { key: "item", label: "Item" },
                    { key: "refunded", label: "Refunded" },
                ],
                rows: [
                    { key: "1", product: "Tasty Wooden Pants", price: "353.00", item: "10", refunded: "3530" },
                    { key: "2", product: "Ergonomic Concrete Towels", price: "685.00", item: "10", refunded: "6850" },
                    { key: "3", product: "Fantastic Concrete Fish", price: "476.00", item: "10", refunded: "4760" },
                    { key: "4", product: "Sleek Frozen Tuna", price: "139.00", item: "10", refunded: "1390" },
                    { key: "5", product: "Generic Concrete Cheese", price: "600.00", item: "10", refunded: "6000" },
                    { key: "10", product: "Tasty Wooden Pants", price: "353.00", item: "10", refunded: "3530" },
                    { key: "6", product: "Ergonomic Concrete Towels", price: "685.00", item: "10", refunded: "6850" },
                    { key: "7", product: "Fantastic Concrete Fish", price: "476.00", item: "10", refunded: "4760" },
                    { key: "8", product: "Sleek Frozen Tuna", price: "139.00", item: "10", refunded: "1390" },
                    { key: "9", product: "Generic Concrete Cheese", price: "600.00", item: "10", refunded: "6000" },
                ]
            }
        },
    ];

    return (
        <div className="space-y-5 py-2">
            <GreetingPage name="Ansh Yadav" post="CEO" />
            <DataCardListUtil title="Overall Balance Sheet" dataList={balanceSheet} />
            <ChartDisplayUtil title="Balance statistics" imagePath={imagePath} />
            <DetailTabsPage tabs={detailTabsData} />
        </div>
    );
}