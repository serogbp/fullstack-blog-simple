import { Group, Text, useMantineTheme, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, FileRejection, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

interface Props {
	onDrop: (files: File[]) => void;
}

export function DropZoneImage(props: Props) {
	const theme = useMantineTheme();
	const { t } = useTranslation();

	const [files, setFiles] = useState<File[]>([]);

	const onDrop = (files: File[]) => {
		console.log("accepted files", files);
		props.onDrop(files);
		setFiles(files);
	};

	const onReject = (files: FileRejection[]) => {
		console.log("rejected files", files);
		// TODO mostrar toast
		alert(t("DropZoneImage not compatible"));
	};

	return (
		<Dropzone onDrop={onDrop} onReject={(files) => onReject(files)} maxSize={3 * 1024 ** 2} accept={IMAGE_MIME_TYPE}>
			<Group position="center" spacing="xl" style={{ minHeight: rem(150), pointerEvents: "none" }}>
				<Dropzone.Accept>
					<IconUpload size="3.2rem" stroke={1.5} color={theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]} />
				</Dropzone.Accept>
				<Dropzone.Reject>
					<IconX size="3.2rem" stroke={1.5} color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]} />
				</Dropzone.Reject>
				<Dropzone.Idle>
					<IconPhoto size="3.2rem" stroke={1.5} />
				</Dropzone.Idle>

				{files.length > 0 && (
					<Text size="xl" truncate>
						{files[0].name}
					</Text>
				)}

				{files.length === 0 && (
					<div>
						<Text size="xl" inline>
							{t("DropZoneImage title")}
						</Text>
						<Text size="sm" color="dimmed" inline mt={7}>
							{t("DropZoneImage description")}
						</Text>
					</div>
				)}
			</Group>
		</Dropzone>
	);
}
