import { Howl } from 'howler';
export const useAudio = (path: string) => {
	const playAudio = () => {
		const audio = new Audio(path);
		const source = new AudioContext();
		const audioSource = source.createMediaElementSource(audio);
		audioSource.connect(source.destination);
		audio.play();
	};

	return playAudio;
};

export const useBackgroundAudio = (path: string | undefined, volume: number) => {
	if (!path) return;
	const playAudio = new Howl({
		src: path,
		loop: true,
		volume: volume,
	});

	return playAudio;
};
