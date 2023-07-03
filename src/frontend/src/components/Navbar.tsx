import { useEffect, useState, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { Avatar } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { User } from "../../../common/interfaces";

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
	const { t } = useTranslation();

	return (
		<div className="bg-gray-800">
			<nav className="mx-auto max-w-7xl p-4">
				<Link to={"/"} className="flex flex-shrink-0 items-center ">
					<h1 className="text-3xl font-bold text-stone-50">FullStack blog</h1>
				</Link>
			</nav>
		</div>
	);
}
