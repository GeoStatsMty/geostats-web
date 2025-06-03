import {X} from 'lucide-react';
import {useState} from 'react';
import {FilterItem, FilterCategory} from './filter-item';
import {Button} from 'ui';

const FILTER_ITEMS: {category: FilterCategory}[] = [
	{category: 'Fiscalia'},
	{category: 'Periodico'},
	{category: 'Periodico'},
	{category: 'Fiscalia'},
	{category: 'Fiscalia'},
	{category: 'Fiscalia'},
];

interface FiltersContainerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onApplyFilters?: (selectedFilters: number[]) => void;
}

export function FiltersContainer({
	open,
	onOpenChange,
	onApplyFilters,
}: FiltersContainerProps) {
	const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

	const toggleFilter = (index: number) => {
		setSelectedFilters(previous => {
			return previous.includes(index)
				? previous.filter(item => item !== index)
				: [...previous, index];
		});
	};

	const handleApply = () => {
		if (onApplyFilters) {
			onApplyFilters(selectedFilters);
		}
		onOpenChange(false);
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

				<div className='grid grid-cols-3 sm:grid-cols-6 gap-4 py-4 text-[#A3A3A3]'>
					{FILTER_ITEMS.map((item, index) => (
						<FilterItem
							key={index}
							category={item.category}
							selected={selectedFilters.includes(index)}
							onClick={() => toggleFilter(index)}
						/>
					))}
				</div>

				<div className='flex justify-end mt-4 gap-2 text-[#A3A3A3]'>
					<Button
						variant='outline'
						onClick={() => setSelectedFilters([])}
					>
						Clear
					</Button>
					<Button onClick={handleApply}>Apply Filters</Button>
				</div>
			</div>
		</div>
	);
}
