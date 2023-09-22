import { Environment, useAnimations, useGLTF } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Object3DNode } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Group } from 'three';
import { useAnimation } from '../../../hooks/useAnimation';

export type Characters = 'alien' | 'demon' | 'ninja' | 'woman' | undefined;

export interface CharacterProps extends Object3DNode<Group, typeof Group> {
	presets?: PresetsType;
	scale?: number;
	position?: [number, number, number];
	path: string;
	doubleClicked?: Characters;
}

export default function Character({ presets, scale, position, path, doubleClicked, ...rest }: CharacterProps) {
	const groupRef = useRef<Group>(null);

	useGLTF.preload(path);
	const { scene, animations } = useGLTF(path);

	const { setAnimations, animationIndex } = useAnimation();
	const { actions, names } = useAnimations(animations, groupRef);

	useEffect(() => {
		setAnimations(names);
	}, [names]);

	useEffect(() => {
		if (animationIndex === undefined) return;
		actions[names[animationIndex]]?.reset().fadeIn(0.5).play();
		return () => {
			actions[names[animationIndex]]?.fadeOut(0.5);
		};
	}, [animationIndex]);

	return (
		<group {...rest} ref={groupRef} dispose={null}>
			<mesh scale={scale} position={position} castShadow>
				<primitive object={scene} />;
				<Environment preset={presets} />
			</mesh>
		</group>
	);
}
