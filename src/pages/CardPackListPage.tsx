import { useState, useEffect } from "react";
import CardPack from "@/components/card-pack/CardPack";
import { useFetchChzzkClipRecommendedList } from "@/hooks/useChzzkFetch";
import type { ChzzkClipPreviewInfo } from "@/types";
import "./CardPackListPage.css";

function CardPackListPage() {
  const { data: cardList, loading, error } = useFetchChzzkClipRecommendedList();
  const [groupedPacks, setGroupedPacks] = useState<
    Record<string, ChzzkClipPreviewInfo[]>
  >({});

  useEffect(() => {
    if (cardList && cardList.length > 0) {
      const grouped = cardList.reduce((acc, item) => {
        const category = item.clipCategory || "기타";
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      }, {} as Record<string, ChzzkClipPreviewInfo[]>);
      setGroupedPacks(grouped);
    }
  }, [cardList]);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  const cardPacks = Object.keys(groupedPacks)
    .filter((category) => groupedPacks[category].length > 0)
    .map((category) => (
      <CardPack
        key={category}
        cardList={groupedPacks[category]}
        packName={category}
      />
    ));

  return <div className="card-pack-grid">{cardPacks}</div>;
}

export default CardPackListPage;
