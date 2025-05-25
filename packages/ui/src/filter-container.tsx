import { X } from "lucide-react";
import { useState } from "react";
import { FilterItem, FilterCategory } from "./filter-item";
import { Button } from "ui";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "./dialog";

const FILTER_ITEMS: { category: FilterCategory }[] = [
	{ category: "Fiscalia" },
	{ category: "Periodico" },
	{ category: "Periodico" },
	{ category: "Fiscalia" },
	{ category: "Fiscalia" },
	{ category: "Fiscalia" },
];

interface FiltersContainerProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onApplyFilters?: (selectedFilters: number[]) => void;
}

export function FiltersContainer({
									 open,
									 onOpenChange,
									 onApplyFilters
								 }: FiltersContainerProps) {
	const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

	const toggleFilter = (index: number) => {
		setSelectedFilters(prev => {
			if (prev.includes(index)) {
				return prev.filter(item => item !== index);
			} else {
				return [...prev, index];
			}
		});
	};

	const handleApply = () => {
		if (onApplyFilters) {
			onApplyFilters(selectedFilters);
		}
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl font-bold">Filtros</DialogTitle>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => onOpenChange(false)}
						className="rounded-full h-8 w-8 p-0"
					>
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</Button>
				</DialogHeader>

				<div className="grid grid-cols-3 sm:grid-cols-6 gap-4 py-4">
					{FILTER_ITEMS.map((item, index) => (
						<FilterItem
							key={index}
							category={item.category}
							selected={selectedFilters.includes(index)}
							onClick={() => toggleFilter(index)}
						/>
					))}
				</div>

				<div className="flex justify-end mt-4 gap-2">
					<Button
						variant="outline"
						onClick={() => setSelectedFilters([])}
					>
						Clear
					</Button>
					<Button onClick={handleApply}>
						Apply Filters
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
