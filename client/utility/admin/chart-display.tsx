'use client'
import { montserratSubrayada } from "@/langs";
import { Select, SelectItem, Tooltip } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";
import { DateRangePicker } from "@nextui-org/date-picker";
import { getLocalTimeZone, today } from '@internationalized/date';
import { useState } from "react";
import { I18nProvider } from "@react-aria/i18n";
import { RangeValue } from "@react-types/shared";
import { DateValue } from "@react-types/datepicker";
import { ChartInterface } from "@/interfaces/utility";

/**
 * The component that is used to display the Chart 
 * 
 * @param title - The title of the chart component
 * @param data - The Data to be display as a Chart
 * @returns The chart and their filters 
 */
export function ChartDisplayUtil({ title, imagePath, display = "" }: ChartInterface) {
    const [select, setSelect] = useState<string>("1M");

    const now = today(getLocalTimeZone());
    const [startEndDate, setStartEndDate] = useState<RangeValue<DateValue>>({
        start: now.subtract({ months: 1 }),
        end: now
    });
    // const startDate = startEndDate.start.toDate(getLocalTimeZone()).toISOString();
    // const endDate = startEndDate.end.toDate(getLocalTimeZone()).toISOString();
    // const fetchQuery = `${imagePath}${display && `?startDate=${startDate}&endDate=${endDate}&display=${display}`}`;

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelect(e.target.value);
        switch (e.target.value) {
            case "1D":
                setStartEndDate({
                    start: now.subtract({ days: 1 }),
                    end: now
                });
                break;
            case "1W":
                setStartEndDate({
                    start: now.subtract({ weeks: 1 }),
                    end: now
                });
                break;
            case "1M":
                setStartEndDate({
                    start: now.subtract({ months: 1 }),
                    end: now
                });
                break;
            case "1Y":
                setStartEndDate({
                    start: now.subtract({ years: 1 }),
                    end: now
                });
                break;
            case "MAX":
                setStartEndDate({
                    start: now.subtract({ years: 100 }),
                    end: now
                });
                break;
            default:
                break;
        }
    };
    // const handleOpenImage = () => {
    //     if (data) {
    //         const imageUrl = `data:image/png;base64,${data}`;
    //         const newTab = window.open();
    //         if (newTab) {
    //             newTab.document.body.innerHTML = `<img src="${imageUrl}" alt="Chart Image" style="width:100%; height:auto;"/>`;
    //             newTab.document.title = title;
    //         }
    //     }
    // };

    const isSelectedCustom = select === 'CUSTOM';
    return (
        <div className="w-full p-4 my-4 space-y-3 rounded-lg bg-neutral-300 border-1 border-neutral-400">
            <div className="flex justify-between">
                <div className={`${montserratSubrayada.className} text-xl [word-spacing:10px] text-green-950`} id={title.toLowerCase().replace(/ /g, '-')}>{title}</div>
                {display && <div className="flex space-x-5">
                    {isSelectedCustom && (
                        <I18nProvider locale="en-GB">
                            <DateRangePicker
                                maxValue={now}
                                value={startEndDate}
                                onChange={setStartEndDate}
                                visibleMonths={3}
                            />
                        </I18nProvider>
                    )}
                    <Select
                        aria-label="Select box"
                        labelPlacement="outside-left"
                        onChange={handleSelectionChange}
                        selectedKeys={[select]}
                        className={isSelectedCustom ? "w-40" : "w-28"}
                    >
                        <SelectItem key="1D">1&nbsp;Day</SelectItem>
                        <SelectItem key="1W">1&nbsp;Week</SelectItem>
                        <SelectItem key="1M">1&nbsp;Month</SelectItem>
                        <SelectItem key="1Y">1&nbsp;Year</SelectItem>
                        <SelectItem key="CUSTOM">Custom</SelectItem>
                        <SelectItem key="MAX">Max</SelectItem>
                    </Select>
                </div>}
            </div>
            <Skeleton className="p-4 mx-auto bg-white rounded-md min-w-1/2 min-h-60" isLoaded={true}>
                <Tooltip content='Click to view in new tab' placement="top" offset={15} showArrow={true}>
                    {/* <Image onClick={handleOpenImage} className="object-cover w-3/4 h-full p-4 mx-auto bg-white rounded-md" src={`data:image/png;base64,${data}`} alt="Charts image" width={0} height={0} /> */}
                </Tooltip>
            </Skeleton>
        </div>
    );
}
