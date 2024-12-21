import React from "react";
import { ProductInterface } from "../product/interface";

export interface ErrorData {
    [key: string]: {
        border: string;
        shadow: string;
        textColor: string;
        dataColor: string;
        modal: string;
        icon: React.ReactNode;
    };
}

export interface FooterProduct {
    type: string;
    list: {
        link: string;
        data: string;
    }[]
}

export interface NavBarItem {
    page: string;
    link: string;
}

export interface SearchInterface {
    id: number,
    link: string,
    name: string
}

export interface ProductDetailInterface {
    products: ProductInterface[],
    title: string
}

export interface TypingInterface {
    words: string[];
    loop?: number;
    langClass?: string;
}


export interface FormatNumberOptions {
    thousandSuffix?: string;
    millionSuffix?: string;
    billionSuffix?: string;
}

export interface OtpInputInterface {
    length: number;
    onChange: (otp: string) => void;
}


