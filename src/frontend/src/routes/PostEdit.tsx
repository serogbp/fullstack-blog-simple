import { useState, useEffect } from "react";
import { Post, PostResponse } from "../../../common/interfaces";
import slugify from "slugify";
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { createPost, updatePost } from "../services/api";

export default function PostEdit() {
	const params = useParams();
	const navigate = useNavigate();
	const data = useLoaderData() as PostResponse;

	const [post, setPost] = useState<Post>({
		title: "",
		body: "",
		excerpt: "",
		slug: "",
		visibility: "public",
		image_url: "",
	});

	useEffect(() => {
		setPost(data.post);
	}, [data]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		// TODO handle errores fetch
		updatePost(params.blog_slug ?? "", post).then(() => {
			navigate(-1);
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
		<div>
			<h1>Nuevo Post</h1>
			<form action="" method="post" onSubmit={handleSubmit} className="flex flex-col gap-4 bg-stone-200 p-4">
				<div className="flex flex-col">
					<label htmlFor="title">Title</label>
					<input onChange={handleChange} value={post.title} type="text" name="title" />
				</div>
				<div className="flex flex-col">
					<label htmlFor="body">Body</label>
					<input onChange={handleChange} value={post.body} type="text" name="body" />
				</div>
				<div className="flex flex-col">
					<label htmlFor="excerpt">Excerpt</label>
					<input onChange={handleChange} value={post.excerpt} type="text" name="excerpt" />
				</div>
				<div className="flex flex-col">
					<label htmlFor="slug">Slug</label>
					<input onChange={handleChange} value={post.slug} type="text" name="slug" />
					<button onClick={generateSlug}>Generate slug</button>
				</div>
				<div className="flex flex-col">
					<label htmlFor="visibility">Visibility</label>
					<input onChange={handleChange} value={post.visibility} type="text" name="visibility" />
				</div>
				<button type="submit" className="bg-blue-500 p-4 font-bold text-stone-50">
					Enviar
				</button>
			</form>
		</div>
	);
}