import { Environment, useGLTF } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Object3DNode } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

export interface TableProps extends Object3DNode<Group, typeof Group> {
	preset?: PresetsType;
	scale: number;
	position?: [number, number, number];
}

/* const ANIM_SPEED = 12; */

export default function Door({ preset = 'night', scale, position, ...rest }: TableProps) {
	const groupRef = useRef<Group>(null);

	const { nodes, materials } = useGLTF('/models/door/Door.gltf');

	console.log(nodes, materials);

	/* const { legs, legsColor, plateColor, tableWidth, legsMaterial, setLegsMaterial, plateMaterial, setPlateMaterial } = useConfigurator();

	useEffect(() => {
		// @ts-ignore
		legsMaterial.color = new Color(legsColor);
	}, [legsColor]);

	useEffect(() => {
		// @ts-ignore
		plateMaterial.color = new Color(plateColor);
	}, [plateColor]);

	useEffect(() => {
		setLegsMaterial(legsMaterial);
	}, [legsMaterial]);

	useEffect(() => {
		setPlateMaterial(plateMaterial);
	}, [plateMaterial]);

	useFrame((_sate, delta) => {
		const tableWidthScale = tableWidth / 100;
		const plateScale = new Vector3(tableWidthScale, 1, 1);
		plate.current?.scale.lerp(plateScale, delta * ANIM_SPEED);

		const leftLegsScale = new Vector3(-1.5 * tableWidthScale, 0, 0);
		leftLegs.current?.position.lerp(leftLegsScale, delta * ANIM_SPEED);

		const rightLegsScale = new Vector3(1.5 * tableWidthScale, 0, 0);
		rightLegs.current?.position.lerp(rightLegsScale, delta * ANIM_SPEED);
	});

	const plate = useRef<Mesh>(null);
	const leftLegs = useRef<Mesh>(null);
	const rightLegs = useRef<Mesh>(null);

	const renderLegs = () => {
		switch (legs) {
			case 0:
				return (
					<>
						<mesh receiveShadow castShadow geometry={nodes.Legs01Left.geometry} material={legsMaterial} ref={leftLegs} />
						<mesh receiveShadow castShadow geometry={nodes.Legs01Right.geometry} material={legsMaterial} ref={rightLegs} />
					</>
				);
			case 1:
				return (
					<>
						<mesh receiveShadow castShadow geometry={nodes.Legs02Left.geometry} material={legsMaterial} ref={leftLegs} />
						<mesh receiveShadow castShadow geometry={nodes.Legs02Right.geometry} material={legsMaterial} ref={rightLegs} />
					</>
				);
			case 2:
				return (
					<>
						<mesh receiveShadow castShadow geometry={nodes.Legs03Left.geometry} material={legsMaterial} ref={leftLegs} />
						<mesh receiveShadow castShadow geometry={nodes.Legs03Right.geometry} material={legsMaterial} ref={rightLegs} />
					</>
				);
		}
	};
 */
	return (
		<group {...rest} ref={groupRef} dispose={null} scale={scale} position={position}>
			<ambientLight intensity={0.2} />
			<Environment preset={preset} />
			<group position={[-0.062, 1.038, -0.006]}>
				<mesh geometry={nodes['G-__555582'].geometry} material={materials.Porta} />
				<mesh geometry={nodes['G-__555582_1'].geometry} material={materials.Dobradiça} />
				<mesh geometry={nodes['G-__555582_2'].geometry} material={materials.Parafuso} />
				<mesh geometry={nodes['G-__555582_3'].geometry} material={materials.Fechadura} />
				<mesh geometry={nodes['G-__555582_4'].geometry} material={materials.Preto} />
			</group>
			<group position={[-0.05, 1.04, -0.374]} rotation={[Math.PI, 0, Math.PI]} scale={[-1.009, -1, -0.962]}>
				<mesh geometry={nodes['G-__555591'].geometry} material={materials.Porta} />
				<mesh geometry={nodes['G-__555591_1'].geometry} material={materials.Parafuso} />
				<mesh geometry={nodes['G-__555591_2'].geometry} material={materials.Dobradiça} />
			</group>
		</group>
	);
}

useGLTF.preload('/models/door/Door.gltf');
