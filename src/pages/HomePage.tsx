import Card from "@/components/card/Card";
import { useFetchChzzkClipRecommendedList } from "@/hooks/useChzzkFetch";
import { convertChzzkPreviewClipInfoToCardData } from "@/tools/dataTool";
import { motion } from "framer-motion";
import { useState } from "react";
import "./HomePage.css";

const HomePage = () => {
  const { data, loading, error } = useFetchChzzkClipRecommendedList();
  const [isSecondSectionInView, setIsSecondSectionInView] = useState(false);

  const clip =
    data && data.length > 0 ? data[(Math.random() * data.length) | 0] : null;

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error loading clips.</div>;

  const sectionAnimation = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut" as const },
    viewport: { once: false, amount: 0.6 },
  };

  const cardFace = isSecondSectionInView ? "back" : "front";

  const sectionsContent = (
    <>
      <motion.div className="scroll-section" {...sectionAnimation}>
        <div className="section-grid">
          <div className="text-content left-text">
            <h2>클립을 카드로</h2>
            <p>기억에 남을 만한 클립을 카드로 소장해보기</p>
          </div>
          <div className="spacer-column" />
          <div className="text-content" />
        </div>
      </motion.div>
      <motion.div
        className="scroll-section"
        onViewportEnter={() => setIsSecondSectionInView(true)}
        onViewportLeave={() => setIsSecondSectionInView(false)}
        {...sectionAnimation}
      >
        <div className="section-grid">
          <div className="text-content" />
          <div className="spacer-column" />
          <div className="text-content right-text">
            <h2>카드 효과들</h2>
            <p>다양한 카드 효과를 적용해보기</p>
          </div>
        </div>
      </motion.div>
      <motion.div className="scroll-section" {...sectionAnimation}>
        <div className="section-grid">
          <div className="text-content left-text">
            <h2>카드 팩</h2>
            <p>카드 팩을 개봉하기</p>
          </div>
          <div className="spacer-column" />
          <div className="text-content" />
        </div>
      </motion.div>
      <motion.div className="scroll-section" {...sectionAnimation}>
        <div className="section-grid">
          <div className="text-content left-text">
            <h2>간단한 설명</h2>
            <p>
              포켓몬 카드 게임을 보고 영감을 얻어 치지직 클립을 카드로 포장하여
              보여주는 페이지를 개발
            </p>
          </div>
          <div className="spacer-column" />
          <div className="text-content" />
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="home-layered-container">
      <div className="fixed-card-layer">
        <div className="card-wrapper">
          {clip && (
            <Card
              card={convertChzzkPreviewClipInfoToCardData(clip, 0)}
              flippable={true}
              face={cardFace}
            />
          )}
        </div>
      </div>
      <div className="scroll-content-layer">{sectionsContent}</div>
    </div>
  );
};

export default HomePage;
