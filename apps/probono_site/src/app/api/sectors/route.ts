import {NextResponse} from 'next/server';
import {getAllSectors} from '@/lib/models/sector.ts';

 
export const GET = async () => {
	const sectors = await getAllSectors();
	return NextResponse.json(sectors);
};
