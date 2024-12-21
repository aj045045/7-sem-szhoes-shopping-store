import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Table, TableHeader, TableColumn, TableRow, TableCell, getKeyValue, TableBody } from "@nextui-org/table";
import { DetailTabsInterface } from "./interface";
import { Pagination } from "@nextui-org/react";

/**
 * The component is used to display the product in a tabular format
 * 
 * @returns Tabs of detail Products
 */
export function DetailTabs({ tabs }: { tabs: DetailTabsInterface[] }) {
    return (
        <Tabs aria-label="Options"  classNames={{ panel: "hidden sm:block rounded-md mt-0 p-0", cursor: "bg-green-500 text-green-900", tabList: "hidden sm:flex bg-transparent px-3 py-2 mt-10" }} items={tabs}>
            {(item: DetailTabsInterface) => (
                <Tab
                    key={item.title.toLowerCase()}
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="text-lg">{item.icon}</span>
                            <span className="capitalize">{item.title}</span>
                        </div>
                    }>
                    <div className="bg-content1 rounded-lg border-1 border-neutral-300">
                        <Table classNames={{ wrapper: "rounded-t-lg rounded-b-none" }} aria-label="Content Table">
                            <TableHeader columns={item.data.columns}>
                                {(column) => <TableColumn className="text-medium bg-green-200" key={column.key}>{column.label}</TableColumn>}
                            </TableHeader>
                            <TableBody items={item.data.rows}>
                                {(item) => (
                                    <TableRow key={item.key}>
                                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <Pagination classNames={{ wrapper: "mx-auto my-5" }} size="lg" isCompact loop showControls color="success" total={10} initialPage={1} />

                    </div>
                </Tab>
            )}
        </Tabs>
    );
}
