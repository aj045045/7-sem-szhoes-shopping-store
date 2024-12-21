'use client'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFoundPage() {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/");
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);
    
    return (
        <div className="flex flex-col w-1/2 mx-auto bg-white p-2 my-20 rounded-3xl shadow-lg shadow-neutral-300">
            <Image src={"/images/page-not-found.png"} alt="Login Image" width={0} height={0} className="w-full" unoptimized />
            <p className="text-neutral-600 md:text-lg sm:text-md text-sm text-center tracking-wider">The page you are looking for is not found! Try something else or go to home page</p>
        </div>
    );
};

