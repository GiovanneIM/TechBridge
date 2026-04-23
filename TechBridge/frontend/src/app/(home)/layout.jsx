// LAYOUT DA PÁGINA HOME - Header sem usuário

import HeaderHome from "@/components/blocks/Header/HeaderHome";
import Footer from "@/components/blocks/Footer/page";

export default function HomeLayout({ children }) {
	return (<>
		<HeaderHome/>
		{children}
		<Footer/>
	</>);
}
