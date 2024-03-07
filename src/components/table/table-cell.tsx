import React, {useRef} from 'react';
import {type GridNode} from '@react-types/grid';
import {type TableState} from 'react-stately';
import {mergeProps, useFocusRing, useTableCell} from 'react-aria';
import {cx} from '@/lib/cva.ts';

export type TableCellProps<T> = {
	readonly cell: GridNode<T>;
	readonly state: TableState<T>;
};

export default function TableCell<T>(props: TableCellProps<T>) {
	const {cell, state} = props;

	const cellRef = useRef<HTMLTableDataCellElement>(null);

	const {gridCellProps} = useTableCell(
		{node: cell},
		state,
		cellRef,
	);

	const {isFocusVisible, focusProps} = useFocusRing();

	return (
		<td
			{...mergeProps(gridCellProps, focusProps)}
			ref={cellRef}
			className={cx(
				'p-4 outline-none',
				isFocusVisible && 'shadow-stone-500',
			)}
		>
			{cell.rendered}
		</td>
	);
}
