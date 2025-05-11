import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MyHeader from "./Components/Myheader";
import Footer from "./Components/Footer";

import StoreProvider from './StoreProvider';
import AuthListener from "./Components/AuthListener";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "輔導平台",
  description: "輔導平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="zh-Hant-TW">
      <body className={inter.className}>
        <StoreProvider>
          <AuthListener />
            <MyHeader />
              {children}
            <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
