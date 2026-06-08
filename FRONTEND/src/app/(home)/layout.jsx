// LAYOUT DA PÁGINA HOME - Header sem usuário

import HeaderHome from "@/components/blocks/Header/HeaderHome";
import Footer from "@/components/blocks/Footer/page";
import NavigateToTop from "@/components/btnNav/ToTop";

export default function HomeLayout({ children }) {
	return (<>
		<HeaderHome />
		<NavigateToTop />

		{children}
		<Footer />
	</>);
}
