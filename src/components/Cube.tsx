import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useCubeRotation } from "@/hooks/useCubeRotate";
import "./Cube.css";

export interface CubeData {
  frontContent?: ReactNode;
  backContent?: ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  halfWidth: number;
  halfHeight: number;
  halfLength: number;
}

export default function Cube({
  frontContent,
  backContent,
  leftContent,
  rightContent,
  topContent,
  bottomContent,
  halfWidth,
  halfHeight,
  halfLength = 0,
}: CubeData) {
  const { ref, rotateX, rotateY, eventHandlers } = useCubeRotation();

  return (
    <div
      className="container"
      ref={ref}
      style={{
        width: `${halfWidth * 2}px`,
        height: `${halfHeight * 2}px`,
      }}
      {...eventHandlers}
    >
      <motion.div
        className="cube"
        style={{
          width: `${halfWidth * 2}px`,
          height: `${halfHeight * 2}px`,
          rotateX,
          rotateY,
        }}
      >
        <motion.div
          className="side front"
          style={{ rotateY: "0deg", translateZ: `${halfLength}px` }}
        >
          {frontContent}
        </motion.div>
        <motion.div
          className="side back"
          style={{ rotateY: "180deg", translateZ: `${halfLength}px` }}
        >
          {backContent}
        </motion.div>
        {halfLength != 0 && (
          <>
            <motion.div
              className="side left"
              style={{
                width: `${halfLength * 2}px`,
                rotateY: "-90deg",
                translateZ: `${halfLength}px`,
              }}
            >
              {leftContent}
            </motion.div>
            <motion.div
              className="side right"
              style={{
                width: `${halfLength * 2}px`,
                rotateY: "90deg",
                translateZ: `${halfHeight * 2 - halfLength}px`,
              }}
            >
              {rightContent}
            </motion.div>
            <motion.div
              className="side top"
              style={{
                height: `${halfLength * 2}px`,
                rotateX: "90deg",
                translateZ: `${halfLength}px`,
              }}
            >
              {topContent}
            </motion.div>
            <motion.div
              className="side bottom"
              style={{
                height: `${halfLength * 2}px`,
                rotateX: "-90deg",
                translateZ: `${halfHeight * 2 - halfLength}px`,
              }}
            >
              {bottomContent}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
}
