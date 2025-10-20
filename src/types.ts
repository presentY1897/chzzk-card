export type CardEffect =
  | "border"
  | "shine"
  | "glow"
  | "sparkle"
  | "interactive-sparkle";
export type CardRarity = "common" | "rare" | "epic" | "legendary";
export type CardType = "image" | "video" | "embed";

export interface CardData {
  id: number;
  type: CardType;
  src?: string;
  clipId?: string;
  alt?: string;
  effects?: CardEffect[];
  title?: string;
  description?: string;
  rarity?: CardRarity; // rarity 보다는 고유 컬러가 나을듯
  edition?: string;
  date?: string;
  thumbnailImageUrl?: string;
  ownerChannel?: {
    channelImageUrl?: string;
  }
}

export interface ChzzkClip {
  contentTitle: string;
  ownerChannel: {
    channelName: string;
  };
}
