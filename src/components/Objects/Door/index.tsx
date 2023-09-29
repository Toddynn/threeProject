import { Environment, useAnimations, useCursor } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Object3DNode, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { GLTFLoader } from 'three-stdlib';
import { useAnimation } from '../../../hooks/useAnimation';

export interface TableProps extends Object3DNode<Group, typeof Group> {
	preset?: PresetsType;
	scale: number;
	position?: [number, number, number];
}

export default function Door({ preset = 'sunset', scale, position, ...rest }: TableProps) {
	const containerRef = useRef<Group>(null);
	const doorRef = useRef<Group>(null);

	const { animations, scene } = useLoader(GLTFLoader, '/models/door/PORTAO.glb');

	const doorAnimations = useAnimation();
	const door = useAnimations(animations, doorRef);

	useEffect(() => {
		doorAnimations.setAnimations(door.names);
	}, [door.names]);

	const [isHovered, setIsHovered] = useState<boolean>(false);

	useEffect(() => {
		const doorAnimationAction = door.actions[door.names[doorAnimations.animationIndex!]];
		if (doorAnimationAction) {
			doorAnimationAction.loop = 2200;
			doorAnimationAction.clampWhenFinished = true;
			doorAnimationAction.reset().fadeIn(0.5).play();

			return () => {
				doorAnimationAction.fadeOut(0.5).play();
			};
		}
	}, [doorAnimations.animationIndex]);

	useCursor(isHovered);

	return (
		<group
			{...rest}
			castShadow
			receiveShadow
			dispose={null}
			position={position}
			rotation={[0, 110, 0]}
			ref={containerRef}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
		>
			<Environment preset={preset} />
			<primitive object={scene} ref={doorRef}></primitive>
		</group>
	);
}
