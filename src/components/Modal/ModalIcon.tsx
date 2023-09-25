import { ElementType, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export interface ModalIconProps extends HTMLAttributes<HTMLOrSVGImageElement> {
	icon: ElementType;
	size?: number;
}

export default function ModalIcon({ icon: Icon, className, size, ...rest }: ModalIconProps) {
	return <Icon className={twMerge(``, className)} {...rest} size={size} />;
}
