// LAYOUT SECONDÁRIO - COM HEADER

import "../globals.css";

import Header from "@/components/blocks/Header/page";
import Footer from "@/components/blocks/Footer/page";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
}
