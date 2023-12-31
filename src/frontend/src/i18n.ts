import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	es: {
		translation: {
			"Welcome to React": "Bienvenido a React y react-i18next",
			"new post": "Nueva entrada",
			login: "Iniciar sesión",
			logout: "Cerrar sesión",
			"login in to your account": "Iniciar sesión en tu cuenta",
			"create new account": "Crear nueva cuenta",
			"create account": "Crear cuenta",
			email: "Correo electrónico",
			password: "Contraseña",
			"already member": "¿Ya tienes una cuenta?",
			"not member": "¿No tienes una cuenta?",
			"sign up here": "Regístrate aquí",
			"login here": "Iniciar sesión aquí",
			"edit post": "Editar entrada",
			"delete post": "Eliminar entrada",
			"create post": "Crear entrada",
			"create blog": "Crear blog",
			"edit blog": "Editar blog",
			"delete blog": "Eliminar blog",
			title: "Título",
			body: "Contenido",
			excerpt: "Resumen",
			slug: "Slug",
			"generate slug": "Generar slug",
			visibility: "Visibilidad",
			image_url: "URL de la imagen",
			username: "Nombre de usuario",
			"not found": "No encontrado",
			"error 404": "Error 404",
			"your blogs": "Tus blogs",
			"user blogs": "Blogs de {{user}}",
			"featured image": "Imagen destacada",
			"DropZoneImage title": "Arrastre la imagen destacada aquí o haga clic para seleccionar el archivo",
			"DropZoneImage description": "El archivo no debe superar los 5mb",
			"DropZoneImage not compatible": "El archivo no compatible o tamaño excede el máximo permitido",
		},
	},
	en: {
		translation: {
			"Welcome to React": "Welcome to React and react-i18next",
			"new post": "New post",
			login: "Login",
			logout: "Logout",
			"login in to your account": "Login in to your account",
			"create new account": "Create new account",
			"create account": "Create account",
			email: "Email",
			password: "Password",
			"already member": "Already member?",
			"not member": "Not member?",
			"sign up here": "Sign up here",
			"login here": "Login here",
			"edit post": "Edit post",
			"delete post": "Delete post",
			"create post": "Create post",
			"create blog": "Create blog",
			"edit blog": "Edit blog",
			"delete blog": "Delete blog",
			title: "Title",
			body: "Body",
			excerpt: "Excerpt",
			slug: "Slug",
			"generate slug": "Generate slug",
			visibility: "Visibility",
			image_url: "Image URL",
			username: "Username",
			"not found": "Not found",
			"error 404": "Error 404",
			"your blogs": "Your blogs",
			"user blogs": "Blogs of {{user}}",
			"featured image": "Featured image",
			"DropZoneImage title": "Drag and drop the featured image here or click to select the file",
			"DropZoneImage description": "The file should not exceed 5mb",
			"DropZoneImage not compatible": "The file is not compatible or exceeds the maximum allowed",
		},
	},
};

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "es", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		interpolation: {
			escapeValue: false, // react already safes from xss
		},
	});

export default i18n;
