export interface User {
	id?: string;
	email: string;
	password?: string;
	created_at?: string;
}

export interface Blog {
	id?: string;
	slug: string;
	user_id: string;
	name: string;
	description: string;
	created_at?: string;
}

export interface Post {
	id?: string;
	blog_id?: string;
	image_url: string;
	title: string;
	body: string;
	excerpt: string;
	slug: string;
	visibility: string;
	created_at?: string;
}

export interface Tag {
	id?: string;
	name: string;
	created_at?: string;
}

export interface Token {
	id: string;
	email: string;
	owned_blogs: string[];
}
