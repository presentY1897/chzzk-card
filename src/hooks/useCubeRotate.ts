import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CubeTiltEventHandlers = {
	onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
	onMouseLeave: () => void;
	onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
	onTouchEnd: () => void;
	onTouchCancel: () => void;
};

type CubeTiltConfig = {
	activate: boolean;
	maxRotateX: number;
	maxRotateY: number;
}

const DEFAULT_CUBE_TILT_CONFIG: CubeTiltConfig = {
	activate: true,
	maxRotateX: 20,
	maxRotateY: 20,
}

export const useCubeTilt = (config: Partial<CubeTiltConfig> = {}) => {
	const { activate, maxRotateX, maxRotateY } = { ...DEFAULT_CUBE_TILT_CONFIG, ...config };
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const rotateX = useTransform(x, [-100, 100], [-maxRotateX, maxRotateX]);
	const rotateY = useTransform(y, [-100, 100], [-maxRotateY, maxRotateY]);

	const ref = useRef<HTMLDivElement>(null);

	const handlePointerMove = (clientX: number, clientY: number) => {
		if (!ref.current || !activate) return;
		const rect = ref.current.getBoundingClientRect();
		const localX = clientX - rect.left;
		const localY = clientY - rect.top;
		const xPct = localX / rect.width - 0.5;
		const yPct = localY / rect.height - 0.5;
		x.set(yPct * -200);
		y.set(xPct * 200);

		ref.current.style.setProperty('--x', `${localX}px`);
		ref.current.style.setProperty('--y', `${localY}px`);
	};

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		handlePointerMove(event.clientX, event.clientY);
	};

	const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
		const touch = event.touches[0];
		if (touch) {
			handlePointerMove(touch.clientX, touch.clientY);
		}
	};

	const handlePointerLeave = () => {
		if (!ref.current || !activate) return;
		animate(x, 0, { duration: 0.3, ease: 'easeOut' });
		animate(y, 0, { duration: 0.3, ease: 'easeOut' });
		ref.current.style.setProperty('--x', `50%`);
		ref.current.style.setProperty('--y', `50%`);
	};

	const eventHandlers: CubeTiltEventHandlers = {
		onMouseMove: handleMouseMove,
		onMouseLeave: handlePointerLeave,
		onTouchMove: handleTouchMove,
		onTouchEnd: handlePointerLeave,
		onTouchCancel: handlePointerLeave,
	};

	return {
		ref,
		rotateX,
		rotateY,
		eventHandlers,
	};
}

type CubeFlipConfig = {
	activate: boolean;
	initialFace: 'front' | 'back';
}

const DEFAULT_CUBE_FLIP_CONFIG: CubeFlipConfig = {
	activate: true,
	initialFace: 'front',
}

export const useCubeFlip = (config: Partial<CubeFlipConfig> = {}) => {
	const { activate, initialFace } = { ...DEFAULT_CUBE_FLIP_CONFIG, ...config };
	const rotateY = useMotionValue(initialFace === 'front' ? 0 : 180);
	const [face, setFace] = useState(initialFace);

	useEffect(() => {
		animate(rotateY, face === 'front' ? 0 : 180, { duration: 1, ease: 'easeOut' });
	}, [face, rotateY]);

	const handleOnClick = () => {
		if (!activate) return;
		setFace(prev => prev === 'front' ? 'back' : 'front');
	}

	return {
		rotateY,
		handleOnClick,
	}

}

type CubeRotationConfig = {
	tiltConfig: Partial<CubeTiltConfig>;
	flipConfig: Partial<CubeFlipConfig>;
};

type CubeEventHandlers = {
	onClick: () => void;
} & CubeTiltEventHandlers;


export const useCubeRotation = (config: Partial<CubeRotationConfig> = {}) => {
	const { tiltConfig, flipConfig } = config;
	const { ref, rotateX, rotateY: tiltRotateY, eventHandlers: cubeTiltEventHandlers } = useCubeTilt(tiltConfig);
	const { rotateY: flipRotateY, handleOnClick } = useCubeFlip(flipConfig);

	const rotateY = useTransform(
		[tiltRotateY, flipRotateY],
		([latestTilt, latestFlip]: number[]) => latestTilt + latestFlip
	);

	const eventHandlers: CubeEventHandlers = {
		...cubeTiltEventHandlers,
		onClick: handleOnClick
	}

	return { ref, rotateX, rotateY, eventHandlers };
}