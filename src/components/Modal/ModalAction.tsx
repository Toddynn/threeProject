import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ModalActionProps extends HTMLAttributes<HTMLDivElement> {}

export default function ModalAction({ children, className, ...rest }: ModalActionProps) {
	return (
		<div className={twMerge('flex cursor-pointer items-center justify-center', className)} {...rest}>
			{children}
		</div>
	);
}
