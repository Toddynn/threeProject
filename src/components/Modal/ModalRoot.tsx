import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ModalRootProps extends HTMLAttributes<HTMLDivElement> {}

export type CombinedModalRootProps = ModalRootProps & MotionProps;

export default function ModalRoot({ children, className, ...rest }: CombinedModalRootProps) {
	return (
		<motion.div className={twMerge('relative z-50 ', className)} {...rest}>
			{children}
		</motion.div>
	);
}
