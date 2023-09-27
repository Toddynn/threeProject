import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { HTMLAttributes, useCallback, useEffect, useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import { Button } from '../Button';

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
	options: EmblaOptionsType;
	plugins?: EmblaPluginType;
	showActions?: boolean;
	showSnaps?: boolean;
}

export default function Carousel({ options, plugins, children, className, showActions = false, showSnaps = false, ...rest }: CarouselProps) {
	const [carouselRef, carouselApi] = useEmblaCarousel(options, plugins ? [plugins] : []);

	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

	const scrollPrev = useCallback(() => carouselApi && carouselApi.scrollPrev(), [carouselApi]);
	const scrollNext = useCallback(() => carouselApi && carouselApi.scrollNext(), [carouselApi]);
	const scrollTo = useCallback((index: number) => carouselApi && carouselApi.scrollTo(index), [carouselApi]);

	const onInit = useCallback((carouselApi: EmblaCarouselType) => {
		setScrollSnaps(carouselApi.scrollSnapList());
	}, []);

	const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
		setSelectedIndex(carouselApi.selectedScrollSnap());
		setPrevBtnDisabled(!carouselApi.canScrollPrev());
		setNextBtnDisabled(!carouselApi.canScrollNext());
	}, []);

	useEffect(() => {
		if (!carouselApi) return;

		onInit(carouselApi);
		onSelect(carouselApi);
		carouselApi.on('reInit', onInit);
		carouselApi.on('reInit', onSelect);
		carouselApi.on('select', onSelect);
	}, [carouselApi, onInit, onSelect]);

	return (
		<div className="relative flex w-full items-center overflow-hidden" ref={carouselRef} {...rest}>
			<div className=" flex h-full w-full items-center gap-4">{children}</div>
			{showActions && (
				<Button.Root onClick={scrollPrev} disabled={prevBtnDisabled} className="absolute -left-3  rounded-full border p-3 disabled:hidden">
					<Button.Icon icon={GrFormPrevious} size={26} />
				</Button.Root>
			)}
			{showActions && (
				<Button.Root onClick={scrollNext} disabled={nextBtnDisabled} className="absolute -right-3 rounded-full border p-3 disabled:hidden">
					<Button.Icon icon={GrFormNext} size={26} />
				</Button.Root>
			)}
		</div>
	);
}
