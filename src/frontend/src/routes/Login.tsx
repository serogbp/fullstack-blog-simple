import { useTranslation } from "react-i18next";
import Layout from "../layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/api";

export default function Login() {
	const [form, setForm] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputName = event.target.name;
		const inputValue = event.target.value;
		setForm({
			...form,
			[inputName]: inputValue,
		});
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		login(form.email, form.password).then((data) => {
			if (data) {
				localStorage.setItem("token", data);
				navigate("/");
			} else {
				//TODO alert
				alert("error login");
			}
		});
	};

	const { t } = useTranslation();
	const navigate = useNavigate();

	return (
		<Layout>
			<div className="flex min-h-full flex-1 flex-col justify-center">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{t("login in to your account")}</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
						<div>
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								{t("email")}
							</label>
							<div className="mt-2">
								<input value={form.email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
								{t("password")}
							</label>
							<div className="mt-2">
								<input value={form.password} onChange={handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
							</div>
						</div>

						<div>
							<button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								{t("login")}
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						{t("not member")}{" "}
						<Link to={"/sign-in"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
							{t("sign up here")}
						</Link>
					</p>
				</div>
			</div>
		</Layout>
	);
}
