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

export function FiltersList({
								filters,
								onFiltersChange,
							}: {
	filters: MapFilters;
	onFiltersChange: (filters: MapFilters) => void;
}) {
	const getSelectedState = (category: FilterCategory): boolean => {
		switch (category) {
			case 'Fiscalia': {
				return filters.showFiscalia;
			}
			case 'Periodico': {
				return filters.showPeriodico;
			}
			case 'SitiosDeApoyo': {
				return filters.showSitiosDeApoyo;
			}
			case 'CubrimientoDeSitio': {
				return filters.showCubrimientoDeSitio;
			}
			case 'RezagoSocial': {
				return filters.showRezagoSocial;
			}
			case 'Modelo': {
				return filters.showModelo;
			}
			default: {
				return false;
			}
		}
	};

	const toggleFilter = (category: FilterCategory) => {
		const newFilters = { ...filters };

		switch (category) {
			case 'Fiscalia': {
				newFilters.showFiscalia = !filters.showFiscalia;
				break;
			}
			case 'Periodico': {
				newFilters.showPeriodico = !filters.showPeriodico;
				break;
			}
			case 'SitiosDeApoyo': {
				newFilters.showSitiosDeApoyo = !filters.showSitiosDeApoyo;
				break;
			}
			case 'CubrimientoDeSitio': {
				newFilters.showCubrimientoDeSitio = !filters.showCubrimientoDeSitio;
				break;
			}
			case 'RezagoSocial': {
				newFilters.showRezagoSocial = !filters.showRezagoSocial;
				break;
			}
			case 'Modelo': {
				newFilters.showModelo = !filters.showModelo;
				break;
			}
		}

		onFiltersChange(newFilters);
	};

	return (
		<div className='grid grid-cols-3 sm:grid-cols-3 gap-4 py-2 text-[#A3A3A3]'>
			{FILTER_ITEMS.map((item) => (
				<FilterItem
					key={item.category}
					category={item.category}
					selected={getSelectedState(item.category)}
					onClick={() => toggleFilter(item.category)}
				>
					{item.label}
				</FilterItem>
			))}
		</div>
	);
}