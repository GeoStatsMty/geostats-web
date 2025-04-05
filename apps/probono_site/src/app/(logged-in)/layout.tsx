import {type ReactNode} from 'react';
import {redirect} from 'next/navigation';
import {auth0} from '@/lib/auth0';

export type LoggedInLayoutProps = {
	readonly children: ReactNode;
};

// Ensures that for all routes within the (logged-in) group, the user is logged in
export default async function LoggedInLayout(props: LoggedInLayoutProps) {
	const {children} = props;

	const session = await auth0.getSession();

	if (!session) {
		redirect('/');
	}

	// Solves type compilation issue
	return children;
}
