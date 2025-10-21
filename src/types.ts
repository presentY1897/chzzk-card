export type CardEffect = 'border' | 'shine' | 'glow' | 'sparkle' | 'interactive-sparkle';
export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type CardType = 'image' | 'video' | 'embed';

export interface CardData {
  id: number;
  clipId?: string;
  type: CardType;
  src: string;
  alt?: string;
  effects?: CardEffect[];
  title?: string;
  description?: string;
  rarity?: CardRarity;
  edition?: string;
  date?: string;
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
  makerChannel: {
    channelId: string,
    channelName: string,
    channelImageUrl: string,
    verifiedMark: boolean,
  },
  ownerChannel: {
    channelId: string;
    channelName: string;
    channelImageUrl: string;
    verifiedMark: boolean;
  }
}
