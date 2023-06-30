import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Post } from "../../../common/interfaces";

export default function Blog() {
	const data = useLoaderData() as Post[];
	const location = useLocation();
	console.log(location);
	return (
		<>
			<div className="flex flex-col gap-4">
				<Link to={`${location.pathname}/new-post`}>Nuevo Post</Link>
				{data.map((post) => (
					<Link to={`${location.pathname}/${post.slug}`} key={post.id}>
						{post.title}
					</Link>
				))}
			</div>
		</>
	);
}
