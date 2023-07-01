interface Props {
	handleClick?: () => void;
	text: string;
	bg?: string;
}

export default function Button(props: Props) {
	return (
		<button onClick={props.handleClick} className={`${props.bg ? props.bg : "bg-blue-500"} rounded-md px-4 py-2 font-bold text-white shadow-sm`}>
			{props.text}
		</button>
	);
}
