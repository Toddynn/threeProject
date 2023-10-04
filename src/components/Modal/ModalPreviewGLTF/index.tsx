import { Loader, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Dispatch, SetStateAction, Suspense } from 'react';
import { BiChevronLeft } from 'react-icons/bi'; // Import the fullscreen exit icon
import { Modal } from '..';
import { SlideLeft } from '../../../constants/animation';
import { ControlDoor } from '../../Controls/ControlDoor';
import ControlPresets from '../../Controls/ControlPresets';
import { ExperienceDoor } from '../../Experiences/ExperienceDoor';

export interface ModalPreviewGltfProps {
	path: any;
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
	isFullScreen: boolean;
	setIsFullScreen: Dispatch<SetStateAction<boolean>>;
}

export default function ModalPreviewGltf({ active, setActive, isFullScreen, setIsFullScreen }: ModalPreviewGltfProps) {
	const { loaded } = useProgress();

	const goBack = () => {
		if (isFullScreen) {
			setIsFullScreen(false);
		}
		return setActive(false);
	};

	return (
		<Modal.Root onClick={(e: any) => e.stopPropagation()} variants={SlideLeft} initial="hidden" animate="visible" exit="exit" className="h-full w-full">
			{loaded && (
				<Modal.Content>
					<Modal.Action className=" absolute left-5 top-5 z-50 rounded-full bg-muted/70 p-1 hover:bg-muted/60" onClick={goBack}>
						<Modal.Icon icon={BiChevronLeft} size={32}></Modal.Icon>
					</Modal.Action>

					<Canvas
						shadows
						camera={{ position: [-15, 0, 0], fov: 10, castShadow: true, receiveShadow: true }}
						gl={{ preserveDrawingBuffer: true }}
						className={`h-full w-full max-w-full bg-black/80 transition-all ease-in ${isFullScreen ? 'fixed inset-0' : ''}`}
					>
						<Suspense fallback={null}>
							<ExperienceDoor name="door" active={active} preset="sunset" portalArgs={[10, 10, 10]} />
						</Suspense>
					</Canvas>
					<ControlDoor isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />
					<ControlPresets />
				</Modal.Content>
			)}
			<Loader />
		</Modal.Root>
	);
}
