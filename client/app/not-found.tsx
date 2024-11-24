"use client";
import { comforterBrush, montserratSubrayada } from "@/langs";
import { Button, Progress } from "@nextui-org/react";

export default function NotFoundApp() {
  return (
    <div className="w-full h-screen items-center justify-center flex flex-col">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className={`${comforterBrush.className} text-green-600 text-9xl lg:text-[200px]`}>404</div>
        <div className="flex flex-row space-x-3 items-center">
          <div className={`${montserratSubrayada.className} text-2xl [word-spacing:10px]`}>Page Not Found</div>
          <Button radius="none" className="bg-green-500" onClick={() => window.history.back()}>Go Back -&gt;</Button>
        </div>
      </div>
      <Progress size="sm" isIndeterminate className="max-w-md" aria-label="Loading..." color="success" />
      <div className="flex flex-row items-end mt-5">
        <div className={`${montserratSubrayada.className} text-4xl`}>S</div>
        <div className={`${comforterBrush.className} text-green-600 text-3xl`}>Z</div>
        <div className={`${montserratSubrayada.className} ml-2 text-2xl`}>hoes</div>
      </div>
    </div >
  );
}
