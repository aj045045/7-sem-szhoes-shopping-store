import type { Metadata } from "next";
import "@/styles/globals.css";
import { RootLayout } from "./providers";

export const metadata: Metadata = {
  title: {
    default: 'SZhoes',
    template: '%s | SZhoes',
  },
  manifest: "/manifest.json",
  description: 'SZhoes shopping store',
  icons:"/icon.png",
  authors: [
    {
      name: 'Ansh Yadav',
      url: 'https://www.linkedin.com/in/ansh-yadav-0ab92424b/',
    },
  ],
};

export default RootLayout;