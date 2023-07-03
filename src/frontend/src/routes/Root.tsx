import { Outlet, useLoaderData } from "react-router-dom";
import { User } from "../../../common/interfaces";
import Layout from "../layouts/Layout";

export default function Root() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}
