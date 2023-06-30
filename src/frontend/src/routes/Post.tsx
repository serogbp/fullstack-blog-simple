import { Post } from "../../../common/interfaces";
import { useLoaderData } from "react-router-dom";
import Layout from "../layouts/Layout";
import { DateTime } from "luxon";

export default function Post() {
	const post = useLoaderData() as Post;
	return (
		<Layout>
			<div className="flex w-full max-w-3xl flex-grow flex-col gap-4 rounded-md bg-white px-8 py-4 shadow-sm">
				<img className="h-64 rounded-lg object-cover" src="https://images.pexels.com/photos/11157048/pexels-photo-11157048.jpeg" alt="" />
				<h1 className="mb-2 text-4xl font-semibold">{post.title}</h1>
				<div className="mb-4">
					<p className="font-bold">{DateTime.fromISO(post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
					{/* // TODO tags */}
				</div>
				<p>{post.body}</p>
			</div>
		</Layout>
	);
}
