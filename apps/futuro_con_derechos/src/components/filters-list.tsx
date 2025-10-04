import {useCallback, memo, startTransition} from 'react';
import {FilterItem} from './filter-item';
import type {FilterCategory} from './filter-item';
import {twJoin} from 'tailwind-merge';

const MAIN_CATEGORIES = [
	'Fiscalia',
	'Periodico',
] as const satisfies readonly FilterCategory[];
const EXTRA_CATEGORIES = [
	'SitiosDeApoyo',
	'CubrimientoDeSitio',
	'RezagoSocial',
	'Modelo',
] as const satisfies readonly FilterCategory[];

const LABELS = {
	Fiscalia: 'Fiscalía',
	Periodico: 'Periódico',
	SitiosDeApoyo: 'Sitios de Apoyo',
	CubrimientoDeSitio: 'Cubrimiento de Sitio',
	RezagoSocial: 'Rezago Social',
	Modelo: 'Predicciones',
} as const satisfies Record<FilterCategory, string>;

export type MapFilters = Record<`show${FilterCategory}`, boolean>;

type FiltersListProps = {
	filters: MapFilters;
	onFiltersChange: (updater: (prev: MapFilters) => MapFilters) => void;
	variant?: 'default' | 'compact';
};

export function FiltersList({
	filters,
	onFiltersChange,
	variant = 'default',
}: FiltersListProps) {
	const compact = variant === 'compact';
	const gridClass = compact
		? 'grid grid-cols-6 gap-x-4 py-2 text-[#A3A3A3] w-full'
		: 'grid grid-cols-3 gap-4 py-2 text-[#A3A3A3]';

	const mainValue = filters.showFiscalia
		? 'Fiscalia'
		: filters.showPeriodico
			? 'Periodico'
			: '';

	const handleMainChange = (value: string) => {
		startTransition(() => {
			onFiltersChange(prev => ({
				...prev,
				showFiscalia: value === 'Fiscalia',
				showPeriodico: value === 'Periodico',
			}));
		});
	};

	const handleExtraChange = (category: FilterCategory) => {
		const key = `show${category}` as const;
		startTransition(() => {
			onFiltersChange(prev => ({
				...prev,
				[key]: !prev[key],
			}));
		});
	};

	return (
		<div className='space-y-6'>
			{/* Main categories as segmented switch */}
			<div>
				<h3 className='mb-2 text-sm font-semibold text-white'>
					Fuente principal (elige una)
				</h3>
				<div className='inline-flex rounded-md border border-gray-700 overflow-hidden'>
					{MAIN_CATEGORIES.map((category, idx) => {
						const label = LABELS[category];
						const selected = mainValue === category;
						return (
							<button
								key={category}
								type='button'
								onClick={() => handleMainChange(category)}
								className={twJoin(
									'px-4 py-2',
									'text-sm font-medium',
									'transition',
									selected && 'bg-blue-600 text-white',
									!selected &&
										'bg-neutral-800 text-gray-300 hover:bg-neutral-700',
									idx === 0 && 'rounded-l-md',
									idx === MAIN_CATEGORIES.length - 1 &&
										'rounded-r-md',
								)}
							>
								{label}
							</button>
						);
					})}
				</div>
			</div>

			<div className='border-t border-gray-700'></div>

			{/* Extra categories as FilterItem grid */}
			<div>
				<h3 className='mb-2 text-sm font-semibold text-white'>
					Capas adicionales
				</h3>
				<div className={gridClass}>
					{EXTRA_CATEGORIES.map(category => {
						const key = `show${category}` as const;
						const selected = filters[key];
						const label = LABELS[category];
						return (
							<Item
								key={category}
								category={category}
								label={label}
								selected={selected}
								compact={compact}
								locked={false}
								onClick={() => handleExtraChange(category)}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
}

type ItemProps = {
	category: FilterCategory;
	label: string;
	selected: boolean;
	compact: boolean;
	locked: boolean;
	onClick: (category: FilterCategory) => void;
};

const Item = memo(
	function Item({
		category,
		label,
		selected,
		compact,
		locked,
		onClick,
		className,
	}: ItemProps & {className?: string}) {
		const handleClick = useCallback(() => {
			if (!locked) onClick(category);
		}, [locked, onClick, category]);

		const wrapperClass = `flex flex-col items-center select-none ${locked ? 'opacity-40 pointer-events-none' : ''}`;
		const sizeClass = compact ? 'w-12 h-12' : '';
		const buttonishClass = `${sizeClass} ${locked ? 'cursor-not-allowed' : ''} ${className ?? ''}`;

		return (
			<div className={wrapperClass} title={label}>
				<FilterItem
					category={category}
					selected={selected}
					onClick={locked ? undefined : handleClick}
					className={buttonishClass}
				>
					<span className='text-center'>{label}</span>
				</FilterItem>
			</div>
		);
	},
	(prev, next) =>
		prev.selected === next.selected &&
		prev.compact === next.compact &&
		prev.locked === next.locked,
);
