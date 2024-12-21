import { montserrat_Subrayada } from "@/langs";
import { DataCard } from "./DataCard";
import { DataCardInterface } from "./interface";

/**
 * The component that is used to map the data in a format from json
 * 
 * @param title - The title of of the component
 * @returns Contain the number of `DataCard` using json values
 */
export function DataCardMap({ title, dataList }: DataCardInterface) {
    return (
        <div className="bg-green-400 space-y-3 p-4 my-4 rounded-lg w-full">
            <div className={`${montserrat_Subrayada.className} text-xl [word-spacing:10px] text-green-950`}>{title}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-between">
                {dataList && dataList.map((value, index) =>
                    <DataCard icon={value.icon} key={index} title={value.title} value={value.value} />
                )}
            </div>
        </div>
    )
}
