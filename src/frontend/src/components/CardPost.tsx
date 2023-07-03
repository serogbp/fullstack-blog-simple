import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Post } from "../../../common/interfaces";
import Card from "./Card";
import { API_IMAGE } from "../services/api";

interface Props {
	post: Post;
}

export default function CardPost(props: Props) {
	const [post, setPost] = useState<Post>({ body: "", excerpt: "", image_url: "", title: "", slug: "" });

	useEffect(() => {
		setPost(props.post);
	}, [props.post]);

	let excerpt = "";

	if (!post.excerpt || post.excerpt === "") {
		excerpt = post.body.length > 50 ? post.body.substring(0, 50) + "..." : post.body;
	} else {
		excerpt = post.excerpt.length > 50 ? post.excerpt.substring(0, 50) + "..." : post.excerpt;
	}

	let image_url = "";
	if (post.image_url === "") {
		const length = 30;
		const title = post.title.length > length ? post.title.substring(0, length) + "..." : post.title;
		image_url = `https://placehold.co/600x400?text=${title}`;
	} else {
		image_url = API_IMAGE + post.image_url;
	}

	return (
		<Card>
			<img className="h-64 rounded-t-md object-cover" src={image_url} alt="" />
			<div className="max-w-sm  p-4">
				<h2 className="mb-2 break-all text-xl font-semibold">{post.title}</h2>
				<p className="text-sm text-stone-400">{DateTime.fromISO(post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
				<p>{excerpt}</p>
			</div>
		</Card>
	);
}
