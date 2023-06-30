import { createBrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import NotFound from "./NotFound";
import { getBlogs, getPost, getPosts } from "../services/api";
import Blog from "./Blog";
import Post from "./Post";

export enum ROUTES {
	LANDING = "/",
	BLOG_FEED = "/:blog_id",
	LOGIN = "/login",
	REGISTER = "/register",
	POST = "/:blog_id/:post_id",
	POST_EDIT = "/post/:post_id/edit",
	POST_NEW = "/post/new",
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
		loader: getBlogs,
		errorElement: <NotFound />,
	},
	{
		path: "/:blog_slug",
		element: <Blog />,
		loader: async ({ params }) => {
			// TODO revisar el if
			if (params.blog_slug) {
				return getPosts(params.blog_slug);
			}
		},
		errorElement: <NotFound />,
	},
	{
		path: "/:blog_id/:post_slug",
		element: <Post />,
		loader: async ({ params }) => {
			// TODO revisar el if
			if (params.blog_id && params.post_slug) {
				return getPost(params.blog_id, params.post_slug);
			}
		},
		errorElement: <NotFound />,
	},
]);

export default router;
