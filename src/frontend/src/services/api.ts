import { Post } from "../../../common/interfaces";

const API = "http://localhost:3001/";

export function login(email: string, password: string) {
	return fetch(`${API}login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	}).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}

export function signIn(email: string, password: string) {
	return fetch(`${API}sign-in`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	}).then(async (res) => {
		if (res.status === 200) {
		} else {
			throw res;
		}
	});
}

export function getBlogs() {
	return fetch(`${API}blog`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}

export function getPosts(blog_slug: string) {
	return fetch(`${API}blog/${blog_slug}`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}

export function getPost(blog_id: string, slug: string) {
	return fetch(`${API}blog/${blog_id}/post/${slug}`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data[0];
		} else {
			throw res;
		}
	});
}

export function createPost(blog_slug: string, post: Post) {
	return fetch(`${API}blog/${blog_slug}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(post),
	}).then(async (res) => {
		if (res.status === 200) {
		} else {
			throw res;
		}
	});
}
