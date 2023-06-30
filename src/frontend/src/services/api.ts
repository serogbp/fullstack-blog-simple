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

export function getPosts(blog_id: string) {
	return fetch(`${API}blog/${blog_id}`).then(async (res) => {
		if (res.status === 200) {
			const data = await res.json();
			return data;
		} else {
			throw res;
		}
	});
}
