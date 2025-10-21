import type { ChzzkClipInfo, ChzzkClipPreviewInfo } from "@/types";
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

const CHZZK_CLIP_RECOMMENDED_LIST_API_ENDPOINT = "/api/service/v1/home/recommended/clips";

export const useFetchChzzkClipRecommendedList = () => {
	const [clipList, setClipList] = useState<ChzzkClipPreviewInfo[]>([]);

	useEffect(() => {
		const fetchClipList = async () => {
			try {
				const options = '';// '?filterType=WITHIN_1_DAY&orderType=RECOMMEND';
				const apiURL = `${CHZZK_CLIP_RECOMMENDED_LIST_API_ENDPOINT}${options}`;
				const response = await fetch(apiURL);
				const data = await response.json();
				setClipList(data?.content?.data);
			} catch (error) {
				console.error('Error fetching clip list:', error);
			}
		}
		fetchClipList();
	}, []);

	return clipList;

}