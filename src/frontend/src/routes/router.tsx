import { createBrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import NotFound from "./NotFound";
import { getBlogs, getPost, getPosts } from "../services/api";
import Blog from "./Blog";
import Post from "./Post";
import PostNew from "./PostNew";
import Login from "./Login";
import SignIn from "./SignIn";

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
		path: "/login",
		element: <Login />,
	},
	{
		path: "/sign-in",
		element: <SignIn />,
	},
	{
		path: "/:blog_slug",
		element: <Blog />,
		loader: async ({ params }) => {
			// TODO pasar a un fichero loaders
			if (params.blog_slug) {
				const posts = await getPosts(params.blog_slug);
				return posts;
			}
			throw new Response("", {
				status: 404,
				statusText: "Not Found",
			});
		},
		errorElement: <NotFound />,
	},
	{
		path: "/:blog_slug/new-post",
		element: <PostNew />,
	},
	{
		path: "/:blog_slug/:post_slug",
		element: <Post />,
		loader: async ({ params }) => {
			// TODO pasar a un fichero loaders
			if (params.blog_slug && params.post_slug) {
				return getPost(params.blog_slug, params.post_slug);
			}
			throw new Response("", {
				status: 404,
				statusText: "Not Found",
			});
		},
		errorElement: <NotFound />,
	},
]);

export default router;
