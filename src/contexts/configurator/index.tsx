import { useGLTF } from '@react-three/drei';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Material } from 'three';

interface ConfiguratorContextData {
	legs: number;
	setLegs: Dispatch<SetStateAction<number>>;
	legsColor: string;
	setLegsColor: Dispatch<SetStateAction<string>>;
	plateColor: string;
	setPlateColor: Dispatch<SetStateAction<string>>;
	tableWidth: number;
	setTableWidth: Dispatch<SetStateAction<number>>;
	plateMaterial: Material | Material[];
	setPlateMaterial: Dispatch<SetStateAction<Material | Material[]>>;
	legsMaterial: Material | Material[];
	setLegsMaterial: Dispatch<SetStateAction<Material | Material[]>>;
}

export const ConfiguratorContext = createContext<ConfiguratorContextData>({} as ConfiguratorContextData);

export interface ConfiguratorProviderProps {
	children: ReactNode;
}

export const ConfiguratorProvider = ({ children }: ConfiguratorProviderProps) => {
	const [tableWidth, setTableWidth] = useState<ConfiguratorContextData['tableWidth']>(100);
	const [legsColor, setLegsColor] = useState<ConfiguratorContextData['legsColor']>('#777777');
	const [plateColor, setPlateColor] = useState<ConfiguratorContextData['plateColor']>('#777777');
	const [legs, setLegs] = useState<ConfiguratorContextData['legs']>(0);

	const { materials } = useGLTF('models/table/Table.gltf');
	const Plate = materials.Plate;
	const Metal = materials.Metal;

	const [plateMaterial, setPlateMaterial] = useState<ConfiguratorContextData['plateMaterial']>(Plate);
	const [legsMaterial, setLegsMaterial] = useState<ConfiguratorContextData['legsMaterial']>(Metal);

	return (
		<ConfiguratorContext.Provider
			value={{
				tableWidth,
				setTableWidth,
				legs,
				setLegs,
				legsColor,
				setLegsColor,
				plateColor,
				setPlateColor,
				legsMaterial,
				plateMaterial,
				setLegsMaterial,
				setPlateMaterial,
			}}
		>
			{children}
		</ConfiguratorContext.Provider>
	);
};
