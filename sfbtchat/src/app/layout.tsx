import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MyHeader from "./Components/Myheader";
import Footer from "./Components/Footer";

import StoreProvider from './StoreProvider';
import AuthListener from "./Components/AuthListener";
import { QuizProvider } from "./Components/QuizContext";
import { ScoreProvider } from "./Components/ScoreContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoodingUp 職涯心理輔導平台",
  description: "職涯心理輔導平台",
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
          <QuizProvider>
            <ScoreProvider>
              <MyHeader />
              {children}
              <Footer />
            </ScoreProvider>
          </QuizProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
