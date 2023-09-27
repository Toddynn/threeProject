import { MotionProps } from 'framer-motion';
import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export type CombinedButtonRootProps = ButtonRootProps & MotionProps;

export default function ButtonRoot({ className, children, ...rest }: CombinedButtonRootProps) {
	return (
		<button className={twMerge('flex px-3 py-2', className)} {...rest}>
			{children}
		</button>
	);
}
