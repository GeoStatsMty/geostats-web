import {memo, startTransition} from 'react';
import {FilterItem} from './filter-item';
import type {FilterCategory} from './filter-item';
import {twJoin} from 'tailwind-merge';

export type MapFilters = Record<`show${FilterCategory}`, boolean>;

type FiltersListProps = {
	filters: MapFilters;
	onFiltersChange: (updater: (previous: MapFilters) => MapFilters) => void;
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

	const handleFilterToggle = (category: FilterCategory) => {
		const key = `show${category}` as const;
		startTransition(() => {
			onFiltersChange(previous => ({
				...previous,
				[key]: !previous[key],
			}));
		});
	};

	return (
		<div className='space-y-6'>
			<div>
				<h3 className='mb-2 text-sm font-semibold text-white'>
					Fuente principal
				</h3>

				<div className={twJoin(gridClass, 'justify-items-center')}>
					<Item
					category='Fiscalia'
					label='Fiscalía'
					selected={filters.showFiscalia}
					compact={compact}
					onClick={() => handleFilterToggle('Fiscalia')}
					/>

					<Item
					category='Periodico'
					label='Periódico'
					selected={filters.showPeriodico}
					compact={compact}
					onClick={() => handleFilterToggle('Periodico')}
					/>
				</div>

			</div>

			<div className='border-t border-gray-700' />

			<div>
				<h3 className='mb-2 text-sm font-semibold text-white'>
					Capas adicionales
				</h3>

				<div className={twJoin(gridClass, 'justify-items-center')}>
					<Item
					category='SitiosDeApoyo'
					label='Sitios de Apoyo'
					selected={filters.showSitiosDeApoyo}
					compact={compact}
					onClick={() => handleFilterToggle('SitiosDeApoyo')}
					/>

					<Item
					category='CubrimientoDeSitio'
					label='Cubrimiento de Sitio'
					selected={filters.showCubrimientoDeSitio}
					compact={compact}
					onClick={() => handleFilterToggle('CubrimientoDeSitio')}
					/>

					<Item
					category='RezagoSocial'
					label='Rezago Social'
					selected={filters.showRezagoSocial}
					compact={compact}
					onClick={() => handleFilterToggle('RezagoSocial')}
					/>

					<Item
					category='Modelo'
					label='Predicciones'
					selected={filters.showModelo}
					compact={compact}
					onClick={() => handleFilterToggle('Modelo')}
					/>
				</div>
			</div>		
		</div>
	)
}

type ItemProps = {
	category: FilterCategory;
	label: string;
	selected: boolean;
	compact: boolean;
	onClick: (category: FilterCategory) => void;
};

const Item = memo(
	function Item({
		category,
		label,
		selected,
		compact,
		onClick,
		className,
	}: ItemProps & {className?: string}) {
		const wrapperClass = twJoin(
			'flex flex-col items-center select-none transition-all duration-200',
		)

		const buttonishClass = twJoin(
			'bg-black rounded-md',
			compact ? 'w-12 h-12' : 'w-16 h-16',
			'cursor-pointer hover:scale-105 hover:border-gray-500/40',
			className
		)

		return (
			<div className={wrapperClass} title={label}>
				<FilterItem
					category={category}
					selected={selected}
					onClick={() => onClick(category)}
					className={buttonishClass}
				>
					<span className='text-center'>{label}</span>
				</FilterItem>
			</div>
		);
	},
	(previous, next) =>
		previous.selected === next.selected &&
		previous.compact === next.compact
)