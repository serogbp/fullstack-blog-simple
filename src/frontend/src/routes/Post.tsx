import { Post } from "../../../common/interfaces";
import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import { API_IMAGE, deletePost } from "../services/api";
import { getImageUrl } from "../utils/postImage";

export default function Post() {
	const post = useLoaderData() as Post;
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
	const { t } = useTranslation();

	const image_url = getImageUrl(post.image_url ?? "", post.title);

	return (
		<>
			<div className="mb-4 flex gap-4">
				<Link to={location.pathname + "/edit"}>
					<Button text={t("edit post")} />
				</Link>

				<Button
					text={t("delete post")}
					bg="bg-red-500"
					handleClick={() => {
						deletePost(params.post_slug ?? "").then(() => {
							// TODO contemplar error al borrar
							navigate(-1);
						});
					}}
				/>
			</div>

			<div className="flex w-full max-w-3xl flex-grow flex-col gap-4 break-all rounded-md bg-white  shadow-sm">
				<img className="h-64 rounded-t-md object-cover" src={image_url} alt="" />
				<div className="px-8 py-4">
					<h1 className="mb-2 text-4xl font-semibold">{post.title}</h1>
					<div className="mb-4">
						<p className="font-bold">{DateTime.fromISO(post.created_at ?? "").toLocaleString({ day: "numeric", month: "long", year: "numeric" })}</p>
					</div>
					<pre className="whitespace-pre-wrap font-sans">{post.body}</pre>
				</div>
			</div>
		</>
	);
}
