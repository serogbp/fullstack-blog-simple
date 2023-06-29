import { useTranslation } from "react-i18next";

function App() {
	const { t, i18n } = useTranslation();

	const text = t("Welcome to React");

	return <p className="text-3xl text-red-500">{text}</p>;
}

export default App;
