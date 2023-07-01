import { Link, useLoaderData } from "react-router-dom";
import { Blog, User } from "../../../common/interfaces";
import Layout from "../layouts/Layout";
import CardBlog from "../components/CardBlog";
import { useTranslation } from "react-i18next";

export default function User() {
	const data = useLoaderData() as { user: User; blogs: Blog[] };
	const { t } = useTranslation();
	const { user, blogs } = data;
	return (
		<>
			<div className="flex flex-col gap-4">
				<h2 className="text-3xl font-semibold">{t("user blogs", { user: user.username })}</h2>

				{blogs.map((blog) => (
					<Link to={`/${blog.slug}`} key={blog.id}>
						<CardBlog blog={blog} />
					</Link>
				))}
			</div>
		</>
	);
}
