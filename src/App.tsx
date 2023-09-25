import { Backdrop } from '@mui/material';
import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { ExperienceDoor } from './components/Experiences/ExperienceDoor';
import { Modal } from './components/Modal';
import { Button } from './components/ShadCN/ui/button';

export default function App() {
	const [active, setActive] = useState<boolean>(false);
	const [showDetails, setShowDetails] = useState(false);

	const toggleDetails = () => {
		setShowDetails(!showDetails);
	};

	const products = [
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
		{
			image: 'images/fundinho.png',
			category: 'rodape',
		},
		{
			image: 'images/fundinho.png',
			category: 'rodape',
		},
		{
			image: 'images/fundinho.png',
			category: 'rodape',
		},
		{
			image: 'images/fundinho.png',
			category: 'rodape',
		},
		{
			image: 'images/fundinho.png',
			category: 'rodape',
		},
		{
			image: 'images/fundinho.png',
			category: 'rodape',
		},
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
		{
			image: 'images/fundinho.png',
			category: 'porta',
		},
	];

	const portas = products.filter((product) => product.category === 'porta');
	const rodapes = products.filter((product) => product.category === 'rodape');

	console.log(active);

	return (
		<div className="relative flex h-screen items-center justify-center scroll-smooth bg-[url(/images/fundinho.png)] bg-cover bg-no-repeat">
			<div
				className={` ${
					showDetails ? 'hidden' : 'block'
				} relative flex h-[800px] w-[85%] flex-col items-center overflow-hidden rounded-2xl bg-slate-400 outline outline-muted-foreground lg:flex-row`}
			>
				<div className="scroll scrollStyled flex h-full w-full flex-1 cursor-pointer flex-col gap-3 overflow-auto  border">
					<div className="flex w-full gap-4">
						{portas.map((porta, index) => {
							return (
								<div key={index} onClick={toggleDetails}>
									<div className="h-32 w-32">
										<img src={porta.image} alt="asd" className="h-full w-full object-cover" />
									</div>
								</div>
							);
						})}
					</div>
					<div className="flex w-full gap-4">
						{rodapes.map((rodape, index) => {
							return (
								<div key={index} onClick={toggleDetails}>
									<div className="h-32 w-32">
										<img src={rodape.image} alt="asd" className="h-full w-full object-cover" />
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<AnimatePresence>
				{showDetails && (
					<Backdrop
						component={'div'}
						open={showDetails}
						onClick={(e: any) => {
							e.stopPropagation();
							setShowDetails(false);
							setActive(false);
						}}
					>
						<Modal.Root
							onClick={(e: any) => e.stopPropagation()}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="relative flex h-[800px] w-[90%] items-center overflow-hidden rounded-md bg-gray-600/40 outline outline-2 outline-white/30 backdrop-blur-md"
						>
							<Modal.Content className="scrollStyled flex h-full w-full flex-col overflow-auto lg:flex-row">
								<div className="relative flex h-full w-full flex-1 flex-col justify-between bg-[#c1bcb4]">
									<Canvas shadows camera={{ position: [-15, 0, 0], fov: 20, castShadow: true, receiveShadow: true }}>
										<ambientLight intensity={1} />
										<Environment preset={'sunset'} />
										<ExperienceDoor name="door" active={active} preset="city" portalArgs={[10, 10, 10]} />
									</Canvas>
									<Modal.Action className="absolute bottom-5 left-5 justify-start">
										<Button onClick={() => setActive(!active)} className="w-auto">
											{active ? 'Fechar visualização' : 'Visualizar 3D'}
										</Button>
									</Modal.Action>
								</div>

								<div className={` flex h-full w-full flex-1 flex-col items-center justify-start p-4`}>
									<Modal.Actions className=" flex h-auto w-full cursor-pointer justify-start">
										<Modal.Action
											className="rounded-full bg-muted/70 p-1 hover:bg-muted/60"
											onClick={() => {
												setShowDetails(false), setActive(false);
											}}
										>
											<Modal.Icon icon={BiChevronLeft} size={32}></Modal.Icon>
										</Modal.Action>
									</Modal.Actions>
									<div>asdasdasd</div>
								</div>
							</Modal.Content>
						</Modal.Root>
					</Backdrop>
				)}
			</AnimatePresence>
		</div>
	);
}
