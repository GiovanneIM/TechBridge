// LAYOUT RAIZ - SEM HEADER E FOOTER

import { AuthProvider, useAuth } from "@/context/AuthContext";
import "./globals.css";

// Fontes
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local"

import LogOut from "@/components/blocks/Overlays/LogOut";
import NotAuthenticated from "@/components/blocks/Overlays/NotAuthentificated";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const gentySans = localFont({
	src: "../fonts/GentySans-Regular.woff2",
	variable: "--font-genty",
	display: "swap",
});

// Icone da página
export const metadata = {
	title: "TechBridge",
	icons: {
		icon: "/TechBridge/tb.svg",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt-br">
			<body
				className={`
					${geistSans.variable} ${geistMono.variable} ${gentySans.variable} antialiased
					`}
			>
				<AuthProvider>
					<LogOut/>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}
