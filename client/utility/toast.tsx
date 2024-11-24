import { FaCheckCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { toast } from "sonner";

export class ToastUtil {
    
    // REVIEW - Success Message
    static success(data: string): void {
        toast.custom((t) => (
            <div className="flex flex-row items-center bg-green-100 shadow-lg shadow-green-200 px-2 py-1 border-l-4 border-l-green-700 space-x-3 rounded-none">
                <div className="flex flex-row items-center space-x-3 p-2 w-full">
                    <div className="md:text-lg text-base text-green-700">
                        <FaCheckCircle />
                    </div>
                    <div className="text-sm md:text-base text-green-700 font-semibold">
                        {data}
                    </div>
                </div>
                <div className="right-0 text-lg left-auto text-green-800 hover:bg-green-50 p-1 hover:border hover:border-green-400 rounded-full" onClick={() => toast.dismiss(t)}>
                    <IoClose />
                </div>
            </div>
        ))
    }

    // REVIEW - Error Message
    static error(data: string): void {
        toast.custom((t) => (
            <div className="flex flex-row items-center bg-red-100 shadow-lg shadow-red-200 px-2 py-1 border-l-4 border-l-red-700 space-x-3 rounded-none">
                <div className="flex flex-row items-center space-x-3 p-2 w-full">
                    <div className="md:text-lg text-base text-red-700">
                        <MdCancel />
                    </div>
                    <div className="text-sm md:text-base text-red-700 font-semibold">
                        {data}
                    </div>
                </div>
                <div className="right-0 text-lg left-auto text-red-800 hover:bg-red-50 p-1 hover:border hover:border-red-400 rounded-full" onClick={() => toast.dismiss(t)}>
                    <IoClose />
                </div>
            </div>
        ))
    }
}