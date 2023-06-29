export interface User {
	id: number;
	email: string;
	password: string | undefined;
	created_at: string;
}

export interface Blog {
	id: number;
	user_id: number;
	name: string;
	description: string;
	created_at: string;
}

export interface Post {
	id: number;
	blog_id: number;
	image_url: string;
	title: string;
	body: string;
	publish_date: string;
	excerpt: string;
	url: string;
	visibility: string;
	created_at: string;
}

export interface Tag {
	id: number;
	name: string;
}
