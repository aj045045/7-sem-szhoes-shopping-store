"use client";
import { comforterBrush, montserratSubrayada } from "@/langs";
import { Progress } from "@nextui-org/react";

export default function LoadingApp() {
  return (
    <div className="w-full h-screen items-center justify-center flex flex-col">
      <div className="flex flex-row items-center justify-center mb-8">
        <div className={`${montserratSubrayada.className} text-8xl lg:text-[150px]`}>S</div>
        <div className={`${comforterBrush.className} text-green-600 text-8xl lg:text-[150px]`}>Z</div>
      </div>
      <Progress size="sm" isIndeterminate className="max-w-md" aria-label="Loading..." color="success" />
    </div >
  );
}
