import { createBrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import NotFound from "./NotFound";
import { getBlogs, getPosts } from "../services/api";
import Blog from "./Blog";

export enum ROUTES {
	LANDING = "/",
	BLOG_FEED = "/:blog_id",
	LOGIN = "/login",
	REGISTER = "/register",
	POST = "/post/:id",
	POST_EDIT = "/post/:id/edit",
	POST_NEW = "/post/new",
}

const router = createBrowserRouter([
	{
		path: ROUTES.LANDING,
		element: <Landing />,
		loader: getBlogs,
		errorElement: <NotFound />,
	},
	{
		path: ROUTES.BLOG_FEED,
		element: <Blog />,
		loader: async ({ params }) => {
			const posts = await getPosts(params.blog_id!);
			return posts;
		},
		errorElement: <NotFound />,
	},
]);

export default router;
