interface Props {
	children?: React.ReactNode;
}

export default function Card(props: Props) {
	return <div className="flex max-w-lg flex-col rounded-md bg-white shadow-sm">{props.children}</div>;
}
