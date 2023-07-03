import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Post } from "../../../common/interfaces";
import Card from "./Card";
import { API_IMAGE } from "../services/api";
import { getImageUrl } from "../utils/postImage";

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

	const image_url = getImageUrl(post.image_url ?? "", post.title);

	return (
		<Card>
			<img className="h-48 rounded-t-md object-cover" src={image_url} alt="" />
			<div className="max-w-sm  p-4">
				<h2 className="mb-2 break-all text-xl font-semibold">{post.title}</h2>
				<p className="text-sm text-stone-400">{DateTime.fromISO(post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
				<p>{excerpt}</p>
			</div>
		</Card>
	);
}
