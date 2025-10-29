import { BASE_CARD_PACK_STYLE } from "@/config";
import Cube from "@/components/Cube";
import "./CardPack.css";

const CardPack = ({
  packName,
  tiltable = true,
  tiltDeg = { maxX: 45, maxY: 45 },
  flippable = true,
  initialFace = "front",
}: {
  packName: string;
  tiltable?: boolean;
  tiltDeg?: {
    maxX: number;
    maxY: number;
  };
  flippable?: boolean;
  initialFace?: "front" | "back";
}) => {
  const { halfWidth, halfHeight, halfLength } = BASE_CARD_PACK_STYLE;

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
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              display: "flex",
            }}
          >
            <div
              style={{ width: "50%", backgroundColor: "rgba(20,20,20, 1)" }}
            ></div>
            <div
              style={{ width: "50%", backgroundColor: "rgba(30, 30, 30, 1)" }}
            ></div>
          </div>
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
        halfHeight={halfHeight}
        halfWidth={halfWidth}
        halfLength={halfLength}
        tiltable={tiltable}
        tiltDeg={tiltDeg}
        flippable={flippable}
        initialFace={initialFace}
      />
    </div>
  );
};

export default CardPack;
