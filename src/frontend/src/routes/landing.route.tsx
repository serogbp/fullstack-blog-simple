import { Link, useLoaderData } from "react-router-dom";
import { Blog } from "../../../common/interfaces";

export default function Landing() {
	const data = useLoaderData() as Blog[];

	return (
		<>
			{data.map((blog) => (
				<Link to={`/${blog.id}`} key={blog.id}>
					{blog.name}
				</Link>
			))}
		</>
	);
}
