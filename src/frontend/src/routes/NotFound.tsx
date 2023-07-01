import { useTranslation } from "react-i18next";
import Layout from "../layouts/Layout";

export default function NotFound() {
	const { t } = useTranslation();
	return (
		<>
			<div className="flex flex-1 flex-col items-center justify-center gap-8">
				<p className="text-center text-6xl font-bold">{t("error 404")}</p>
				<p className="text-center text-3xl font-bold">{t("not found")}</p>
			</div>
		</>
	);
}
