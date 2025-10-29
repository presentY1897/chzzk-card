import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useCubeRotation } from "@/hooks/useCubeRotate";
import "./Cube.css";

export interface CubeProps {
  frontContent?: ReactNode;
  backContent?: ReactNode;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  halfWidth: number;
  halfHeight: number;
  halfLength: number;
  flippable?: boolean;
  tiltable?: boolean;
  initialFace?: "front" | "back";
  tiltDeg?: {
    maxX: number;
    maxY: number;
  };
}

export default function Cube(cubeProps: CubeProps) {
  const {
    frontContent,
    backContent,
    leftContent,
    rightContent,
    topContent,
    bottomContent,
  } = cubeProps;
  const { halfWidth, halfHeight, halfLength } = cubeProps;
  const rotationConfig = {
    tiltConfig: {
      activate: cubeProps.tiltable,
      maxRotateX: cubeProps.tiltDeg?.maxX,
      maxRotateY: cubeProps.tiltDeg?.maxY,
    },
    flipConfig: {
      activate: cubeProps.flippable,
      initialFace: cubeProps.initialFace,
    },
  };

  const { ref, rotateX, rotateY, eventHandlers } =
    useCubeRotation(rotationConfig);

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
          style={{ rotateY: "180deg", translateZ: `-${halfLength}px` }}
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
                translateX: `-${halfLength}px`,
              }}
            >
              {leftContent}
            </motion.div>
            <motion.div
              className="side right"
              style={{
                width: `${halfLength * 2}px`,
                rotateY: "90deg",
                translateX: `${halfWidth * 2 - halfLength}px`,
              }}
            >
              {rightContent}
            </motion.div>
            <motion.div
              className="side top"
              style={{
                height: `${halfLength * 2}px`,
                rotateX: "90deg",
                translateY: `-${halfLength}px`,
              }}
            >
              {topContent}
            </motion.div>
            <motion.div
              className="side bottom"
              style={{
                height: `${halfLength * 2}px`,
                rotateX: "-90deg",
                translateY: `${halfHeight * 2 - halfLength}px`,
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
