// Modify your useAnimation hook to include a ref for animation control
import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

interface AnimationsContextData {
	animationIndex: number | undefined;
	setAnimationIndex: Dispatch<SetStateAction<number | undefined>>;
	animations: string[];
	setAnimations: Dispatch<SetStateAction<any[]>>;
}

export const AnimationsContext = createContext<AnimationsContextData>({} as AnimationsContextData);

export interface AnimationsProviderProps {
	children: ReactNode;
}

export const AnimationsProvider = ({ children }: AnimationsProviderProps) => {
	const [animationIndex, setAnimationIndex] = useState<AnimationsContextData['animationIndex']>(undefined);
	const [animations, setAnimations] = useState<AnimationsContextData['animations']>([]);

	return <AnimationsContext.Provider value={{ animationIndex, animations, setAnimationIndex, setAnimations }}>{children}</AnimationsContext.Provider>;
};
