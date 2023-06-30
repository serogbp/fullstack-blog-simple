import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Post } from "../../../common/interfaces";
import Layout from "../layouts/Layout";
import CardPost from "../components/CardPost";

export default function Blog() {
	const data = useLoaderData() as Post[];
	const location = useLocation();

	return (
		<Layout>
			<div className="flex flex-col gap-4">
				<Link to={`${location.pathname}/new-post`} className="rounded-md bg-blue-500 p-4 text-center font-bold text-white">
					Nuevo Post
				</Link>
				{data.map((post) => (
					<Link to={`${location.pathname}/${post.slug}`} key={post.id}>
						<CardPost post={post} />
					</Link>
				))}
			</div>
		</Layout>
	);
}
