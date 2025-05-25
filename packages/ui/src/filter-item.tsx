import { cn } from "@/lib/utils";
import { useState } from "react";

export type FilterCategory = "Fiscalia" | "Periodico";

interface FilterItemProps {
	category: FilterCategory;
	onClick?: () => void;
	selected?: boolean;
	className?: string;
}

export function FilterItem({
							   category,
							   onClick,
							   selected = false,
							   className
						   }: FilterItemProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="flex flex-col items-center gap-2">
			<button
				type="button"
				onClick={onClick}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={cn(
					"w-16 h-16 rounded-md transition-all duration-200 flex items-center justify-center",
					"bg-[#362A2A] border-2 border-transparent",
					selected && "border-white/30 shadow-md",
					isHovered && !selected && "border-white/10 scale-105",
					className
				)}
				aria-label={`${category} filter`}
			/>
			<span className="text-xs font-medium text-gray-700">{category}</span>
		</div>
	);
}