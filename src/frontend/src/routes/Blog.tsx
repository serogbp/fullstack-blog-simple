import { Link, useLoaderData, useLocation } from "react-router-dom";
import { Blog } from "../../../common/interfaces";
import CardPost from "../components/CardPost";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import PaginatedList from "../components/PaginatedList";
import { useState, useEffect } from "react";
import usePost from "../hooks/usePost";

export default function Blog() {
	const { posts, getPosts, count } = usePost();
	const [page, setPage] = useState(1);

	const ITEMS_PER_PAGE = 6;

	useEffect(() => {
		getPosts(ITEMS_PER_PAGE, page);
	}, []);

	const location = useLocation();
	const { t } = useTranslation();

	const onChangePage = (page: number) => {
		getPosts(ITEMS_PER_PAGE, page);
	};

	return (
		<div className="grid grid-cols-1 p-4 md:grid-cols-3">
			<div className="mb-4 flex gap-4">
				<Link to={`new-post`}>
					<Button text={t("new post")} />
				</Link>
			</div>

			{/* <h1 className="mb-2 text-4xl font-semibold">{blog.name}</h1>
			<p className="max-w-prose">{blog.description}</p> */}

			<div className="col-span-1 md:col-span-2">
				<PaginatedList totalItems={count} itemsPerPage={ITEMS_PER_PAGE} onChangePage={onChangePage}>
					{posts.map((post) => (
						<Link to={`${location.pathname}/${post.slug}`} key={post.id}>
							<CardPost post={post} />
						</Link>
					))}
				</PaginatedList>
			</div>
		</div>
	);
}
