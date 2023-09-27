import { EmblaOptionsType } from 'embla-carousel-react';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { Modal } from '..';
import { DropIn } from '../../../constants/animation';
import { Carousel } from '../../Carousel';
import { Button } from '../../ShadCN/ui/button';
import ModalPreviewGltf from '../ModalPreviewGLTF';

export interface ModalProductProps {
	content: any;
	showDetails?: boolean;
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
	setShowDetails: Dispatch<SetStateAction<boolean>>;
}

export default function ModalProduct({ content, active, setActive, setShowDetails }: ModalProductProps) {
	const OPTIONS: EmblaOptionsType = {
		slidesToScroll: 'auto',
		containScroll: 'trimSnaps',
	};

	const renderPreviewProduct = (preview: string | string[]) => {
		if (typeof preview === 'string') {
			return <img src={preview} alt="asd" className="h-full w-full object-scale-down" />;
		} else {
			return (
				<Carousel.Root options={OPTIONS}>
					{preview.map((image: any, index: number) => {
						return <img key={index} src={image} alt="asd" width={100} className="pointer-events-none object-scale-down object-center" />;
					})}
				</Carousel.Root>
			);
		}
	};

	return (
		<Modal.Root
			onClick={(e: any) => e.stopPropagation()}
			variants={DropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className=" flex h-[800px] w-[90%] items-center overflow-hidden rounded-md bg-gray-600/40 outline outline-2 outline-white/30 backdrop-blur-md"
		>
			<Modal.Content className={`${active ? 'hidden' : 'flex'} scrollStyled h-full w-full flex-col  lg:flex-row`}>
				<Modal.Content className={`flex flex-1 bg-[#565555]`}>
					{renderPreviewProduct(content.images)}
					<Modal.Action className="absolute bottom-5 left-5 justify-start">
						<Button onClick={() => setActive(!active)} className="w-auto items-center gap-3">
							<HiOutlineSparkles size={18} />
							{active ? 'Fechar visualização' : 'Visualizar 3D'}
						</Button>
					</Modal.Action>
				</Modal.Content>

				<div className={` flex h-full w-full flex-1 flex-col items-center justify-start p-4`}>
					<Modal.Actions className=" flex h-auto w-full cursor-pointer justify-start">
						<Modal.Action className="rounded-full bg-muted/70 p-1 hover:bg-muted/60" onClick={() => setShowDetails(false)}>
							<Modal.Icon icon={BiChevronLeft} size={32}></Modal.Icon>
						</Modal.Action>
					</Modal.Actions>
				</div>
			</Modal.Content>
			<AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
				{active && <ModalPreviewGltf path={content.path} active={active} setActive={setActive} />}
			</AnimatePresence>
		</Modal.Root>
	);
}
