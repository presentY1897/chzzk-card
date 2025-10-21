import type { ChzzkClipInfo } from "@/types";
import { useEffect, useState } from "react";


const CHZZK_CLIP_INFO_API_ENDPOINT = '/api/service/v1/play-info/clip/';

export const useFetchChzzkClipInfo = (clipId?: string) => {
	const [clipInfo, setClipInfo] = useState<ChzzkClipInfo | null>(null);

	useEffect(() => {
		const fetchClipInfo = async () => {
			try {
				if (!clipId) return;
				const apiUrl = `${CHZZK_CLIP_INFO_API_ENDPOINT}${clipId}`;
				const response = await fetch(apiUrl);
				const data = await response.json();
				setClipInfo(data?.content)
			} catch (error) {
				console.error('Error fetching clip info:', error);
			}
		}
		fetchClipInfo();
	}, [clipId]);

	return clipInfo;

}