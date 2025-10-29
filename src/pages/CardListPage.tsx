import Card from "@/components/card/Card";
import { useFetchChzzkClipRecommendedList } from "@/hooks/useChzzkFetch";
import { convertChzzkPreviewClipInfoToCardData } from "@/tools/dataTool";
import type { ChzzkClipPreviewInfo } from "@/types";
import "./CardListPage.css";

const CardListPage = () => {
  const { data: cardList, loading, error } = useFetchChzzkClipRecommendedList();

  return (
    <div className="card-grid">
      {cardList?.map((item: ChzzkClipPreviewInfo, index: number) => (
        <Card
          key={index}
          card={convertChzzkPreviewClipInfoToCardData(item, index)}
          initialCardFaceState="back"
        />
      ))}
    </div>
  );
};

export default CardListPage;
