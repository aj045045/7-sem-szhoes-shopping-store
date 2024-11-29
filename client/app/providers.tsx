'use client'
import { Toaster } from "@/components/ui/sonner";
import { ResponseInterface } from "@/interfaces/response";
import { inter } from "@/langs";
import { ToastUtil } from "@/utility/toast";
import { NextUIProvider } from "@nextui-org/react";
import { toast } from "sonner";
import { SWRConfig } from "swr";

export function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased  w-full min-h-screen bg-neutral-200/75`}>
                <NextUIProvider>
                    <SWRConfig
                        value={{
                            revalidateOnFocus:false,
                            dedupingInterval: 60000,
                            fetcher: async (url: string) => {
                                await new Promise((resolve) => setTimeout(resolve, 3000));
                                const response = await fetch(url);
                                const data: ResponseInterface = await response.json();
                                if (!response.ok || data.status == "error") {
                                    throw new Error(data.message);
                                }
                                return data.data;
                            },
                            onError: (error: Error) => {
                                ToastUtil.error(error.message);
                                // setTimeout(() => toast.dismiss(), 2000);
                            },
                        }}>
                        {children}
                        <Toaster position="top-right" expand={true} />
                    </SWRConfig>
                </NextUIProvider>
            </body>
        </html>
    );
}
