import { X } from 'lucide-react';
import { useState } from 'react';
import { FilterItem, FilterCategory } from './filter-item';
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
	const [temporaryFilters, setTemporaryFilters] = useState<MapFilters>(filters);

	const getSelectedState = (category: FilterCategory): boolean => {
		switch (category) {
			case 'Fiscalia':
				return temporaryFilters.showFiscalia;
			case 'Periodico':
				return temporaryFilters.showPeriodico;
			case 'SitiosDeApoyo':
				return temporaryFilters.showSitiosDeApoyo;
			case 'CubrimientoDeSitio':
				return temporaryFilters.showCubrimientoDeSitio;
			case 'RezagoSocial':
				return temporaryFilters.showRezagoSocial;
			case 'Modelo':
				return temporaryFilters.showModelo;
			default:
				return false;
		}
	};

	const toggleFilter = (category: FilterCategory) => {
		setTemporaryFilters(previous => {
			const newFilters = { ...previous };

			switch (category) {
				case 'Fiscalia': {
					newFilters.showFiscalia = !previous.showFiscalia;
					break;
				}
				case 'Periodico': {
					newFilters.showPeriodico = !previous.showPeriodico;
					break;
				}
				case 'SitiosDeApoyo': {
					newFilters.showSitiosDeApoyo = !previous.showSitiosDeApoyo;
					break;
				}
				case 'CubrimientoDeSitio': {
					newFilters.showCubrimientoDeSitio = !previous.showCubrimientoDeSitio;
					break;
				}
				case 'RezagoSocial': {
					newFilters.showRezagoSocial = !previous.showRezagoSocial;
					break;
				}
				case 'Modelo': {
					newFilters.showModelo = !previous.showModelo;
					break;
				}
			}

			return newFilters;
		});
	};

	const handleApply = () => {
		onFiltersChange(temporaryFilters);
		onOpenChange(false);
	};

	const handleClear = () => {
		const clearedFilters: MapFilters = {
			showFiscalia: false,
			showCubrimientoDeSitio: false,
			showRezagoSocial: false,
			showSitiosDeApoyo: false,
			showModelo: false,
			showPeriodico: false,
		};
		setTemporaryFilters(clearedFilters);
	};

	useState(() => {
		setTemporaryFilters(filters);
	});

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

				<div className='flex justify-end mt-4 gap-2 text-[#A3A3A3]'>
					<Button
						variant='outline'
						onClick={handleClear}
					>
						Clear
					</Button>
					<Button onClick={handleApply}>Aplicar filtros</Button>
				</div>
			</div>
		</div>
	);
}