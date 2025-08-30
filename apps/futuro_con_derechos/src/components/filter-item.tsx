import {cn} from '@/lib/utils.ts';
import {ReactNode, useState} from 'react';
import {
	Building,
	Hospital,
	MapPin,
	Newspaper,
	Search,
	User,
} from 'lucide-react';

export type FilterCategory =
	| 'Fiscalia'
	| 'Periodico'
	| 'SitiosDeApoyo'
	| 'CubrimientoDeSitio'
	| 'RezagoSocial'
	| 'Modelo';

const CATEGORY_ICONS: Record<FilterCategory, ReactNode> = {
	Fiscalia: <Building />,
	Periodico: <Newspaper />,
	SitiosDeApoyo: <Hospital />,
	CubrimientoDeSitio: <MapPin />,
	RezagoSocial: <User />,
	Modelo: <Search />,
};

interface FilterItemProps {
	category: FilterCategory;
	onClick?: () => void;
	selected?: boolean;
	className?: string;
	children?: React.ReactNode;
}

export function FilterItem({
	category,
	onClick,
	selected = false,
	className,
	children,
}: FilterItemProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className='flex flex-col items-center gap-2'>
			<div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={cn(
					'w-16 h-16 rounded-md transition-all duration-200 flex items-center justify-center',
					'bg-[#362A2A] border-2 border-transparent',
					selected && 'border-white/30 shadow-md',
					isHovered && !selected && 'border-white/10 scale-105',
					className,
				)}
				onClick={onClick}
			>
				<div className='flex flex-col items-center gap-1'>
					<span className='text-2xl'>{CATEGORY_ICONS[category]}</span>
					<div
						className={cn(
							'w-4 h-4 border rounded flex items-center justify-center cursor-pointer',
							'border-white/70',
							selected ? 'bg-white' : 'bg-transparent',
						)}
					>
						{selected && (
							<svg
								width='10'
								height='10'
								viewBox='0 0 10 10'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M8 3L4 7L2 5'
									stroke='#362A2A'
									strokeWidth='2'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						)}
					</div>
				</div>
			</div>
			<div className='w-full text-center'>
				<span className='text-xs font-medium text-gray-300 inline-block'>
					{children}
				</span>
			</div>
		</div>
	);
}
