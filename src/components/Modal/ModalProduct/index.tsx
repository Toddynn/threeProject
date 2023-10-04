import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { AnimatePresence } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { Modal } from '..';
import { DropIn } from '../../../constants/animation';
import { Product } from '../../../pages/portas';
import Carousel from '../../Carousel';
import { Button } from '../../ShadCN/ui/button';
import ModalPreviewGltf from '../ModalPreviewGLTF';

export interface ModalProductProps {
	content: Product | null;
	showDetails?: boolean;
	active: boolean;
	setActive: Dispatch<SetStateAction<boolean>>;
	setShowDetails: Dispatch<SetStateAction<boolean>>;
}

export default function ModalProduct({ content, active, setActive, setShowDetails }: ModalProductProps) {
	const CarouselOptions: EmblaOptionsType = {
		slidesToScroll: 'auto',
		containScroll: 'trimSnaps',
		axis: 'x',
		loop: false,
	};

	const CarouselPlugins: EmblaPluginType = Autoplay({});

	const renderPreviewProduct = (preview: string[]) => {
		if (preview.length <= 1) {
			return <img src={preview[0]} alt="asd" className="h-full w-full object-scale-down" />;
		} else {
			return (
				<Carousel options={CarouselOptions} plugins={CarouselPlugins} showActions className="">
					{preview.map((image: any, index: number) => {
						return <img key={index} src={image} alt="asd" width={100} className="pointer-events-none " />;
					})}
				</Carousel>
			);
		}
	};

	const [isFullScreen, setIsFullScreen] = useState(false);

	return (
		<Modal.Root
			onClick={(e: any) => e.stopPropagation()}
			variants={DropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={` ${
				isFullScreen ? 'h-full w-full' : 'h-[80%]  w-[90%] rounded-md'
			} flex  items-center overflow-hidden  bg-gray-600/40 outline outline-2 outline-white/30 backdrop-blur-md`}
		>
			<Modal.Content className={`${active ? 'hidden' : 'flex'} scrollStyled  flex-col  lg:flex-row`}>
				<Modal.Content className={`flex flex-1 bg-[#565555]`}>
					{content && renderPreviewProduct(content.images)}
					<Modal.Action className="absolute bottom-5 left-5 justify-start">
						<Button onClick={() => setActive(!active)} className="w-auto items-center gap-3">
							<HiOutlineSparkles size={18} />
							{active ? 'Fechar visualização' : 'Visualizar 3D'}
						</Button>
					</Modal.Action>
				</Modal.Content>

				<Modal.Content className={`relative flex-1 flex-col items-center justify-start p-4`}>
					<Modal.Action className=" absolute left-5 rounded-full bg-muted/70 p-1 hover:bg-muted/60" onClick={() => setShowDetails(false)}>
						<Modal.Icon icon={BiChevronLeft} size={32}></Modal.Icon>
					</Modal.Action>
				</Modal.Content>
			</Modal.Content>
			<AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
				{content && active && (
					<ModalPreviewGltf
						path={content.path}
						active={active}
						setActive={setActive}
						isFullScreen={isFullScreen}
						setIsFullScreen={setIsFullScreen}
					/>
				)}
			</AnimatePresence>
		</Modal.Root>
	);
}
