import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ModalActionsProps extends HTMLAttributes<HTMLDivElement> {}

export default function ModalActions({ children, className, ...rest }: ModalActionsProps) {
	return (
		<div className={twMerge('flex w-full items-center gap-2', className)} {...rest}>
			{children}
		</div>
	);
}
