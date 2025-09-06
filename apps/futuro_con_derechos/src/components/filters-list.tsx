import React, { useCallback, memo, startTransition} from 'react';
import { FilterItem } from './filter-item';
import type { FilterCategory } from './filter-item';

const CATEGORIES = [
	'Fiscalia',
	'Periodico',
	'SitiosDeApoyo',
	'CubrimientoDeSitio',
	'RezagoSocial',
	'Modelo',
] as const satisfies readonly FilterCategory[];

const LABELS = {
	Fiscalia: 'Fiscalia',
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
	variant = 'default'
}: FiltersListProps) {
	const compact = variant === 'compact';
	const gridClass = compact
		? 'grid grid-cols-6 gap-x-4 py-2 text-[#A3A3A3] w-full'
		: 'grid grid-cols-3 gap-4 py-2 text-[#A3A3A3]';

	const onItemClick = useCallback(
		(category: FilterCategory) => {
			const key = `show${category}` as const;
			
			startTransition(() => {
				onFiltersChange(prev => {
					const next = { ...prev, [key]: !prev[key] };

					if (category === 'Fiscalia' && next.showFiscalia) {
						next.showPeriodico = false;
					}
					if (category === 'Periodico' && next.showPeriodico) {
						next.showFiscalia = false;
					}

					return next;
				});
			});
		},
		[onFiltersChange]
	);

	const isLocked = (cat: FilterCategory): boolean => {
		if (cat === 'Fiscalia') return !filters.showFiscalia && filters.showPeriodico;
		if (cat === 'Periodico') return !filters.showPeriodico && filters.showFiscalia;
		return false;
	};

	return (
		<div className={gridClass}>
			{CATEGORIES.map((category) => {
				const selected = filters[`show${category}` as const];
				const label = LABELS[category];
				const locked = isLocked(category);

				return (
					<Item
						key={category}
						category={category}
						label={label}
						selected={selected}
						compact={compact}
						locked={locked}
						onClick={onItemClick}
					/>
				);
			})}
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
  function Item({ category, label, selected, compact, locked, onClick }: ItemProps) {
    const handleClick = useCallback(() => {
		if (!locked) onClick(category);
	}, [locked, onClick, category]);

	const wrapperClass = `flex flex-col items-center ${locked ? 'opacity-40' : ''}`;
	const sizeClass = compact ? 'w-12 h-12' : '';
	const buttonishClass = `${sizeClass} ${locked ? 'cursor-not-allowed' : ''}`;

    return (
      <div className={wrapperClass} title={label}>
        <FilterItem
          category={category}
          selected={selected}
          onClick={locked ? undefined : handleClick}
          className={buttonishClass}
        >
          <span className="text-center">{label}</span>
        </FilterItem>
      </div>
    );
  },
  (prev, next) => prev.selected === next.selected && prev.compact === next.compact && prev.locked === next.locked
);
