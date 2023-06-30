const API = "http://localhost:3001/";

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
