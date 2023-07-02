const API = "http://localhost:3001";
export const API_IMAGE = "http://localhost:3001/image/";

export function getPosts() {
	return fetch(`${API}/post`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}

export function getPost(slug: string) {
	return fetch(`${API}/post/${slug}`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}

export function createPost(slug: string, formData: FormData) {
	return fetch(`${API}/post/${slug}`, {
		method: "POST",
		body: formData,
	}).then(async (res) => {
		if (res.status === 200) {
		} else {
			throw res;
		}
	});
}

export function updatePost(slug: string, formData: FormData) {
	return fetch(`${API}/post/${slug}`, {
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
	return fetch(`${API}/post/${post_slug}`, {
		method: "DELETE",
	}).then(async (res) => {
		if (res.status === 200) {
		} else {
			throw res;
		}
	});
}
