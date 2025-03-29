import {NextResponse} from 'next/server';
import {getApprovedOrganizationInfo} from '@/lib/models/organization.ts';

export const GET = async () => {
	const organization = await getApprovedOrganizationInfo();

	return NextResponse.json(organization);
};
