import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export type CombinedModalRootProps = ModalRootProps & MotionProps;

export default function ModalRoot({ children, className, animate, exit, initial, transition, variants, ...rest }: CombinedModalRootProps) {
	return (
		<motion.div className={twMerge('relative z-50 ', className)} {...rest}>
			{children}
		</motion.div>
	);
}
