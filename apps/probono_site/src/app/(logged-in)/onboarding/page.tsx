import React from 'react';
import NavigateNext from '@material-design-icons/svg/round/navigate_next.svg';
import {AnimatedLayoutContainer} from 'geostats-ui';
import {NextLinkButton} from '@/components/next-link-button';

export type OnboardingPageProps = {
	readonly searchParams: {
		readonly inviteId?: string;
	};
};

export default function OnboardingPage(props: OnboardingPageProps) {
	const {searchParams} = props;

	const nextHref = searchParams.inviteId
		? `/onboarding/user?inviteId=${searchParams.inviteId}`
		: '/onboarding/user';

	return (
		<AnimatedLayoutContainer>
			<h1 className='mb-2 text-2xl text-stone-50'>Hola!</h1>
			<p className='mb-2'>
				De parte de <span className='font-bold'>GeoStats</span>{' '}
				agradecemos tu interés por sumarte a nuestra plataforma.
			</p>
			<p className='mb-2'>
				Desde la iniciativa del{' '}
				<span className='font-bold'>
					Ecosistema Pro Bono de Nuevo León
				</span>{' '}
				y el liderazgo de la comunidad de{' '}
				<span className='font-bold'>GeoStats</span>, buscamos recolectar
				información para identificar a las OSC, colectivos y grupos de
				ciudadanxs que buscan dar solución a algún tema de interés
				público en el estado de Nuevo León.
			</p>
			<p className='mb-4'>
				Antes de nada, queremos conocer más sobre ti y tu organización.
			</p>

			<NextLinkButton href={nextHref} className='ms-auto'>
				Continuar <NavigateNext />
			</NextLinkButton>
		</AnimatedLayoutContainer>
	);
}
