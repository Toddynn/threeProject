import { Environment, Loader, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Dispatch, SetStateAction, Suspense } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { Modal } from '..';
import { SlideLeft } from '../../../constants/animation';
import { ExperienceDoor } from '../../Experiences/ExperienceDoor';

export interface ModalPreviewGltfProps {
	path: any;
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
}

export default function ModalPreviewGltf({ active, setActive }: ModalPreviewGltfProps) {
	const { loaded } = useProgress();

	return (
		<Modal.Root onClick={(e: any) => e.stopPropagation()} variants={SlideLeft} initial="hidden" animate="visible" exit="exit" className=" h-full w-full">
			{loaded && (
				<Modal.Content>
					<Modal.Action
						className=" absolute left-5 top-5 z-50 rounded-full bg-muted/70 p-1 hover:bg-muted/60"
						onClick={() => {
							setActive(false);
						}}
					>
						<Modal.Icon icon={BiChevronLeft} size={32}></Modal.Icon>
					</Modal.Action>

					<Canvas shadows camera={{ position: [-15, 0, 0], fov: 20, castShadow: true, receiveShadow: true }}>
						<Suspense fallback={null}>
							<ambientLight intensity={1} />
							<Environment preset={'sunset'} />
							<ExperienceDoor name="door" active={active} preset="city" portalArgs={[10, 10, 10]} />
						</Suspense>
					</Canvas>
				</Modal.Content>
			)}
			<Loader />
		</Modal.Root>
	);
}

/* <Modal.Root
			onClick={(e: any) => e.stopPropagation()}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className="relative flex h-[800px] w-[90%] items-center overflow-hidden rounded-md bg-gray-600/40 outline outline-2 outline-white/30 backdrop-blur-md"
		>
			<Modal.Action
				className=" absolute left-5 top-5 z-50 rounded-full bg-muted/70 p-1 hover:bg-muted/60"
				onClick={() => {
					setActive(false);
				}}
			>
				<Modal.Icon icon={BiChevronLeft} size={32}></Modal.Icon>
			</Modal.Action>
		</Modal.Root> */
