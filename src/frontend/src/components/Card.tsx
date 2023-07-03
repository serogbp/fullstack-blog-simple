interface Props {
	children?: React.ReactNode;
}

export default function Card(props: Props) {
	return <div className="flex h-full max-w-lg flex-col rounded-md bg-white p-4 shadow-sm">{props.children}</div>;
}
