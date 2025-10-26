import { useState } from "react";
import type { ChzzkClipPreviewInfo } from "@/types";
import "./CardPack.css";
import CardStack from "../CardStack";
import Cube from "../Cube";
import Card from "../card/Card";
import { convertChzzkPreviewClipInfoToCardData } from "@/tools/dataTool";

const CardPack = ({
  cardList,
  packName,
}: {
  cardList: ChzzkClipPreviewInfo[];
  packName: string;
}) => {
  const [isBackVisible, setIsBackVisible] = useState(true);

  const handleBackDoubleClick = () => {
    setIsBackVisible(false);
  };

  return (
    <div className="card-pack-container">
      <Cube
        frontContent={
          <div className="pack-front">
            <div className="pack-front-margin"></div>
            <div className="pack-front-middle">
              <div className="card-pack-strip" />
              <img
                style={{ width: "70%", transform: "rotate(-10deg)" }}
                src={"./images/chzzklogo_kor(Green).png"}
                draggable={false}
              />
              <span style={{ color: "white", fontWeight: "bold" }}>
                {packName} 팩
              </span>
              <div className="card-pack-strip downside" />
            </div>
            <div className="pack-front-margin"></div>
          </div>
        }
        backContent={
          <>
            <CardStack
              cardList={cardList
                ?.map((item: ChzzkClipPreviewInfo, index: number) => (
                  <Card
                    key={index}
                    card={convertChzzkPreviewClipInfoToCardData(item, index)}
                    initialCardFaceState="front"
                  />
                ))
                .slice(0, 10)}
            />
            <div
              onDoubleClick={handleBackDoubleClick}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                zIndex: 99999,
                display: isBackVisible ? "flex" : "none",
              }}
            >
              <div
                style={{ width: "50%", backgroundColor: "rgba(20,20,20, 1)" }}
              ></div>
              <div
                style={{ width: "50%", backgroundColor: "rgba(30, 30, 30, 1)" }}
              ></div>
            </div>
          </>
        }
        leftContent={
          <div
            style={{
              backgroundColor: "rgba(30, 30, 30, 1)",
              width: "100%",
              height: "100%",
            }}
          ></div>
        }
        rightContent={
          <div
            style={{
              backgroundColor: "rgba(30, 30, 30, 1)",
              width: "100%",
              height: "100%",
            }}
          ></div>
        }
        topContent={
          <div
            style={{
              backgroundColor: "rgba(30, 30, 30, 1)",
              width: "100%",
              height: "100%",
            }}
          ></div>
        }
        bottomContent={
          <div
            style={{
              backgroundColor: "rgba(30, 30, 30, 1)",
              width: "100%",
              height: "100%",
            }}
          ></div>
        }
        halfHeight={200}
        halfWidth={130}
        halfLength={3}
      />
    </div>
  );
};

export default CardPack;
