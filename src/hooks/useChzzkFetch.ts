import type { ChzzkClipInfo, ChzzkClipPreviewInfo } from "@/types";
import { useEffect, useState } from "react";


const CHZZK_CLIP_INFO_API_ENDPOINT = '/api/service/v1/play-info/clip/';

export const useFetchChzzkClipInfo = (clipId?: string) => {
	const [clipInfo, setClipInfo] = useState<ChzzkClipInfo | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchClipInfo = async () => {
			try {
				setLoading(true);
				if (!clipId) return;
				const apiUrl = `${CHZZK_CLIP_INFO_API_ENDPOINT}${clipId}`;
				const response = await fetch(apiUrl);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setClipInfo(data?.content)
			} catch (error) {
				console.error('Error fetching clip info:', error);
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		}
		fetchClipInfo();
	}, [clipId]);

	return { data: clipInfo, loading, error };

}

const CHZZK_CLIP_RECOMMENDED_LIST_API_ENDPOINT = "/api/service/v1/home/recommended/clips";

export const useFetchChzzkClipRecommendedList = () => {
	const [clipList, setClipList] = useState<ChzzkClipPreviewInfo[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchClipList = async () => {
			try {
				setLoading(true);
				const options = '';// '?filterType=WITHIN_1_DAY&orderType=RECOMMEND';
				const apiURL = `${CHZZK_CLIP_RECOMMENDED_LIST_API_ENDPOINT}${options}`;
				const response = await fetch(apiURL);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setClipList(data?.content?.data);
			} catch (error) {
				setError(error as Error);
				console.error('Error fetching clip list:', error);
			} finally {
				setLoading(false);
			}
		}
		fetchClipList();
	}, []);

	return { data: clipList, loading, error };

}