'use client'
import React, { useCallback, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, } from "@nextui-org/react";
import { FaEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FormatDate } from "@/components/utility/FormatData";
import { useDeleteHook, useGetHook } from "@/hooks";
import { FeedbackData } from "./interface";


export function DataList() {
    const columns = [
        { name: "DESCRIPTION", uid: "description" },
        { name: "CREATED_AT", uid: "createdAt" },
        { name: "PATH", uid: "path" },
        { name: "EMAIL", uid: "email" },
        { name: "DELETE", uid: "delete" },
    ];

    const [key, setKey] = useState("all");
    const [updatedData, setUpdatedData] = useState<string[]>([]);
    const { data, fetchData } = useGetHook<string[]>("/f/aggregation/keys");
    useEffect(() => {
        if (data) {
            const newData = ["all", ...data];
            setUpdatedData(newData);
        } else {
            fetchData();
        }
    }, [fetchData, data]);

    const { data: user, fetchData: keyFetchData } = useGetHook<FeedbackData[]>(`/s/auth/feedback/?key=${key}`);

    useEffect(() => {
        keyFetchData();
    }, [keyFetchData, key]);

    const [deleteId, setDeleteId] = useState("");
    const { deleteData } = useDeleteHook(deleteId, "/s/auth/feedback");
    const handleDeleteFeedback = useCallback((id: string) => {
        setDeleteId(id);
        window.location.reload();

    }, []);

    useEffect(() => {
        deleteData();
    }, [deleteData, deleteId]);

    type User = FeedbackData | null;
    const renderCell = useCallback((user: User, columnKey: React.Key) => {
        const cellValue = user && user[columnKey as keyof User];

        switch (columnKey) {
            case "description":
                return (
                    <div>
                        {user && user.description}
                    </div>
                );
            case "createdAt":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue && FormatDate(cellValue)}</p>
                    </div>
                );
            case "path":
                return (
                    <div>
                        {user && user.path}
                    </div>
                );
            case "email":
                return (
                    <div>
                        {user && user.email}
                    </div>
                );
            case "delete":
                return (

                    <div onClick={() => user && handleDeleteFeedback(user.id)} >
                        <Tooltip color="danger" content="Delete Feedback">
                            <span className="text-lg justify-center flex text-danger cursor-pointer active:opacity-50">
                                <MdDelete />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [handleDeleteFeedback]);
    const tmp = 12;
    return (
        <div className="my-5 bg-neutral-300 border border-neutral-400 rounded-md p-2">
            <div className={`space-x-5 text-md flex flex-wrap `}>
                {updatedData.map((value, index) => (
                    <span key={index} onClick={() => setKey(value)} className={`${key == value && "bg-green-500/90"} capitalize min-w-16 text-center px-2 py-1 rounded-md`}>
                        {value}
                    </span>
                ))}
            </div>
            <div className="bg-teal-200 w-fit mt-2 px-2 py-1 rounded-md border border-teal-500 ">
                <span className="text-sm">No of Records:&nbsp;</span>
                <span className="text-xl">{user?.length}</span>
            </div>
            <div className="bg-content1 rounded-lg border-1 border-neutral-300 mt-2">
                <Table classNames={{ wrapper: "rounded-lg" }} aria-label="Content Table">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn className="text-medium bg-green-200" key={column.uid} align="start">
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={user || []}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell className="text-justify tracking-wide">{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div >
    );
}
