import {NextRequest, NextResponse} from 'next/server';
import {notFound} from 'next/navigation';
import {getUsersDependantOrganizations} from '@/lib/models/organization.ts';
import {getUserFromSession} from '@/lib/models/user.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = async (request: NextRequest) => {
	const searchParams = request.nextUrl.searchParams;

	const user = await getUserFromSession();

	const id = Number.parseInt(searchParams.get('userId') as string, 10);

	if (!user || user.id !== id) {
		return new NextResponse(null, {
			status: 401,
		});
	}

	if (Number.isNaN(id)) {
		notFound();
	}

	const organizations = await getUsersDependantOrganizations(id);

	return NextResponse.json(organizations);
};
