export default function Footer() {
	const fechaActual = new Date();
	const añoActual = fechaActual.getFullYear();
	const copyrightSymbol = "\u00A9";
	return (
		<div className="bg-gray-800 p-4 ">
			<p className="font-bold text-stone-50">
				FullStack blog - {copyrightSymbol}
				{añoActual}
			</p>
		</div>
	);
}
