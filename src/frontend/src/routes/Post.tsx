import { Post, PostResponse } from "../../../common/interfaces";
import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import { DateTime } from "luxon";
import Button from "../components/Button";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
import { API, API_IMAGE, deletePost } from "../services/api";

export default function Post() {
	const data = useLoaderData() as PostResponse;
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
	const { t } = useTranslation();
	const { post, isOwner } = data;
	return (
		<>
			{/* Si el usuario es dueño del blog, aparece boton editar */}
			{isOwner && (
				<div className="mb-4 flex gap-4">
					<Link to={location.pathname + "/edit"}>
						<Button text={t("edit post")} />
					</Link>

					<Button
						text={t("delete post")}
						bg="bg-red-500"
						handleClick={() => {
							deletePost(params.blog_slug ?? "", params.post_slug ?? "").then(() => {
								// TODO contemplar error al borrar
								navigate(-1);
							});
						}}
					/>
				</div>
			)}
			<div className="flex w-full max-w-3xl flex-grow flex-col gap-4 rounded-md bg-white px-8 py-4 shadow-sm">
				<img className="h-64 rounded-lg object-cover" src={API_IMAGE + post.image_url} alt="" />
				<h1 className="mb-2 text-4xl font-semibold">{post.title}</h1>
				<div className="mb-4">
					<p className="font-bold">{DateTime.fromISO(post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
					{/* // TODO tags */}
				</div>
				<p>{post.body}</p>
			</div>
		</>
	);
}
