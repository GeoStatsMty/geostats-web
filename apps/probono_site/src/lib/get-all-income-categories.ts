import prisma from '@/lib/prisma.ts';
import {cache} from 'react';

export default cache(async () =>
	prisma.incomeCategory.findMany({
		orderBy: {
			minIncome: 'asc',
		},
	}),
);
