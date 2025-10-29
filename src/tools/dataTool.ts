import type { CardData, ChzzkClipPreviewInfo } from "@/types";


export const convertChzzkPreviewClipInfoToCardData = (clipInfo: ChzzkClipPreviewInfo, id: number) => {
	const cardData: CardData = {
		id,
		effects: ['border', 'sparkle'],
		src: clipInfo.thumbnailImageUrl,
		clipId: clipInfo.clipUID,
		title: clipInfo.clipTitle,
		edition: {
			name: clipInfo.ownerChannel?.channelName,
			imageUrl: clipInfo.ownerChannel?.channelImageUrl,
		},
		date: clipInfo.createdDate,
	}
	return cardData;
}