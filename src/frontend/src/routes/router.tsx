import { createBrowserRouter } from "react-router-dom";

import NotFound from "./NotFound";
import { getPost, getPosts } from "../services/api";
import Blog from "./Blog";
import Post from "./Post";
import PostEdit from "./PostEdit";
import Root from "./Root";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,

		errorElement: <NotFound />,
		children: [
			{
				path: "/",
				element: <Blog />,
				loader: getPosts,
			},

			{
				path: "/new-post",
				element: <PostEdit />,
			},
			{
				path: "/:post_slug",
				element: <Post />,
				loader: async ({ params }) => {
					if (params.post_slug) {
						return getPost(params.post_slug);
					} else return null;
				},
				errorElement: <NotFound />,
			},
			{
				path: "/:post_slug/edit",
				element: <PostEdit />,
				loader: async ({ params }) => {
					if (params.post_slug) {
						return getPost(params.post_slug);
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
