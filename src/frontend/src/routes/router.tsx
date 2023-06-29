import { createBrowserRouter } from "react-router-dom";
import Landing from "./landing.route";
import NotFound from "./not_found.route";
import { getBlogs } from "../services/api";

export enum ROUTES {
	LANDING = "/",
	BLOG_FEED = "/:blog",
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
]);

export default router;
