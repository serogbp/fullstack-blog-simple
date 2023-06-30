import { Link, useLoaderData } from "react-router-dom";
import { Blog } from "../../../common/interfaces";

export default function Landing() {
	const data = useLoaderData() as Blog[];

	return (
		<>
			{data.map((blog) => (
				<Link to={`/${blog.slug}`} key={blog.id}>
					{blog.name}
				</Link>
			))}
		</>
	);
}
