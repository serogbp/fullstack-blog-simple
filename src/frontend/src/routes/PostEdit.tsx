import { useState } from "react";
import { Post } from "../../../common/interfaces";
import slugify from "slugify";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost } from "../services/api";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import { DropZoneImage } from "../components/DropZoneImage";
import { FORM_DATA } from "../../../common/enums.ts";
import { FileToBlob } from "../utils/imageHandler.ts";

export default function PostEdit() {
	const params = useParams();
	const navigate = useNavigate();
	const data = useLoaderData() as Post;
	const { t } = useTranslation();

	const [post, setPost] = useState<Post>(
		data ?? {
			title: "",
			body: "",
			excerpt: "",
			slug: "",
		}
	);
	const [originalPost, _setOriginalPost] = useState<Post>(data ?? { slug: "" });
	const [featuredImage, setFeaturedImage] = useState<File | null>(null);
	const [editMode, _setEditMode] = useState(data ? true : false);

	const handleSubmit = async () => {
		const formData = new FormData();
		formData.append("title", post.title);
		formData.append("body", post.body);
		formData.append("excerpt", post.excerpt ?? "");
		formData.append("slug", post.slug);
		formData.append("image_url", post.image_url ?? "");

		if (featuredImage !== null && featuredImage !== undefined) {
			const blob = await FileToBlob(featuredImage);
			formData.append(FORM_DATA.IMAGE, blob);
		}

		if (editMode) {
			// TODO handle errores fetch
			updatePost(originalPost.slug, formData).then(() => {
				navigate(`/${post.slug}`, { replace: true });
			});
		} else {
			// TODO handle errores fetch
			createPost(params.blog_slug ?? "", formData).then(() => {
				navigate(`/${params.blog_slug}/${post.slug}`, { replace: true });
			});
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

	const handleImageDrop = (files: File[]) => {
		setFeaturedImage(files[0]);
	};

	return (
		<>
			<h1 className="mb-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{editMode ? t("edit post") : t("create post")}</h1>
			<div className="flex w-full max-w-lg flex-col gap-4 rounded-md bg-white p-6">
				<div className="flex flex-col">
					<label htmlFor="title">{t("title")}</label>
					<input onChange={handleChange} value={post.title} type="text" name="title" className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
				</div>
				<div className="flex flex-col">
					<label htmlFor="body">{t("body")}</label>
					<textarea onChange={handleChange} value={post.body} name="body" className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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

				<DropZoneImage onDrop={handleImageDrop} />

				<div className="flex justify-end pt-6">
					<Button text={editMode ? t("edit post") : t("create post")} handleClick={handleSubmit} />
				</div>
			</div>
		</>
	);
}
