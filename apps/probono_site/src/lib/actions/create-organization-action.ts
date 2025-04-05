'use server';
import {redirect} from 'next/navigation';
import {cookies} from 'next/headers';
import {
	type OrganizationInit,
	organizationInitSchema,
} from '@/lib/schemas/organization.ts';
import {decodeForm} from '@/lib/form-utilities.ts';
import {createOrganization} from '@/lib/models/organization.ts';
import {handleActionError} from '@/lib/handle-action-error.ts';
import {FormState} from '@/components/form';
import {auth0} from '@/lib/auth0.ts';

export default async function createOrganizationAction(
	userId: number,
	state: FormState<OrganizationInit>,
	data: FormData,
): Promise<FormState<OrganizationInit>> {
	const session = await auth0.getSession();

	if (!session) {
		return {
			...state,
			success: false,
			formErrors: ['Not authenticated.'],
		};
	}

	try {
		const parsedData = await decodeForm(data, organizationInitSchema);
		const organization = await createOrganization(userId, parsedData);
		const cookieStore = await cookies();
		cookieStore.set('organizationId', organization.id.toString());
	} catch (error) {
		return handleActionError(state, error);
	}

	redirect('/my/general');
}
