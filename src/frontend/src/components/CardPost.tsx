import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Post } from "../../../common/interfaces";
import { IconTrash } from "@tabler/icons-react";
import { getImageUrl } from "../utils/postImage";

interface Props {
	post: Post;
	deletePost: (slug: string) => void;
}

export default function CardPost(props: Props) {
	const [post, setPost] = useState<Post>({ body: "", excerpt: "", image_url: "", title: "", slug: "" });
	const [hover, setHover] = useState(false);

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

	const onDeleteClick = (event: React.MouseEvent) => {
		props.deletePost(post.slug ?? "");
		event.stopPropagation();
		event.preventDefault();
	};

	return (
		<div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="relative flex max-w-lg flex-col rounded-md bg-white shadow-sm">
			<button onClick={onDeleteClick} className={`${hover ? "block" : "hidden"} absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-50 font-bold text-stone-900 hover:bg-red-200 hover:text-red-500 `}>
				<IconTrash className="p-0" />
			</button>
			<img className="h-48 rounded-t-md object-cover" src={image_url} alt="" />
			<div className="max-w-sm  p-4">
				<h2 className="mb-2 break-all text-xl font-semibold">{post.title}</h2>
				<p className="text-sm text-stone-400">{DateTime.fromISO(post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
				<p>{excerpt}</p>
			</div>
		</div>
	);
}
