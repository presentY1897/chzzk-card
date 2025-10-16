import { animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CubeTiltEventHandlers = {
	onMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
	onMouseLeave: () => void;
	onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
	onTouchEnd: () => void;
	onTouchCancel: () => void;
};

type CubeEventHandlers = {
	onClick: () => void;
} & CubeTiltEventHandlers;


export const useCubeRotation = (initialFace: 'front' | 'back' = 'front') => {
	const { ref, rotateX, rotateY: tiltRotateY, eventHandlers: cubeTiltEventHandlers } = useCubeTilt();
	const { rotateY: flipRotateY, handleOnClick } = useCubeFlip(initialFace);

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

export const useCubeTilt = () => {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const rotateX = useTransform(x, [-100, 100], [-20, 20]);
	const rotateY = useTransform(y, [-100, 100], [-20, 20]);

	const ref = useRef<HTMLDivElement>(null);

	const handlePointerMove = (clientX: number, clientY: number) => {
		if (!ref.current) return;
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
		if (!ref.current) return;
		x.set(0);
		y.set(0);
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

export const useCubeFlip = (initialFace: 'front' | 'back' = 'front') => {
	const rotateY = useMotionValue(initialFace === 'front' ? 0 : 180);
	const [face, setFace] = useState(initialFace);

	useEffect(() => {
		animate(rotateY, face === 'front' ? 0 : 180, { duration: 1, ease: 'easeOut' });
	}, [face, rotateY]);

	const handleOnClick = () => {
		setFace(prev => prev === 'front' ? 'back' : 'front');
	}

	return {
		rotateY,
		handleOnClick,
	}

}