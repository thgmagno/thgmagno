import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppNavbar } from "@/components/app-navbar";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thiago Magno | Desenvolvedor Full Stack",
  description: "Desenvolvedor Full Stack especializado em Next.js, Node.js e Java/Spring Boot. Criando soluções web modernas, escaláveis e seguras.",
  keywords: "desenvolvedor, full stack, Next.js, Node.js, Java, React, web development, Florianópolis",
  authors: [{ name: "Thiago Magno" }],
  creator: "Thiago Magno",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        cz-shortcut-listen="true"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="w-full max-w-5xl mx-auto flex flex-col flex-1">
            <AppNavbar />
            <main className="flex-1 px-4 pt-6 pb-16 md:px-6">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
