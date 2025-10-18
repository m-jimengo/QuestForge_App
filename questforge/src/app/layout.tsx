import type { Metadata } from "next";
import { Geist, Geist_Mono, MedievalSharp } from "next/font/google";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./globals.css";
import "./globalBackground.css";
import "./Components/Navbar/Navbar.css";
import { Providers } from "./Providers";
import Navbar from "./Components/Navbar/Navbar"; // 👈 importa tu Navbar

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const medievalFont = MedievalSharp({
  variable: "--font-medieval",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "QuestForge",
  description: "Fantasy board and user explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${medievalFont.variable}`}
      >
        <Providers>
          <div className="global-page boardFrame">
            <div className="global-mapBackground"></div>

            {/* 👇 Aquí va el Navbar para que esté en todas las páginas */}
            <Navbar />

            <main className="global-main">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
