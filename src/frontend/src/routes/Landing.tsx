import { Link, useLoaderData } from "react-router-dom";
import { Blog } from "../../../common/interfaces";
import Layout from "../layouts/Layout";
import Card from "../components/Card";
import CardBlog from "../components/CardBlog";

export default function Landing() {
	const data = useLoaderData() as Blog[];

	return (
		<Layout>
			<div className="flex flex-col gap-4">
				<h2 className="text-3xl font-semibold">Blogs destacados:</h2>
				{data.map((blog) => (
					<Link to={`/${blog.slug}`} key={blog.id}>
						<CardBlog blog={blog} />
					</Link>
				))}
			</div>
		</Layout>
	);
}
