import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { scenes } from '../Experiences/ExperiencePortals';

export const slideAtom = atom(0);

export const Overlay = () => {
	const [slide, setSlide] = useAtom(slideAtom);
	const [displaySlide, setDisplaySlide] = useState(slide);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		setTimeout(() => {
			setVisible(true);
		}, 1000);
	}, []);

	useEffect(() => {
		setVisible(false);
		setTimeout(() => {
			setDisplaySlide(slide);
			setVisible(true);
		}, 2600);
	}, [slide]);
	return (
		<>
			<div
				className={`pointer-events-none fixed bottom-0 w-full z-10 flex  flex-col justify-between text-black ${
					visible ? '' : 'opacity-0'
				} transition-opacity duration-1000`}
			>
				<div className="absolute bottom-0 left-0 right-0 top-0 flex flex-1 items-center justify-between p-4">
					<svg
						onClick={() => setSlide((prev) => (prev > 0 ? prev - 1 : scenes.length - 1))}
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="pointer-events-auto h-10 w-10 cursor-pointer transition-opacity hover:opacity-60"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
					</svg>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="pointer-events-auto h-10 w-10 cursor-pointer transition-opacity hover:opacity-60"
						onClick={() => setSlide((prev) => (prev < scenes.length - 1 ? prev + 1 : 0))}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
					</svg>
				</div>
				<div className="flex flex-col items-center bg-gradient-to-t from-white/90 p-4 pb-10 pt-20 text-center">
					<h1 className="text-5xl font-extrabold">{scenes[displaySlide].name}</h1>
					<p className="italic text-opacity-60">{scenes[displaySlide].description}</p>
				</div>
			</div>
		</>
	);
};
