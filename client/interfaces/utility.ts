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