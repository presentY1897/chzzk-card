import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type TiltEventHandlers = {
	onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
	onMouseLeave: () => void;
	onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
	onTouchEnd: () => void;
	onTouchCancel: () => void;
};

export type TiltConfig = {
	activate: boolean;
	maxRotateX: number;
	maxRotateY: number;
}

const DEFAULT_TILT_CONFIG: TiltConfig = {
	activate: true,
	maxRotateX: 20,
	maxRotateY: 20,
}

export const useTilt = (config: Partial<TiltConfig> = {}) => {
	const { activate, maxRotateX, maxRotateY } = { ...DEFAULT_TILT_CONFIG, ...config };
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

	const eventHandlers: TiltEventHandlers = {
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

export type FlipConfig = {
	activate: boolean;
	initialFace: 'front' | 'back';
	face?: 'front' | 'back';
}

const DEFAULT_FLIP_CONFIG: FlipConfig = {
	activate: true,
	initialFace: 'front',
}

export const useFlip = (config: Partial<FlipConfig> = {}) => {
	const { activate, initialFace, face: controlledFace } = { ...DEFAULT_FLIP_CONFIG, ...config };

	const rotateY = useMotionValue(initialFace === 'front' ? 0 : 180);

	const [face, setFace] = useState(initialFace);

	useEffect(() => {
		if (controlledFace !== undefined) {
			setFace(controlledFace);
		}
	}, [controlledFace]);

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

export type InteractiveTransformConfig = {
	tiltConfig: Partial<TiltConfig>;
	flipConfig: Partial<FlipConfig>;
};

type EventHandlers = {
	onClick: () => void;
} & TiltEventHandlers;


export const useInteractiveTransform = (config: Partial<InteractiveTransformConfig> = {}) => {
	const { tiltConfig, flipConfig } = config;
	const { ref, rotateX, rotateY: tiltRotateY, eventHandlers: tiltEventHandlers } = useTilt(tiltConfig);
	const { rotateY: flipRotateY, handleOnClick } = useFlip(flipConfig);

	const rotateY = useTransform(
		[tiltRotateY, flipRotateY],
		([latestTilt, latestFlip]: number[]) => latestTilt + latestFlip
	);

	const eventHandlers: EventHandlers = {
		...tiltEventHandlers,
		onClick: handleOnClick
	}

	return { ref, rotateX, rotateY, eventHandlers };
}