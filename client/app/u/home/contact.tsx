import { montserratSubrayada } from "@/langs";
import { FiPhoneCall } from "react-icons/fi";
import { MdMailOutline } from "react-icons/md";

/**
 * The components that is used to display the customer support detail
 * 
 * @returns Customer support 
 */
export function ContactPage() {
    return (
        <div className="flex flex-col items-center bg-white w-11/12 mx-auto p-4 my-10 rounded-sm shadow-md shadow-neutral-300">
            <div className="flex flex-col items-center space-y-3 mt-5">
                <span className={`${montserratSubrayada.className} lg:text-2xl text-xl ml-10 md:[word-spacing:15px] text-center w-full hyphens-auto [word-spacing:5px]`}>Customer support</span>
                <span className="text-neutral-600 text-sm md:text-md">We are here to support 24/7</span>
            </div>
            <div className="flex md:flex-row flex-col space-y-4 items-center justify-evenly w-full my-6">
                <div className="flex flex-row items-center space-x-5 md:space-x-10">
                    <span className="bg-sky-300 rounded-full p-3 md:text-2xl text-xl"><FiPhoneCall /></span>
                    <div className="flex flex-col">
                        <span className="text-neutral-500 md:text-md text-sm">Phone</span>
                        <span>972-451-0123</span>
                    </div>
                </div>
                <div className="flex flex-row items-center space-x-5 md:space-x-10">
                    <span className="bg-yellow-300 rounded-full p-3 md:text-2xl text-xl"><MdMailOutline /></span>
                    <div className="flex flex-col">
                        <span className="text-neutral-500 md:text-md text-sm">Mail</span>
                        <span>Edyth_Balistreri88@example.org</span>
                    </div>
                </div>
            </div>
        </div>
    );
}