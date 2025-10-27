export type CardEffect = 'border' | 'shine' | 'glow' | 'sparkle' | 'interactive-sparkle';
export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface CardData {
  id: number;
  src: string;
  effects?: CardEffect[];
  rarity?: CardRarity;
  clipId?: string;
  title?: string;
  alt?: string;
  description?: string;
  edition?: {
    name: string;
    imageUrl: string;
  };
  date?: string;
}

interface ChzzkChannelInfo {
  channelId: string;
  channelName: string;
  channelImageUrl: string;
  verifiedMark: boolean;
}

export interface ChzzkClipPreviewInfo {
  clipUID: string;
  videoId: string;
  clipTitle: string;
  ownerChannelId: string;
  ownerChannel: ChzzkChannelInfo,
  thumbnailImageUrl: string;
  categoryType: string;
  clipCategory: string;
  categoryValue: string;
  duration: number,
  adult: boolean,
  createdDate: string,
  // 모름 "recId": "{\"seedClipUID\":\"Je6wKggC2U\",\"fromType\":\"GLOBAL\",\"listType\":\"RECOMMEND\",\"recommendRecId\":\"H4sIAAAAAAAA_02OS0_DMBCE_4uvtJLtvGhukROphdBIeRx6skyyTa0a20odQUH8dxaJA8ed2flmvohb9KytMsJoPxxKkpMnSN-f51nwgWwIfHi9wK0IaHDKky2jW856luRRlifxA91Rim8jpoWyk55UgNqNyFPjBfq7Bwy24qWUnWjaSpZVJ2TdiKKWohD7Sh6Oksdy3wxth5wFGe6tA5hIzjKWxI9xRKOUp1kWs12yIbcrFrnV4h6K12U9nw10-hNrGEVFTasJwtkANlRWvRqYThYnnBB-XX6XhX-K8t7cj872zjPaq_nP-P4BnZf2UxcBAAA\"}",
  readCount: number,
  // 모름 "contentLineage": "{\"contentSource\":\"RCMD\",\"contentType\":\"CLIP_MENU__RECOMMENDED_CLIP_DESC_RCMD_SCORE_REALTIME\",\"contentTag\":\"{\\\"internal\\\":\\\"X7L5qharO21eHRYHhWfqJFW6Nn2QEtk9Jb_u4gTsaOXEZe30ZXZOKT4nDLE5rHqC203bK-vwwH3r82gzSQ0Gx_iTzEJo5JBEMGKSCdPg6ssKKfLlsXMtLvS04zevKaY6TpHRzTUCV6EPxgRypaqvIIfybGTpVnYm9WSfzxkgz6G9xInAgTk_9szHePzzrSZE\\\",\\\"external\\\":{\\\"rqt\\\":\\\"DCMRSR\\\",\\\"apiRequestKey\\\":\\\"388258b5-a9cf-4c67-a7a2-cfb11036e599\\\"}}\"}",
  // 모름 "blindType": null
}

export interface ChzzkClipInfo {
  contentId: string;
  videoId: string;
  vodStatus: string;
  contentTitle: string;
  adult: boolean,
  inKey: string;
  readCount: number;
  commentCount: number;
  userAdultStatus: string;
  createdDate: string,
  makerChannel: ChzzkChannelInfo,
  ownerChannel: ChzzkChannelInfo
}
