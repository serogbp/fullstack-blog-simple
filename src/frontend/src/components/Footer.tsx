import { Link } from "react-router-dom";

export default function Footer() {
	const fechaActual = new Date();
	const añoActual = fechaActual.getFullYear();
	const copyrightSymbol = "\u00A9";
	return (
		<div className="bg-gray-800 p-4">
			<div className="mx-auto max-w-7xl">
				<Link to={"/"} className="font-bold text-stone-50">
					FullStack blog - {copyrightSymbol}
					{añoActual}
				</Link>
			</div>
		</div>
	);
}
