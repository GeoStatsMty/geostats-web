import React, {type ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {getUserFromSession} from '@/lib/models/user.ts';
import OnboardingClientLayout from '@/app/(logged-in)/onboarding/onboarding-client-layout.tsx';
import TopBar from '@/components/top-bar.tsx';
import Footer from '@/components/footer.tsx';
import {NextLinkButton} from '@/components/next-link-button.tsx';

export type OnboardingLayoutProps = {
	readonly children: ReactNode;
};

export default async function OnboardingLayout(props: OnboardingLayoutProps) {
	const {children} = props;
	const user = await getUserFromSession();

	if (user && user._count.organizations > 0) {
		redirect('/my');
	}

	return (
		<div>
			<TopBar>
				<NextLinkButton href='/api/auth/logout' variant='secondary'>
					Cerrar sesión
				</NextLinkButton>
			</TopBar>
			<div className='mt-16 min-h-[calc(100vh-(--spacing(16)))] md:pt-16'>
				<OnboardingClientLayout isOrganizationTabDisabled={!user}>
					{children}
				</OnboardingClientLayout>
			</div>
			<Footer />
		</div>
	);
}
