import { Post } from "../../../common/interfaces";
import { useLoaderData } from "react-router-dom";

export default function Post() {
	const data = useLoaderData() as Post;
	return (
		<div>
			<h1>{data.title}</h1>
			<p>{data.body}</p>
			<p>{data.created_at}</p>
		</div>
	);
}
