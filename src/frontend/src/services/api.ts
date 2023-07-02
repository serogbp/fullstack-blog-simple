import { Post, User } from "../../../common/interfaces";

const API = "http://localhost:3001/";
export const API_IMAGE = "http://localhost:3001/image/";

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

export function signIn(user: User) {
	return fetch(`${API}sign-in`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
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

export function getBlogsFromUsername(username: string) {
	return fetch(`${API}user/${username}/blog`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}
export function getUser(username: string) {
	return fetch(`${API}user/${username}`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}

export function getUserLoggedIn() {
	const token = localStorage.getItem("token");
	if (token) {
		return fetch(`${API}user/logged-in`, {
			headers: {
				Authorization: localStorage.getItem("token") ?? "",
			},
		}).then(async (res) => {
			if (res.status === 200) {
				const data = await res.json();
				return data;
			} else {
				throw res;
			}
		});
	} else {
		return null;
	}
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

export function createPost(blog_slug: string, formData: FormData) {
	return fetch(`${API}blog/${blog_slug}/post/`, {
		method: "POST",
		body: formData,
	}).then(async (res) => {
		if (res.status === 200) {
		} else {
			throw res;
		}
	});
}

export function updatePost(blog_slug: string, post_slug: string, formData: FormData) {
	return fetch(`${API}blog/${blog_slug}/post/${post_slug}`, {
		method: "PATCH",
		body: formData,
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
