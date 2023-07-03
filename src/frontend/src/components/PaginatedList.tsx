import { Pagination } from "@mantine/core";

interface Props {
	totalItems: number;
	itemsPerPage: number;
	children: React.ReactNode;
	onChangePage: (page: number) => void;
}

export default function PaginatedList(props: Props) {
	return (
		<div className="flex flex-col items-center gap-8">
			<div className="flex flex-wrap gap-4">{props.children}</div>
			<Pagination onChange={props.onChangePage} total={props.totalItems / props.itemsPerPage + 1} />
		</div>
	);
}
