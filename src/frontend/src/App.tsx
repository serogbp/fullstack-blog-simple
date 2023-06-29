// import { useTranslation } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";

function App() {
	// const { t, i18n } = useTranslation();
	// const text = t("Welcome to React");
	// return <p className="text-3xl text-red-500">{text}</p>;
	return <RouterProvider router={router} />;
}

export default App;
