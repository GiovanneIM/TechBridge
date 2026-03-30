// LAYOUT SECONDÁRIO - COM HEADER E FOOTER

import "../globals.css";

import Header from "@/components/blocks/Header/page";
import Footer from "@/components/blocks/Footer/page";

export default function RootLayout({ children }) {
	return (
		<>
			<Header />
			{children}
			{/* <Footer /> */}
		</>
	);
}
