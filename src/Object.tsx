import { Environment, useGLTF } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Object3DNode } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';
import { Objects } from './App';

export interface ObjectProps extends Object3DNode<Group, typeof Group> {
	presets?: PresetsType;
	scale?: number;
	position?: [number, number, number];
	path: string;
	doubleClicked: Objects;
}

export default function Object({ presets, scale, position, path, doubleClicked, ...rest }: ObjectProps) {
	const { scene, animations } = useGLTF(`${path}`);
	const groupRef = useRef<Group>(null);
	/* const { actions } = useAnimations(animations, groupRef);


	useEffect(() => {
		const anim = doubleClicked ? 'Jump' : 'Idle';

		actions[anim]?.reset().fadeIn(1).play();
		() => actions[anim]?.fadeOut(1);
	}, []); */

	return (
		<group {...rest} ref={groupRef} dispose={null}>
			<mesh scale={scale} position={position}>
				<primitive object={scene} />;
				<Environment preset={presets} />
			</mesh>
		</group>
	);
}
