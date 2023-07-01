import { Link, Outlet, useLoaderData } from "react-router-dom";
import { Blog, User } from "../../../common/interfaces";
import Layout from "../layouts/Layout";
import Card from "../components/Card";
import CardBlog from "../components/CardBlog";

export default function Landing() {
	const blogs = useLoaderData() as Blog[];

	return (
		<>
			<div className="flex flex-col gap-4">
				<h2 className="text-3xl font-semibold">Blogs destacados:</h2>
				{blogs.map((blog) => (
					<Link to={`/${blog.slug}`} key={blog.id}>
						<CardBlog blog={blog} />
					</Link>
				))}
			</div>

			<Outlet />
		</>
	);
}
