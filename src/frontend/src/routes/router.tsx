import { createBrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import NotFound from "./NotFound";
import { getBlog, getBlogs, getBlogsFromUsername, getPost, getPosts, getUser, getUserLoggedIn } from "../services/api";
import Blog from "./Blog";
import Post from "./Post";
import PostNew from "./PostNew";
import Login from "./Login";
import SignIn from "./SignIn";
import PostEdit from "./PostEdit";
import User from "./User";
import Layout from "../layouts/Layout";
import Root from "./Root";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		loader: getUserLoggedIn,
		errorElement: <NotFound />,
		children: [
			{
				path: "/landing",
				element: <Landing />,
				loader: getBlogs,
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
				path: "/user/:username",
				element: <User />,
				loader: async ({ params }) => {
					const blogs = await getBlogsFromUsername(params.username ?? "");
					const user = await getUser(params.username ?? "");
					return {
						blogs,
						user,
					};
				},
				errorElement: <NotFound />,
			},
			{
				path: "/:blog_slug",
				element: <Blog />,
				loader: async ({ params }) => {
					// TODO pasar a un fichero loaders
					if (params.blog_slug) {
						// TODO promise.all ?
						const posts = await getPosts(params.blog_slug);
						const blog = await getBlog(params.blog_slug);
						return {
							blog,
							posts,
						};
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
			{
				path: "/:blog_slug/:post_slug/edit",
				element: <PostEdit />,
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
			},
		],
	},
]);

export default router;
