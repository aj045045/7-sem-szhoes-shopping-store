'use client'
import React from "react";
import { WelcomeUserInterface } from "@/interfaces/admin";

/**
 * The component used for welcome message and other key functionality
 * ../PDF
 * @param post - The Post of an admin user
 * @param name - The Name of an admin user
 * @returns Welcome message with export and print the data in pdf format
*/
export function GreetingPage({ post, name }: WelcomeUserInterface) {
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
            </div>
        </div>
    );
}