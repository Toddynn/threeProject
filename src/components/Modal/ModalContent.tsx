import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export default function ModalContent({ children, className, ...rest }: ModalContentProps) {
	return (
		<div className={twMerge('flex h-full w-full items-center', className)} {...rest}>
			{children}
		</div>
	);
}
