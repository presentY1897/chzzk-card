export type CardEffect = 'border' | 'shine' | 'glow' | 'sparkle' | 'interactive-sparkle';
export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary';
export type CardType = 'image' | 'video';

export interface CardData {
  id: number;
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
