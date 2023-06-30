import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Post } from "../../../common/interfaces";

export default function Blog() {
	const data = useLoaderData() as Post[];
	const location = useLocation();
	return (
		<>
			{data.map((post) => (
				<Link to={`${location.pathname}/${post.slug}`} key={post.id}>
					{post.title}
				</Link>
			))}
		</>
	);
}
