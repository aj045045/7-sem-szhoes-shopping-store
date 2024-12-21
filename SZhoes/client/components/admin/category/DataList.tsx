'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Chip } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { FormatDate } from "@/components/utility/FormatData";
import { useDeleteHook, useGetHook, usePutHook } from "@/hooks";
import { CategoryData } from "./interface";
import { AddCategory } from "./AddCategory";
import { FaCheckCircle, FaPlusCircle, FaRegEdit } from "react-icons/fa";


export function DataList() {
    // Fetch tags from server
    const { data, fetchData } = useGetHook<string[]>("/s/category/tags");
    const [updatedData, setUpdatedData] = useState<string[]>([]);
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    const columns = [
        { name: "TITLE", uid: "title" },
        { name: "TAG", uid: "tag" },
        { name: "IS_ACTIVE", uid: "isActive" },
        { name: "DELETE", uid: "delete" },
    ];
    const [key, setKey] = useState("ALL");
    useEffect(() => {
        if (data) {
            const newData = ["ALL", ...data];
            setUpdatedData(newData);
        } else {
            fetchData();
        }
    }, [fetchData, data]);

    // Fetch data from the server on base of tags
    const { data: user, fetchData: keyFetchData } = useGetHook<CategoryData[]>(`/s/category?tag=${key}`);

    useEffect(() => {
        // Fetch data
        keyFetchData();
    }, [keyFetchData, key]);

    // Update isActive 
    const [updateValue, setUpdateValue] = useState<string>("");
    const { fetchData: updatedFetchValue } = useGetHook<CategoryData[]>(`/s/category/u?id=${updateValue}`);

    // Update data
    const handleChangeCategory = useCallback((id: string) => {
        setUpdateValue(id);
        window.location.reload();
    }, []);
    useEffect(() => {
        updatedFetchValue();
    }, [updateValue, updatedFetchValue]);

    // Delete category
    const [deleteId, setDeleteId] = useState("");
    const { deleteData } = useDeleteHook(deleteId, "/s/category");
    const handleDeleteCategory = useCallback((id: string) => {
        setDeleteId(id);
        window.location.reload();
    }, []);
    useEffect(() => {
        deleteData();
    }, [deleteData, deleteId]);

    type User = CategoryData | null;
    const renderCell = useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user && user[columnKey as keyof User];

        switch (columnKey) {
            case "title":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "tag":
                return (
                    <div>
                        {user && user.tag}
                    </div>
                );
            case "isActive":
                return (
                    <div className="capitalize">
                        {user &&
                            <div onClick={() => handleChangeCategory(user.id)}>
                                {user.isActive ? <Chip startContent={<FaCheckCircle className="text-lg" />} className=" border-green-400 border" variant="flat" color="success">{String(user.isActive)}</Chip>
                                    : <Chip startContent={<FaPlusCircle className="transform rotate-45 text-lg" />} className=" border-red-300 border" variant="flat" color="danger">{String(user?.isActive)}</Chip>}
                            </div>
                        }
                    </div>
                );
            case "delete":
                return (
                    <div onClick={() => user && handleDeleteCategory(user.id)} className="flex justify-center">
                        <Tooltip color="danger" content="Delete Category">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <MdDelete />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [handleDeleteCategory, handleChangeCategory]);
    return (
        <div className="my-5 bg-neutral-300 border border-neutral-400 rounded-md p-2">
            <div className="space-x-5 text-md justify-between flex">
                <div>
                    {updatedData.map((value, index) => (
                        <span key={index} onClick={() => setKey(value)} className={`${key == value && "bg-green-500/90"} capitalize min-w-16 text-center px-2 py-1 rounded-md`}>
                            {value}
                        </span>
                    ))}
                </div>
                <AddCategory />
            </div>
            <div className="bg-teal-200 w-fit px-2 py-1 rounded-md border border-teal-500 ">
                <span className="text-sm">No of Records:&nbsp;</span>
                <span className="text-xl">{user?.length}</span>
            </div>
            <div className="bg-content1 rounded-lg border-1 border-neutral-300 mt-2">
                <Table classNames={{ wrapper: "rounded-lg" }} aria-label="Example table with custom cells">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn className="text-medium bg-green-200" key={column.uid} align={column.uid === "delete" ? "center" : "start"}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={user || []}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
}
