import { useEffect, useState } from "react";
import { getPosts as getPostsApi, getPostsCount as getPostsCountApi } from "../services/api.ts";
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

	return {
		posts,
		getPosts,
		count,
	};
}
