import { useEffect, useState } from "react";
import { getPosts as getPostsApi, getPostsCount as getPostsCountApi, deletePost as deletePostApi } from "../services/api.ts";
import { Post } from "../../../common/interfaces.ts";

export default function usePost() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [count, setCount] = useState(0);

	useEffect(() => {
		getPostsCount();
	}, []);

	const getPosts = (itemsPerPage: number, page: number) => {
		getPostsApi(itemsPerPage, page).then((data) => {
			setPosts(data);
		});
	};

	const getPostsCount = () => {
		getPostsCountApi().then((data) => {
			setCount(data);
		});
	};

	const deletePost = (post_slug: string) => {
		deletePostApi(post_slug ?? "").then(() => {
			const newState = posts.filter((post) => post.slug !== post_slug);
			setPosts(newState);
		});
	};

	return {
		posts,
		getPosts,
		count,
		deletePost,
	};
}
