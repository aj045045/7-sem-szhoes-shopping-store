import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { formatNumberUtil } from "../other/format-number";
import { DataCardInterface, NumberOfCardInterface } from "@/interfaces/utility";
import { montserratSubrayada } from "@/langs";

/**
 * The component used to display the number of records and their type 
 * 
 * @param icon - The react node for icon to be displayed
 * @param title - The title of the card
 * @param value - The counting value as string 
 * @returns Card contain the title and no of data in the system
 */
export function DataCardUtil({ icon, title, value }: NumberOfCardInterface) {
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
                {formatNumberUtil(Number(value), 1)}
            </CardBody>
        </Card>
    );
}



/**
 * The component that is used to map the data in a format from json
 * 
 * @param title - The title of of the component
 * @returns Contain the number of `DataCard` using json values
 */
export function DataCardListUtil({ title, dataList }: DataCardInterface) {
    return (
        <div className="bg-green-400 space-y-3 p-4 my-4 rounded-lg w-full">
            <div className={`${montserratSubrayada.className} text-xl [word-spacing:10px] text-green-950`}>{title}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-between">
                {dataList && dataList.map((value, index) =>
                    <DataCardUtil icon={value.icon} key={index} title={value.title} value={value.value} />
                )}
            </div>
        </div>
    )
}
