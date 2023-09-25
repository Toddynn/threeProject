import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ModalActionProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export default function ModalAction({ children, className, ...rest }: ModalActionProps) {
	return (
		<div className={twMerge('flex items-center justify-center', className)} {...rest}>
			{children}
		</div>
	);
}
