import { ReactNode } from "react";
import { DefaultValues, FieldValues, UseFormReturn } from "react-hook-form";
import * as yup from 'yup';

export interface NavBarItem {
    page: string;
    link: string;
}

export interface FooterProduct {
    type: string;
    list: {
        link: string;
        data: string;
    }[]
}

export interface FormWrapperInterface<T extends FieldValues> {
    children: (
        register: UseFormReturn<T>['register'],
        errors: UseFormReturn<T>['formState']['errors'],
        form?: UseFormReturn<T>,
    ) => ReactNode;
    className?: string;
    onSubmit: (data: T) => void;
    validationSchema: yup.ObjectSchema<T>;
    defaultValues?: DefaultValues<T>;
}

export interface FormatNumberOptions {
    thousandSuffix?: string;
    millionSuffix?: string;
    billionSuffix?: string;
}


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
export interface ChartInterface {
    title: string;
    imagePath: string;
    display?: string;
}