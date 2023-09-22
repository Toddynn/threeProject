import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slider } from '@mui/material';
import { useGLTF } from '@react-three/drei';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useConfigurator } from '../../../hooks/useConfigurator';

interface TableWidthControlProps {
	tableWidth: number;
	setTableWidth: Dispatch<SetStateAction<number>>;
}
function TableWidthControl({ tableWidth, setTableWidth }: TableWidthControlProps) {
	return (
		<div className="rounded-lg bg-white/30 p-3 backdrop-blur-sm">
			<FormControl>
				<FormLabel>Table width</FormLabel>
				<Slider
					sx={{
						width: '200px',
					}}
					min={50}
					max={200}
					value={tableWidth}
					onChange={(e: any) => setTableWidth(e.target.value)}
					valueLabelDisplay="auto"
				/>
			</FormControl>
		</div>
	);
}

interface RadioGroupControl {
	label: string;
	value: string | number;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	options: { value: string | number; label: string }[];
}
function RadioGroupControl({ label, value, onChange, options }: RadioGroupControl) {
	return (
		<div className="rounded-lg bg-white/30 p-3 backdrop-blur-sm">
			<FormControl>
				<FormLabel>{label}</FormLabel>
				<RadioGroup value={value} onChange={onChange}>
					{options.map((option) => (
						<FormControlLabel key={option.value} value={option.value} control={<Radio />} label={option.label} />
					))}
				</RadioGroup>
			</FormControl>
		</div>
	);
}

interface ControlTableProps {
	path: string;
	hidden: boolean;
}

export function ControlTable({ path, hidden }: ControlTableProps) {
	const { materials } = useGLTF(path);
	const { tableWidth, setTableWidth, legs, setLegs, legsColor, setLegsColor, setLegsMaterial, setPlateMaterial, plateColor, setPlateColor } =
		useConfigurator();

	const legsMaterialOptions = [
		{ value: 'Plate', label: 'Wood' },
		{ value: 'Metal', label: 'Metal' },
	];

	const plateMaterialOptions = [
		{ value: 'Plate', label: 'Wood' },
		{ value: 'Metal', label: 'Metal' },
	];

	const [legsMaterialFormValue, setLegsMaterialFormValue] = useState('Metal');
	const [plateMaterialFormValue, setPlateMaterialFormValue] = useState('Plate');

	const handleChangeLegsMaterial = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === 'Plate') {
			setLegsMaterialFormValue('Plate');
			setLegsMaterial(materials.Plate);
		} else {
			setLegsMaterialFormValue('Metal');
			setLegsMaterial(materials.Metal);
		}
	};

	const handleChangePlateMaterial = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.value === 'Plate') {
			setPlateMaterialFormValue('Plate');
			setPlateMaterial(materials.Plate);
		} else {
			setPlateMaterialFormValue('Metal');
			setPlateMaterial(materials.Metal);
		}
	};

	return (
		<div className={`${hidden ? 'hidden' : 'visible'} scrollControl fixed right-0 top-0 z-50 m-4 flex max-h-[50%] flex-col gap-4 overflow-y-auto`}>
			<TableWidthControl setTableWidth={setTableWidth} tableWidth={tableWidth} />
			<div className="flex items-start gap-2">
				<div className="flex  flex-col gap-4">
					<RadioGroupControl
						label="Legs Layout"
						value={legs}
						onChange={(e) => setLegs(parseInt(e.target.value))}
						options={[
							{ value: 0, label: 'Standard' },
							{ value: 1, label: 'Solid' },
							{ value: 2, label: 'Design' },
						]}
					/>
					<RadioGroupControl
						label="Legs Color"
						value={legsColor}
						onChange={(e) => setLegsColor(e.target.value)}
						options={[
							{ value: '#777777', label: 'Black' },
							{ value: '#ECECEC', label: 'Chrome' },
							{ value: '#C9BD71', label: 'Gold' },
							{ value: '#C9A3B9', label: 'Pink Gold' },
						]}
					/>
					<RadioGroupControl
						label="Legs Material"
						value={legsMaterialFormValue}
						onChange={handleChangeLegsMaterial}
						options={legsMaterialOptions}
					/>
				</div>
				<div className="flex  flex-col gap-4">
					<RadioGroupControl
						label="Plate Color"
						value={plateColor}
						onChange={(e) => setPlateColor(e.target.value)}
						options={[
							{ value: '#777777', label: 'Black' },
							{ value: '#ECECEC', label: 'Chrome' },
							{ value: '#C9BD71', label: 'Gold' },
							{ value: '#C9A3B9', label: 'Pink Gold' },
						]}
					/>
					<RadioGroupControl
						label="Plate Material"
						value={plateMaterialFormValue}
						onChange={handleChangePlateMaterial}
						options={plateMaterialOptions}
					/>
				</div>
			</div>
		</div>
	);
}
