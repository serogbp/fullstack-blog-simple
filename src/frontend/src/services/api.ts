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

export function getBlog(blog_slug: string) {
	return fetch(`${API}blog/${blog_slug}`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}

export function getPosts(blog_slug: string) {
	return fetch(`${API}blog/${blog_slug}/post`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}

export function getPost(blog_id: string, slug: string) {
	return fetch(`${API}blog/${blog_id}/post/${slug}`, {
		headers: {
			Authorization: localStorage.getItem("token") ?? "",
		},
	}).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return {
				post: data.post,
				isOwner: data.isOwner,
			};
		} else {
			throw res;
		}
	});
}

export function createPost(blog_slug: string, post: Post) {
	return fetch(`${API}blog/${blog_slug}/post/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			blog_slug,
			post,
		}),
	}).then(async (res) => {
		if (res.status === 200) {
		} else {
			throw res;
		}
	});
}

export function updatePost(blog_slug: string, post: Post) {
	return fetch(`${API}blog/${blog_slug}/post/${post.slug}`, {
		method: "PATCH",
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

export function deletePost(blog_slug: string, post_slug: string) {
	return fetch(`${API}blog/${blog_slug}/post/${post_slug}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ blog_slug, post_slug }),
	}).then(async (res) => {
		if (res.status === 200) {
		} else {
			throw res;
		}
	});
}
