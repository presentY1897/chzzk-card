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
    transition: { duration: 0.7, ease: "easeOut" },
    viewport: { once: false, amount: 0.6 },
  };

  const cardFace = isSecondSectionInView ? "back" : "front";

  const sectionsContent = (
    <>
      <motion.div className="scroll-section" {...sectionAnimation}>
        <div className="section-grid">
          <div className="text-content left-text">
            <h2>Section 1: Introduction</h2>
            <p>
              Here is the description for the first part of the product. The
              text appears on the left.
            </p>
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
            <h2>Section 2: Features</h2>
            <p>
              Now, the description is on the right. The central card flips to
              its back.
            </p>
          </div>
        </div>
      </motion.div>
      <motion.div className="scroll-section" {...sectionAnimation}>
        <div className="section-grid">
          <div className="text-content left-text">
            <h2>Section 3: Conclusion</h2>
            <p>
              And finally, the conclusion, back on the left side of the screen.
            </p>
          </div>
          <div className="spacer-column" />
          <div className="text-content" />
        </div>
      </motion.div>
    </>
  );

  // Render different layouts based on screen size
  return isMobile ? (
    // --- Mobile Layout ---
    <div className="mobile-layout-container">
      <div className="card-wrapper-mobile">
        {clip && <Card card={convertChzzkPreviewClipInfoToCardData(clip, 0)} />}
      </div>
      {sectionsContent}
    </div>
  ) : (
    // --- Desktop Layout ---
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
