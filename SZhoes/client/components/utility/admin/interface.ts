/**
 * The interface used for representing a data card that contains multiple metrics used for mapping.
 * 
 * @field title - The title of the Card
 * @field data - The data contain the container number of records 
 */
export interface DataCardInterface {
    title: string;
    dataList?: NumberOfCardInterface[];
    imagePath?: string;
}


/**
 * The interface used for representing a card with a number of records.
 * 
 * @field title - The title or label
 * @field value - The counting value of the record
 * @field icon - The node contain svg icon
 */
export interface NumberOfCardInterface {
    title: string;
    value: string;
    icon?: React.ReactNode;
}

/**
 * Chart UI
 * 
 * This interface is used for chart ui creation and handling
 * 
 * @field 
 */
export interface ChartInterface{
    title: string;
    imagePath:string;
    display?:string;
}