import { useLoaderData } from "react-router-dom";
import { Post } from "../../../common/interfaces";

export default function Blog() {
	const data = useLoaderData() as Post[];
	return (
		<>
			{data.map((post) => (
				<div key={post.id}>{post.title}</div>
			))}
		</>
	);
}
