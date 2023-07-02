import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Blog, Post } from "../../../common/interfaces";
import Layout from "../layouts/Layout";
import CardPost from "../components/CardPost";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

export default function Blog() {
	const data = useLoaderData() as Post[];
	const location = useLocation();
	const { t } = useTranslation();

	return (
		<>
			<div className="mb-4 flex gap-4">
				<Link to={`${location.pathname}/new-post`}>
					<Button text={t("new post")} />
				</Link>
				<Link to={location.pathname + "/edit"}>
					<Button text={t("edit blog")} />
				</Link>
				<Button text={t("delete blog")} bg="bg-red-500" handleClick={() => {}} />
			</div>

			{/* <h1 className="mb-2 text-4xl font-semibold">{blog.name}</h1>
			<p className="max-w-prose">{blog.description}</p> */}

			<div className="flex flex-col gap-4">
				{data.map((post) => (
					<Link to={`${location.pathname}/${post.slug}`} key={post.id}>
						<CardPost post={post} />
					</Link>
				))}
			</div>
		</>
	);
}
