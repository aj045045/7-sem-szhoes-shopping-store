"use client";
import { inter } from "@/langs";
import { ErrorComp, FeedbackComp, FooterComp, LoadingComp, NavbarComp, ScrollComp } from "@/components";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "@/redux";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const path = usePathname();
    return (
        <html lang="en" className="scrollbar-hide">
            <body className={`${inter.className} bg-neutral-200/75`}>
                <Provider store={store}>
                    <NextUIProvider>
                        {path !== "/" && !path.startsWith("/admin") &&
                            <>
                                <ScrollComp />
                                <NavbarComp />
                                <LoadingComp />
                                <ErrorComp />
                            </>
                        }
                        <div className="w-full min-h-screen">
                            {children}
                        </div>
                        {path !== "/" && !path.startsWith("/admin")  &&
                            <>
                                <FeedbackComp />
                                <FooterComp />
                            </>
                        }
                    </NextUIProvider>
                </Provider>
            </body>
        </html>
    );
}

