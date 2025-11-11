import Card from "@/components/card/Card";
import CardStack from "@/components/CardStack";
import { useFetchChzzkClipRecommendedList } from "@/hooks/useChzzkFetch";
import { convertChzzkPreviewClipInfoToCardData } from "@/tools/dataTool";

function CardStackPage() {
  const { data: cardList } = useFetchChzzkClipRecommendedList();

  return (
    <div>
      <CardStack
        cardList={cardList?.map((card, index) => (
          <Card
            key={index}
            card={convertChzzkPreviewClipInfoToCardData(card, index)}
            initialFace="front"
          />
        ))}
      />
    </div>
  );
}

export default CardStackPage;
