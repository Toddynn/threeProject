import { MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonRootProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export type CombinedButtonRootProps = ButtonRootProps & MotionProps;

export default function ButtonRoot({ className, children, ref, ...rest }: CombinedButtonRootProps) {
	return (
		<button className={twMerge('flex items-center justify-center transition-all ease-in', className)} {...rest}>
			{children}
		</button>
	);
}
