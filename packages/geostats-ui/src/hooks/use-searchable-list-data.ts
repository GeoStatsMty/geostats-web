'use client';
import {useMemo} from 'react';
import {type Collection, OrderedSet, Seq, type Set} from 'immutable';
import {type Key} from 'react-stately';
import {useFuse} from '@/hooks/use-fuse.ts';
import {
	useImmutableListData,
	type ImmutableListData,
	type ImmutableListOptions,
} from './use-immutable-list-data';

export type SearchableListOptions<T> = {
	readonly searchKeys?: Collection.Indexed<string>;
} & ImmutableListOptions<T>;

export type SearchableListData<T> = {
	readonly filteredKeys: Set<Key>;
} & ImmutableListData<T>;

export default function useSearchableListData<
	T extends Record<string, unknown>,
>(options: SearchableListOptions<T>): SearchableListData<T> {
	const {
		searchKeys,
		getKey = (value: T) => {
			if (Object.hasOwn(value, 'id')) {
				return value.id as Key;
			}

			if (Object.hasOwn(value, 'key')) {
				return value.key as Key;
			}

			throw new Error(
				'searchable list data item does not have an id or key attribute, and getKey is undefined',
			);
		},
	} = options;

	const listData = useImmutableListData(options);

	const {items, selectedKeys, filterText} = listData;

	const fuse = useFuse(items, {
		keys: searchKeys?.toArray(),
	});

	const filteredKeys = useMemo(() => {
		if (selectedKeys === 'all') {
			return OrderedSet<Key>();
		}

		if (fuse === undefined || filterText === '') {
			return Seq(items)
				.map(item => getKey(item))
				.toOrderedSet()
				.subtract(selectedKeys);
		}

		const results = OrderedSet(
			fuse.search(filterText).map(result => getKey(result.item)),
		);

		return results.subtract(selectedKeys);
	}, [selectedKeys, fuse, filterText, items, getKey]);

	return {
		...listData,
		filteredKeys,
	};
}
