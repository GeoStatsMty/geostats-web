'use client';
import React from 'react';
import {type User} from '@prisma/client';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import TextField from '@/components/text-field.tsx';
import Form, {type FormState} from '@/components/form.tsx';
import {type UserInit, userInitSchema, type UserUpdate} from '@/lib/schemas/user.ts';
import {formValidators} from '@/lib/form-utils.ts';
import SubmitButton from '@/components/submit-button.tsx';

export type UserOnboardingFormProps = {
	readonly user: User;
	readonly action: (state: FormState<UserUpdate>, data: FormData) => Promise<FormState<UserUpdate>>;
} | {
	readonly action: (state: FormState<UserInit>, data: FormData) => Promise<FormState<UserInit>>;
	readonly defaultEmail: string;
};

export default function UserOnboardingForm(props: UserOnboardingFormProps) {
	const {action} = props;

	const user = 'user' in props ? props.user : undefined;
	const defaultEmail = 'defaultEmail' in props ? props.defaultEmail : undefined;

	const validate = formValidators(userInitSchema);

	return (
		<Form
			action={action} redirectTo='/onboarding/organization'>
			<TextField
				isRequired
				className='mb-4'
				name='givenName'
				label='Nombre(s)'
				validate={validate.givenName}
				defaultValue={user?.givenName}
			/>
			<TextField
				isRequired
				className='mb-4'
				name='familyName'
				label='Apellido(s)'
				validate={validate.familyName}
				defaultValue={user?.familyName}
			/>
			<TextField
				className='mb-4'
				name='contactEmail'
				label='Correo electrónico de contacto'
				validate={validate.contactEmail}
				defaultValue={user?.contactEmail ?? defaultEmail ?? ''}
			/>
			<TextField
				name='contactPhone'
				className='mb-4'
				type='tel'
				label='Teléfono'
				validate={validate.contactPhone}
				defaultValue={user?.contactPhone ?? ''}
			/>
			<SubmitButton icon={<NavigateNext/>} iconPlacement='right'>
				Continuar
			</SubmitButton>
		</Form>
	);
}
