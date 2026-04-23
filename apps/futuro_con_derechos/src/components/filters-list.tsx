import {FilterCategory, FilterItem} from './filter-item.tsx';

const FILTER_ITEMS: {category: FilterCategory; label: string}[] = [
	{category: 'Fiscalia', label: 'Fiscalía'},
	{category: 'Periodico', label: 'Periódicos'},
	{category: 'SitiosDeApoyo', label: 'Sitios de Apoyo'},
	{category: 'CubrimientoDeSitio', label: 'Área sin Cubrimiento'},
	{category: 'RezagoSocial', label: 'Rezago Social'},
	{category: 'Modelo', label: 'Modelo Predictivo'},
];

const TOTAL_FILTERS = FILTER_ITEMS.length;

export type MapFilters = {
	showFiscalia: boolean;
	showCubrimientoDeSitio: boolean;
	showRezagoSocial: boolean;
	showSitiosDeApoyo: boolean;
	showModelo: boolean;
	showPeriodico: boolean;
};

interface FiltersListProps {
	filters: MapFilters;
	onFiltersChange: (filters: MapFilters) => void;
	variant?: 'default' | 'compact';
}

export function FiltersList({
	filters,
	onFiltersChange,
	variant = 'default',
}: FiltersListProps) {
	const activeFilterCount = Object.values(filters).filter(Boolean).length;
	const isCompact = variant === 'compact';

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
		const newFilters = {...filters};

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
				newFilters.showCubrimientoDeSitio =
					!filters.showCubrimientoDeSitio;
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

	const setAllFilters = (isVisible: boolean) => {
		onFiltersChange({
			showFiscalia: isVisible,
			showCubrimientoDeSitio: isVisible,
			showRezagoSocial: isVisible,
			showSitiosDeApoyo: isVisible,
			showModelo: isVisible,
			showPeriodico: isVisible,
		});
	};

	return (
		<div className='w-full'>
			<div
				className={
					isCompact
						? 'mb-4 flex flex-col gap-3'
						: 'mb-4 flex items-start justify-between gap-4'
				}
			>
				<div>
					<p className='text-xs font-semibold uppercase tracking-[0.18em] text-stone-500'>
						Capas activas
					</p>
					<p className='mt-1 text-sm text-stone-300'>
						{activeFilterCount} de {TOTAL_FILTERS} visibles
					</p>
				</div>

				<div className='flex flex-wrap gap-2'>
					<button
						type='button'
						className='rounded-full border border-neutral-700 px-3 py-1.5 text-xs font-medium text-stone-300 transition hover:border-neutral-500 hover:text-white'
						onClick={() => setAllFilters(true)}
					>
						Mostrar todas
					</button>
					<button
						type='button'
						className='rounded-full border border-neutral-700 px-3 py-1.5 text-xs font-medium text-stone-300 transition hover:border-neutral-500 hover:text-white'
						onClick={() => setAllFilters(false)}
					>
						Ocultar todas
					</button>
				</div>
			</div>

			<div
				className={
					isCompact
						? 'grid grid-cols-3 gap-4 py-2 text-[#A3A3A3] sm:grid-cols-6'
						: 'grid grid-cols-3 gap-4 py-2 text-[#A3A3A3]'
				}
			>
				{FILTER_ITEMS.map(item => (
					<div key={item.category} className='flex flex-col items-center'>
						<FilterItem
							category={item.category}
							selected={getSelectedState(item.category)}
							onClick={() => toggleFilter(item.category)}
							className={isCompact ? 'h-12 w-12' : undefined}
						>
							<span className='text-center'>{item.label}</span>
						</FilterItem>
					</div>
				))}
			</div>
		</div>
	);
}
