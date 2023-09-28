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
	const containerRef = useRef<Group>(null);
	const doorRef = useRef<Group>(null);

	const { animations, scene } = useLoader(GLTFLoader, '/models/door/PortaLisaTexturizada.glb');

	const doorAnimations = useAnimation();
	const door = useAnimations(animations, doorRef);

	useEffect(() => {
		doorAnimations.setAnimations(door.names);
	}, [door.names]);

	const [isHovered, setIsHovered] = useState<boolean>(false);

	useEffect(() => {
		const doorAnimationAction = door.actions[door.names[doorAnimations.animationIndex!]];
		if (doorAnimationAction) {
			doorAnimationAction.reset().fadeIn(0.5).play();

			return () => {
				doorAnimationAction.reset().fadeOut(0.5).play();
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
			<primitive object={scene} ref={doorRef}></primitive>
			{/* <group castShadow receiveShadow name="Scene">
				<group castShadow receiveShadow name="Porta" position={[0.08, 0, -0.408]} ref={doorRef}>
					<mesh castShadow receiveShadow name="G-__557517" geometry={nodes['G-__557517'].geometry} material={materials.Fechadura} />
					<mesh castShadow receiveShadow name="G-__557517_1" geometry={nodes['G-__557517_1'].geometry} material={materials.Dobradica} />
					<mesh castShadow receiveShadow name="G-__557517_2" geometry={nodes['G-__557517_2'].geometry} material={materials.Parafuso} />
					<mesh castShadow receiveShadow name="G-__557517_3" geometry={nodes['G-__557517_3'].geometry} material={materials.Preto} />
					<mesh castShadow receiveShadow name="G-__557517_4" geometry={nodes['G-__557517_4'].geometry} material={materials.Porta} />
					<mesh
						castShadow
						receiveShadow
						name="Trinco"
						geometry={nodes.Trinco.geometry}
						material={materials.Fechadura}
						position={[-0.024, 0.009, 0.748]}
						rotation={[-0.017, 0, 0]}
					/>
				</group>
				<group
					castShadow
					receiveShadow
					name="Marco"
					position={[-0.08, 1.126, 0.461]}
					rotation={[Math.PI, 0, Math.PI]}
					scale={[-1.009, -1, -0.962]}
					ref={marcoRef}
				>
					<mesh castShadow receiveShadow name="G-__557544" geometry={nodes['G-__557544'].geometry} material={materials.Porta} />
					<mesh castShadow receiveShadow name="G-__557544_1" geometry={nodes['G-__557544_1'].geometry} material={materials.Parafuso} />
					<mesh castShadow receiveShadow name="G-__557544_2" geometry={nodes['G-__557544_2'].geometry} material={materials.Dobradica} />
				</group>
			</group> */}
		</group>
	);
}

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
                                   <mesh castShadow receiveShadow receiveShadow castShadow receiveShadow geometry={nodes.Legs01Left.geometry} material={legsMaterial} ref={leftLegs} />
                                   <mesh castShadow receiveShadow receiveShadow castShadow receiveShadow geometry={nodes.Legs01Right.geometry} material={legsMaterial} ref={rightLegs} />
                              </>
                         );
                    case 1:
                         return (
                              <>
                                   <mesh castShadow receiveShadow receiveShadow castShadow receiveShadow geometry={nodes.Legs02Left.geometry} material={legsMaterial} ref={leftLegs} />
                                   <mesh castShadow receiveShadow receiveShadow castShadow receiveShadow geometry={nodes.Legs02Right.geometry} material={legsMaterial} ref={rightLegs} />
                              </>
                         );
                    case 2:
                         return (
                              <>
                                   <mesh castShadow receiveShadow receiveShadow castShadow receiveShadow geometry={nodes.Legs03Left.geometry} material={legsMaterial} ref={leftLegs} />
                                   <mesh castShadow receiveShadow receiveShadow castShadow receiveShadow geometry={nodes.Legs03Right.geometry} material={legsMaterial} ref={rightLegs} />
                              </>
                         );
               }
          };
     
          FRIZATAAAAAA
     
                    <group {...rest} dispose={null} castShadow receiveShadow name="Scene" position={position} onPointerEnter={() => setIsHovered(true)} onPointerLeave={() => setIsHovered(false)}>
                         <group
                              castShadow
                              receiveShadow
                              name="PortaFrizzata"
                              position={[0.006, 0, -0.401]}
                              rotation={[Math.PI, 0, Math.PI]}
                              scale={-1}
                              ref={doorRef}
                         >
                              <mesh castShadow receiveShadow name="G-__555564" geometry={nodes['G-__555564'].geometry} material={materials.Porta} />
                              <mesh castShadow receiveShadow name="G-__555564_1" geometry={nodes['G-__555564_1'].geometry} material={materials.Frizo} />
                              <mesh castShadow receiveShadow name="G-__555564_2" geometry={nodes['G-__555564_2'].geometry} material={materials.Parafuso} />
                              <mesh castShadow receiveShadow name="G-__555564_3" geometry={nodes['G-__555564_3'].geometry} material={materials.Dobradica} />
                         </group>
                         <group name="MarcoPFrizzata" rotation={[Math.PI, 0, Math.PI]} scale={[-1.009, -1, -0.962]} ref={marcoRef}>
                              <mesh castShadow receiveShadow name="G-__555627" geometry={nodes['G-__555627'].geometry} material={materials.Porta} />
                              <mesh castShadow receiveShadow name="G-__555627_1" geometry={nodes['G-__555627_1'].geometry} material={materials.Dobradica} />
                              <mesh castShadow receiveShadow name="G-__555627_2" geometry={nodes['G-__555627_2'].geometry} material={materials.Parafuso} />
                              <mesh castShadow receiveShadow name="G-__555627_3" geometry={nodes['G-__555627_3'].geometry} material={materials.Material} />
                         </group>
                    </group>
          */
