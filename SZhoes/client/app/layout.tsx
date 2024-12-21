import type { Metadata } from "next";
import RootLayout from "./providers";
import "@/css/globals.css";


export const metadata: Metadata = {
  title: {
    default: "SZhoes",
    template: "%s | SZhoes",
  },
  description: "Shopping store website",
  keywords: "szhoes, sz, shoes, wear, accessories, footwear",
  authors: [
    {
      name: "Ansh Yadav",
      url: "https://www.linkedin.com/in/ansh-yadav-0ab92424b/",
    }
  ],
  icons: "/icon.png",
};

export default RootLayout;