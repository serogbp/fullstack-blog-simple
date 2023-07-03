import { User } from "../../../common/interfaces";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface Props {
	children?: React.ReactNode;
}
export default function Layout(props: Props) {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<main className="flex flex-grow flex-col items-center bg-stone-50 py-4">{props.children}</main>
			<Footer />
		</div>
	);
}

/*
		<div className="d-flex flex-column min-vh-100">
			<Header />
			<main className="d-flex flex-column flex-grow-1">{props.children}</main>
			<Footer />
		</div>
*/
