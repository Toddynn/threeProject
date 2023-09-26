export const DropIn = {
	hidden: {
		y: '-100vh',
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.1,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: '100vh',
		opacity: 0,
		transition: {
			duration: 0.3,
		},
	},
};

export const SlideLeft = {
	hidden: {
		x: '-100vh',
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			type: 'spring',
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		x: '-100vh',
		opacity: 0,
		transition: {
			duration: 0.6,
		},
	},
};
