import { useTranslation } from "react-i18next";
import Layout from "../layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../services/api";

export default function SignIn() {
	const [form, setform] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;
		setform({
			...form,
			[inputName]: inputValue,
		});
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		signIn(form.email, form.password).then(() => {
			// TODO contemplar errores
			navigate("/login");
		});
	};

	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Layout>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{t("create new account")}</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								{t("email")}
							</label>
							<input value={form.email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								{t("password")}
							</label>
							<input value={form.password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="mt-2 block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
						</div>

						<div>
							<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								{t("create account")}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						{t("already member")}{" "}
						<Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							{t("login here")}
						</Link>
					</p>
				</div>
			</div>
		</Layout>
	);
}
