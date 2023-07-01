import { useState, useEffect } from "react";
import { Post, PostResponse } from "../../../common/interfaces";
import slugify from "slugify";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost } from "../services/api";
import Layout from "../layouts/Layout";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";

export default function PostEdit() {
	const params = useParams();
	const navigate = useNavigate();
	const data = useLoaderData() as PostResponse;
	const { t } = useTranslation();

	const [post, setPost] = useState<Post>(data.post);

	const handleSubmit = () => {
		// TODO handle errores fetch
		updatePost(params.blog_slug ?? "", post).then(() => {
			navigate(`/${params.blog_slug}/${post.slug}`, { replace: true });
		});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;
		setPost({
			...post,
			[inputName]: inputValue,
		});
	};

	const generateSlug = () => {
		setPost({
			...post,
			slug: slugify(post.title, {
				strict: true,
				trim: true,
				lower: true,
			}),
		});
	};

	return (
		<Layout>
			<h1 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{t("edit post")}</h1>
			<div className="flex w-full max-w-lg flex-col gap-4 rounded-md bg-white p-6">
				<div className="flex flex-col">
					<label htmlFor="title">{t("title")}</label>
					<input onChange={handleChange} value={post.title} type="text" name="title" className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
				</div>
				<div className="flex flex-col">
					<label htmlFor="body">{t("body")}</label>
					<input onChange={handleChange} value={post.body} type="text" name="body" className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
				</div>
				<div className="flex flex-col">
					<label htmlFor="excerpt">{t("excerpt")}</label>
					<input onChange={handleChange} value={post.excerpt} type="text" name="excerpt" className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
				</div>
				<div className="flex flex-col">
					<label htmlFor="slug">{t("slug")}</label>
					<input onChange={handleChange} value={post.slug} type="text" name="slug" className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
					<button onClick={generateSlug}>{t("generate slug")}</button>
				</div>
				<div className="flex flex-col">
					<label htmlFor="visibility">{t("visibility")}</label>
					<input onChange={handleChange} value={post.visibility} type="text" name="visibility" className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
				</div>

				<div className="flex justify-end pt-6">
					<Button text={t("create post")} handleClick={handleSubmit} />
				</div>
			</div>
		</Layout>
	);
}
