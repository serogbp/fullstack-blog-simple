export async function FileToBlob(file: File) {
	const imageDataUrl = await readFileAsDataURL(file);
	const blob = dataURLToBlob(imageDataUrl);
	return blob;
}

const readFileAsDataURL = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result as string);
		};
		reader.onerror = () => {
			reject(new Error("Error al leer el archivo"));
		};
		reader.readAsDataURL(file);
	});
};

const dataURLToBlob = (dataURL: string): Blob => {
	const arr = dataURL.split(",");
	const mime = arr[0].match(/:(.*?);/)![1];
	const bstr = atob(arr[1]);
	let n = bstr.length;
	const u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
};
