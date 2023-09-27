import { useAnimations, useCursor } from '@react-three/drei';
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

/* const ANIM_SPEED = 12; */

export default function Door({ preset = 'sunset', scale, position, ...rest }: TableProps) {
	const doorRef = useRef<Group>(null);
	const marcoRef = useRef<Group>(null);

	const { nodes, materials, animations } = useLoader(GLTFLoader, '/models/door/Frizzata.glb');

	const doorAnimations = useAnimation();
	const door = useAnimations(animations, doorRef);

	useEffect(() => {
		doorAnimations.setAnimations(door.names);
	}, [door.names]);

	const [isHovered, setIsHovered] = useState<boolean>(false);

	useEffect(() => {
		if (doorAnimations.animationIndex === undefined) return;

		const doorAnimationAction = door.actions[door.names[doorAnimations.animationIndex]];

		if (doorAnimationAction) {
			doorAnimationAction.fadeIn(0.5).play();
			return () => {
				doorAnimationAction.fadeOut(0.5).play();
			};
		}
	}, [doorAnimations.animationIndex]);

	useCursor(isHovered);

	/* const { actions } = useAnimations(animations, groupRef); */

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

     */

	return (
		<group {...rest} dispose={null} position={position} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
			<group name="Scene">
				<group name="PortaFrizzata" position={[0.006, 0, -0.401]} rotation={[Math.PI, 0, Math.PI]} scale={-1} ref={doorRef}>
					<mesh name="G-__555564" geometry={nodes['G-__555564'].geometry} material={materials.Porta} />
					<mesh name="G-__555564_1" geometry={nodes['G-__555564_1'].geometry} material={materials.Frizo} />
					<mesh name="G-__555564_2" geometry={nodes['G-__555564_2'].geometry} material={materials.Parafuso} />
					<mesh name="G-__555564_3" geometry={nodes['G-__555564_3'].geometry} material={materials.Dobradica} />
				</group>
				<group name="MarcoPFrizzata" rotation={[Math.PI, 0, Math.PI]} scale={[-1.009, -1, -0.962]} ref={marcoRef}>
					<mesh name="G-__555627" geometry={nodes['G-__555627'].geometry} material={materials.Porta} />
					<mesh name="G-__555627_1" geometry={nodes['G-__555627_1'].geometry} material={materials.Dobradica} />
					<mesh name="G-__555627_2" geometry={nodes['G-__555627_2'].geometry} material={materials.Parafuso} />
					<mesh name="G-__555627_3" geometry={nodes['G-__555627_3'].geometry} material={materials.Material} />
				</group>
			</group>
		</group>
	);
}
