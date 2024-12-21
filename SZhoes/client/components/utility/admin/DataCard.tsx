import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { NumberOfCardInterface } from "./interface";
import { formatNumber } from "../FormatNumber";

/**
 * The component used to display the number of records and their type 
 * 
 * @param icon - The react node for icon to be displayed
 * @param title - The title of the card
 * @param value - The counting value as string 
 * @returns Card contain the title and no of data in the system
 */
export function DataCard({ icon, title, value }: NumberOfCardInterface) {
    return (
        <Card classNames={{ base: "mt-5 w-40 rounded-md bg-transparent border-0 bg-green-100 select-none", body: "flex flex-row space-x-1 text-3xl items-end", header: "space-x-1 text-neutral-600 flex" }}>
            <CardHeader>
                <span className="text-xl bg-green-200 border-1 border-green-400 text-green-700 rounded-full p-1.5">
                    {icon}
                </span>
                <span>
                    {title}
                </span>
            </CardHeader>
            <CardBody>
                {formatNumber(Number(value),1)}
            </CardBody>
        </Card>
    );
}