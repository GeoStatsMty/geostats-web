import { FilterItem, FilterCategory } from './filter-item.tsx';

const FILTER_ITEMS: { category: FilterCategory; label: string }[] = [
	{ category: 'Fiscalia', label: 'Fiscalía' },
	{ category: 'Periodico', label: 'Periódico' },
	{ category: 'SitiosDeApoyo', label: 'Sitios de Apoyo' },
	{ category: 'CubrimientoDeSitio', label: 'Área sin Cubrimiento' },
	{ category: 'RezagoSocial', label: 'Rezago Social' },
	{ category: 'Modelo', label: 'Modelo Predictivo' },
];

export type MapFilters = {
	showFiscalia: boolean;
	showCubrimientoDeSitio: boolean;
	showRezagoSocial: boolean;
	showSitiosDeApoyo: boolean;
	showModelo: boolean;
	showPeriodico: boolean;
}

interface FiltersListProps {
	filters: MapFilters;
	onFiltersChange: (filters: MapFilters) => void;
	variant?: 'default' | 'compact';
}

export function FiltersList({
								filters,
								onFiltersChange,
								variant = 'default'
							}: FiltersListProps) {
	const getSelectedState = (category: FilterCategory): boolean => {
		switch (category) {
			case 'Fiscalia': return filters.showFiscalia;
			case 'Periodico': return filters.showPeriodico;
			case 'SitiosDeApoyo': return filters.showSitiosDeApoyo;
			case 'CubrimientoDeSitio': return filters.showCubrimientoDeSitio;
			case 'RezagoSocial': return filters.showRezagoSocial;
			case 'Modelo': return filters.showModelo;
			default: return false;
		}
	};

	const toggleFilter = (category: FilterCategory) => {
		const newFilters = { ...filters };

		switch (category) {
			case 'Fiscalia': newFilters.showFiscalia = !filters.showFiscalia; break;
			case 'Periodico': newFilters.showPeriodico = !filters.showPeriodico; break;
			case 'SitiosDeApoyo': newFilters.showSitiosDeApoyo = !filters.showSitiosDeApoyo; break;
			case 'CubrimientoDeSitio': newFilters.showCubrimientoDeSitio = !filters.showCubrimientoDeSitio; break;
			case 'RezagoSocial': newFilters.showRezagoSocial = !filters.showRezagoSocial; break;
			case 'Modelo': newFilters.showModelo = !filters.showModelo; break;
		}

		onFiltersChange(newFilters);
	};

	return (
		<div className={variant === 'compact'
			? 'grid grid-cols-6 gap-x-4 py-2 text-[#A3A3A3] w-full'
			: 'grid grid-cols-3 sm:grid-cols-3 gap-4 py-2 text-[#A3A3A3]'
		}>
			{FILTER_ITEMS.map((item) => (
				<div key={item.category} className="flex flex-col items-center">
					<FilterItem
						category={item.category}
						selected={getSelectedState(item.category)}
						onClick={() => toggleFilter(item.category)}
						className={variant === 'compact' ? 'w-12 h-12' : undefined}
					>
						<span className="text-center">{item.label}</span>
					</FilterItem>
				</div>
			))}
		</div>
	);
}