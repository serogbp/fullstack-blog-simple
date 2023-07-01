interface Props {
	handleClick: () => void;
	text: string;
	color?: string;
}

export default function Button(props: Props) {
	return (
		<button onClick={props.handleClick} className="rounded-md bg-blue-500 px-4 py-2 font-bold text-white shadow-sm">
			{props.text}
		</button>
	);
}
