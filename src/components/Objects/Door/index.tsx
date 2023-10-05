import { Environment, useAnimations, useCursor } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Object3DNode, useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { GLTFLoader } from 'three-stdlib';
import { useAmbientAudio } from '../../../hooks/useAmbientAudio';
import { useAnimation } from '../../../hooks/useAnimation';
import { useAudio, useBackgroundAudio } from '../../../hooks/useAudio';

export interface TableProps extends Object3DNode<Group, typeof Group> {
	preset?: PresetsType;
	scale: number;
	position?: [number, number, number];
	rotation?: [number, number, number];
}

export default function Door({ preset = 'sunset', scale, position, rotation, ...rest }: TableProps) {
	const containerRef = useRef<Group>(null);
	const doorRef = useRef<Group>(null);
	const [volumeAmbientAudio, setVolumeAmbientAudio] = useState<number>(0.09);

	const { animations, scene } = useLoader(GLTFLoader, '/models/door/PESADA.glb');

	const doorAnimations = useAnimation();
	const ambientAudio = useAmbientAudio();
	const door = useAnimations(animations, doorRef);

	useEffect(() => {
		doorAnimations.setAnimations(door.names);
	}, [door.names]);

	const [isHovered, setIsHovered] = useState<boolean>(false);

	const doorOpeningAudio = useAudio('audios/openingDoor.mp3');
	const doorClosingAudio = useAudio('audios/closingDoor.mp3');
	const backgroundAudio = useBackgroundAudio(ambientAudio.ambientAudios[ambientAudio.ambientAudioIndex!]?.path, volumeAmbientAudio);
	const doorAnimationAction = door.actions[door.names[doorAnimations.animationIndex!]];

	useEffect(() => {
		if (doorAnimationAction) {
			doorAnimationAction.loop = 2200;
			doorAnimationAction.clampWhenFinished = true;
			doorAnimationAction.reset().fadeIn(0.5).play();

			setTimeout(() => {
				setVolumeAmbientAudio(1);
			}, 1980);

			doorOpeningAudio();
			return () => {
				doorAnimationAction.fadeOut(0.5).play();
				doorClosingAudio();
				setTimeout(() => {
					setVolumeAmbientAudio(0.09);
				}, 500);
			};
		}
	}, [doorAnimations.animationIndex]);

	useEffect(() => {
		if (!backgroundAudio) return;
		backgroundAudio.play();
		backgroundAudio.volume(volumeAmbientAudio);

		return () => {
			backgroundAudio.pause();
		};
	}, [ambientAudio.ambientAudioIndex, volumeAmbientAudio]);

	useCursor(isHovered);

	return (
		<group
			{...rest}
			castShadow
			receiveShadow
			dispose={null}
			position={position}
			rotation={rotation}
			ref={containerRef}
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
		>
			<Environment preset={preset} />
			<primitive object={scene} ref={doorRef}></primitive>
		</group>
	);
}
