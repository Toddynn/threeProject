import { createContext, ReactNode, useState } from 'react';

interface AnimationsContextData {
	animationIndex: number | undefined;
	setAnimationIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
	animations: string[];
	setAnimations: React.Dispatch<React.SetStateAction<any[]>>;
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
