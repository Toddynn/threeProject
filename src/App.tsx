import { Backdrop } from '@mui/material';
import Autoplay from 'embla-carousel-autoplay';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Carousel from './components/Carousel';
import ModalProduct from './components/Modal/ModalProduct';
import { Product } from './components/Product';

export interface Product {
	images: string[];
	path: string;
	category: string;
	name: string;
	price: string;
}

export default function App() {
	const [active, setActive] = useState<boolean>(false);
	const [showDetails, setShowDetails] = useState<boolean>(false);
	const [contentDetails, setContentDetails] = useState<Product | null>(null);

	const toggleDetails = (content: Product) => {
		setShowDetails(!showDetails);
		setContentDetails(content);
	};

	const products: Product[] = [
		{
			images: ['images/porta1.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
		{
			images: ['images/porta2.png', 'images/porta2.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
		{
			images: ['images/porta3.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
		{
			images: [
				'images/porta4.png',
				'images/porta2.png',
				'images/porta3.png',
				'images/porta3.png',
				'images/porta2.png',
				'images/porta3.png',
				'images/porta3.png',
				'images/porta2.png',
				'images/porta3.png',
			],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
		{
			images: ['images/porta1.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
		{
			images: ['images/porta2.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
		{
			images: ['images/porta3.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'rodape',
		},
		{
			images: ['images/porta4.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'rodape',
		},
		{
			images: ['images/porta1.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'rodape',
		},
		{
			images: ['images/porta1.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'rodape',
		},
		{
			images: ['images/porta1.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'rodape',
		},
		{
			images: ['images/porta1.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'rodape',
		},
		{
			images: ['images/porta1.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
		{
			images: ['images/porta1.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
		{
			images: ['images/porta1.png', 'images/porta2.png', 'images/porta3.png'],
			price: '1.500,00',
			name: 'portinha pap apa - Frizata',
			path: 'models/door/Door.gltf',
			category: 'porta',
		},
	];

	const portas = products.filter((product) => product.category === 'porta');
	const rodapes = products.filter((product) => product.category === 'rodape');

	const CarouselOptions: EmblaOptionsType = {
		slidesToScroll: 'auto',
		containScroll: 'trimSnaps',
		axis: 'x',
		loop: false,
	};

	const CarouselPlugins: EmblaPluginType = Autoplay({});

	return (
		<>
			<div className="relative flex h-screen items-center justify-center scroll-smooth bg-[url(/images/fundinho.png)] bg-cover bg-no-repeat">
				<div
					className={` ${
						showDetails ? 'hidden' : 'block'
					} relative  h-[800px] w-[85%]  overflow-hidden rounded-2xl bg-slate-400 outline outline-muted-foreground`}
				>
					<div className="scroll scrollStyled flex h-full w-full flex-1 flex-col gap-3 overflow-x-hidden p-4">
						<Carousel options={CarouselOptions} plugins={CarouselPlugins} showActions>
							{portas.map((porta: Product, index) => {
								return (
									<Product.Root
										key={index}
										onClick={() => toggleDetails(porta)}
										className=" flex h-full w-full flex-col items-center gap-3 rounded-md border p-4 text-black "
									>
										<Product.Content className="flex h-full w-full cursor-pointer items-center justify-center bg-red-200">
											<Product.Image src={porta.images[0]} alt="asd" className=" pointer-events-none" width={130} />
										</Product.Content>
										<Product.Content className=" bg-red-200 text-left">
											<Product.Name className="">{porta.name}</Product.Name>
											<Product.Description className="line-clamp-1">{porta.category}</Product.Description>
											<Product.Price className="line-clamp-1">R${porta.price}</Product.Price>
											<Product.Actions>
												<Product.Action>Favoritar</Product.Action>
												<Product.Action>Carrinho</Product.Action>
											</Product.Actions>
										</Product.Content>
									</Product.Root>
								);
							})}
						</Carousel>
					</div>
				</div>
			</div>
			<AnimatePresence mode="wait" initial={false} onExitComplete={() => null}>
				{showDetails && (
					<Backdrop component={'div'} open={showDetails}>
						<ModalProduct
							active={active}
							setActive={setActive}
							showDetails={showDetails}
							setShowDetails={setShowDetails}
							content={contentDetails}
						/>
					</Backdrop>
				)}
			</AnimatePresence>
		</>
	);
}
