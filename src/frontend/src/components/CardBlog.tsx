import { Blog } from "../../../common/interfaces";
import Card from "./Card";

interface Props {
	blog: Blog;
}

export default function CardBlog(props: Props) {
	return (
		<Card>
			<p className="mb-2 text-xl font-semibold">{props.blog.name}</p>
			<p className="line-clamp-3">{props.blog.description}</p>
		</Card>
	);
}
