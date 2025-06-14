import { X } from 'lucide-react';
import { FilterItem, FilterCategory } from './filter-item.tsx';
import { Button } from 'ui';

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

interface FiltersContainerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	filters: MapFilters;
	onFiltersChange: (filters: MapFilters) => void;
}

export function FiltersContainer({
									 open,
									 onOpenChange,
									 filters,
									 onFiltersChange,
								 }: FiltersContainerProps) {

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

		// Apply filters immediately
		onFiltersChange(newFilters);
	};

	if (!open) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40'>
			<div className='bg-neutral-900 rounded-lg shadow-lg sm:max-w-[500px] w-full mx-4 p-6 relative'>
				<div className='flex flex-row items-center justify-between mb-4'>
					<span className="font-['Inter'] text-[#A3A3A3] text-2xl">Filtros</span>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => onOpenChange(false)}
						className='rounded-full h-8 w-8 p-0 text-[#A3A3A3]'
					>
						<X className='h-4 w-4' />
						<span className='sr-only text-[#A3A3A3]'>Close</span>
					</Button>
				</div>

				<div className='grid grid-cols-3 sm:grid-cols-3 gap-4 py-4 text-[#A3A3A3]'>
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
			</div>
		</div>
	);
}