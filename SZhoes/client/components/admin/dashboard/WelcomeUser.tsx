'use client'
import React from "react";
import { Button } from "@nextui-org/button";
import { WelcomeUserInterface } from "./interface";
import { IoPrint } from "react-icons/io5";
import dynamic from "next/dynamic";
const PDFComponent = dynamic(() => import('./PDF'), {
    ssr: false, // Disable server-side rendering for this component
});

const html2pdf = typeof window !== "undefined" ? require('html2pdf.js') : null;
/**
 * The component used for welcome message and other key functionality
 * 
 * @param post - The Post of an admin user
 * @param name - The Name of an admin user
 * @returns Welcome message with export and print the data in pdf format
*/
export function WelcomeUser({ post, name }: WelcomeUserInterface) {


    const generatePDF = (elementId: string) => {
        if (typeof window === "undefined") return;

        const element = document.getElementById(elementId);
        if (!element) return;

        const opt = {
            margin: 1,
            filename: 'dashboard.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };

        html2pdf()
            .from(element)
            .set(opt)
            .save();
    };
    return (
        <div className="grid sm:grid-flow-row grid-flow-col sm:grid-cols-3 grid-cols-1 grid-rows-2 sm:grid-rows-1 items-center sm:items-start">
            <div className="bg-teal-50 text-teal-700 border-1 border-neutral-300 px-4 py-2 rounded-md sm:col-span-2 space-y-3">
                <div className="text-xl space-x-3">
                    <span>Welcome {post},</span>
                    <span className="text-3xl">{name}</span>
                </div>
                <div>Welcome to the Admin Panel. Here, you&apos;ll find the tools and resources to efficiently manage and oversee our system. For assistance, please contact our support team. Thank you for your commitment.</div>
            </div>
            <div className="flex space-x-3 mr-0 ml-auto">
                <Button onClick={() => generatePDF('content-to-pdf')} radius="none" variant="bordered" className="flex items-center border-green-600">
                    <IoPrint className="text-lg" />
                    <span>Print</span>
                </Button>
                <PDFComponent />
            </div>

        </div>
    );
}