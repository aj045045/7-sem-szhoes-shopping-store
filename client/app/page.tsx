"use client";
import { comforterBrush, montserratSubrayada } from "@/langs";
import { Progress } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GiRunningShoe } from "react-icons/gi";

export default function MainApp() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10; // Should increase by 10
        // return prev;
      });
    }, 500);

    if (progress === 100) {
      setTimeout(() => {
        router.push("/u/home");
      }, 500);
    }
    return () => clearInterval(interval);
  }, [progress, router]);

  return (
    <div className="w-full h-screen items-center justify-center flex flex-col">
      <div className="flex flex-row items-center justify-center mb-8">
        <div className={`${montserratSubrayada.className} text-8xl lg:text-[150px]`}>S</div>
        <div className={`${comforterBrush.className} text-green-600 text-8xl lg:text-[150px]`}>Z</div>
      </div>
      <Progress size="sm" value={progress} className="max-w-md" aria-label="Loading..." color="success" />
      <div className="flex flex-row items-end mt-5">
        <div className={`${montserratSubrayada.className} text-4xl`}>S</div>
        <div className={`${comforterBrush.className} text-green-600 text-3xl`}>Z</div>
        <div className={`${montserratSubrayada.className} ml-2 text-2xl`}>hoes</div>
      </div>
      <div className="flex flex-row space-x-2 items-center">
        <div className="text-2xl"><GiRunningShoe /></div>
        <div className="text-md text-center mt-2 text-neutral-600">&quot;Welcome to SZhoes, Smell the Difference with SZhoes&quot;</div>
      </div>
    </div>
  );
}
