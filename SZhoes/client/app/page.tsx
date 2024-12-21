"use client";

import { comforter_Brush, montserrat_Subrayada } from "@/langs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { TypingComp } from "@/components";

export default function MainPage() {
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    if (path === "/") {
      const timer = setTimeout(() => {
        router.push("/home");
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [path, router]);

  const typingValue = [
    '"Welcome to SZhoes, Smell the Difference with SZhoes"'
  ]
  return (
    <div className="grid flex-row items-center w-full h-screen sm:grid-cols-2 grid-cols-1 select-none">
      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-end">
            <div className={`${montserrat_Subrayada.className} text-5xl lg:text-7xl`}>S</div>
            <div className={`${comforter_Brush.className} text-green-600 text-5xl lg:text-7xl`}>Z</div>
            <div className={`${montserrat_Subrayada.className} ml-2 text-4xl lg:text-5xl`}>hoes</div>
          </div>
          <div className="text-center lg:text-xl md:text-lg text-base text-neutral-600 tracking-wide mt-5 [word-spacing:5px]"><TypingComp words={typingValue} /></div>
        </div>
      </div>
      <div className="h-[100%] hidden overflow-hidden sm:flex items-center justify-end mr-20">
        <div className={`${montserrat_Subrayada.className} text-8xl lg:text-[300px]`}>S</div>
        <div className={`${comforter_Brush.className} text-green-600 text-8xl lg:text-[300px]`}>Z</div>
      </div>
    </div>
  )
}

