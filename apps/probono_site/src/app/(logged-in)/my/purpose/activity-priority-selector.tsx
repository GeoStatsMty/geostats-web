import React, {useMemo} from 'react';
import {Item, type Key} from 'react-stately';
import {type Activity} from '@prisma/client';
import {type SearchableListData} from '@/lib/hooks/use-searchable-list-data.ts';
import {ComboBox, ListPrioritizer} from 'geostats-ui';

export type ActivityPrioritySelectorProps = {
	readonly activities: SearchableListData<Activity>;
	readonly label: string;
};

export default function ActivityPrioritySelector(
	props: ActivityPrioritySelectorProps,
) {
	const {activities, label} = props;

	const {
		items,
		selectedKeys,
		setSelectedKeys,
		moveBefore,
		moveAfter,
		filteredKeys,
		getItem,
		filterText,
		setFilterText,
	} = activities;

	const selectedItems = useMemo(() => {
		if (selectedKeys === 'all') {
			return items;
		}

		return items.filter(items => selectedKeys.has(items.id));
	}, [items, selectedKeys]);

	const filteredItems = useMemo(
		() => filteredKeys.toList().map(key => getItem(key)!),
		[filteredKeys, getItem],
	);

	return (
		<>
			<ComboBox
				aria-label='Ingresa el nombre de un actividad.'
				placeholder='Escribe aquí para buscar'
				className='mb-4 w-full'
				label={label}
				items={filteredItems}
				inputValue={filterText}
				menuTrigger='focus'
				selectedKey={null}
				onInputChange={setFilterText}
				onSelectionChange={(key: Key | null) => {
					if (key === null) {
						if (filterText !== '') {
							setFilterText('');
						}

						return;
					}

					setFilterText('');
					if (selectedKeys === 'all') {
						return;
					}

					setSelectedKeys(selectedKeys.add(key));
				}}
			>
				{activity => <Item>{activity.name}</Item>}
			</ComboBox>
			{selectedItems.size === 0 ? null : (
				<ListPrioritizer
					className='mb-4'
					items={selectedItems}
					onRemove={(key: Key) => {
						console.log(key);
						if (selectedKeys === 'all') {
							setSelectedKeys(
								items
									.map(item => item.id as Key)
									.toSet()
									.remove(key),
							);
							return;
						}

						setSelectedKeys(selectedKeys.remove(key));
					}}
					onReorder={(key, previous, next) => {
						if (previous !== undefined) {
							moveBefore(previous, [key]);
							return;
						}

						if (next !== undefined) {
							moveAfter(next, [key]);
						}
					}}
				>
					{(activity: Activity) => <Item>{activity.name}</Item>}
				</ListPrioritizer>
			)}
		</>
	);
}
