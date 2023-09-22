import { Environment, useGLTF } from '@react-three/drei';
import { PresetsType } from '@react-three/drei/helpers/environment-assets';
import { Object3DNode, useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Color, Group, Mesh, Vector3 } from 'three';
import { useConfigurator } from '../../../hooks/useConfigurator';

export interface TableProps extends Object3DNode<Group, typeof Group> {
	preset?: PresetsType;
	scale: number;
	position?: [number, number, number];
	path: string;
}

const ANIM_SPEED = 12;

export default function Table({ preset = 'night', scale, position, path, ...rest }: TableProps) {
	const groupRef = useRef<Group>(null);

	useGLTF.preload(path);
	const { nodes } = useGLTF(path);

	const { legs, legsColor, plateColor, tableWidth, legsMaterial, setLegsMaterial, plateMaterial, setPlateMaterial } = useConfigurator();

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

	return (
		<group {...rest} ref={groupRef} dispose={null} scale={scale} position={position}>
			<ambientLight intensity={0.2} />
			<Environment preset={preset} />
			<mesh receiveShadow castShadow geometry={nodes.Plate.geometry} material={plateMaterial} ref={plate} />
			{renderLegs()}
		</group>
	);
}
