'use client';
import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {RouterProvider} from '@react-aria/utils';
import {useRouter} from 'next/navigation';
import {Auth0Provider} from '@auth0/nextjs-auth0';

const queryClient = new QueryClient();

export default function ClientProviders({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	const router = useRouter();
	return (
		<Auth0Provider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider navigate={router.push}>
					{children}
				</RouterProvider>
			</QueryClientProvider>
		</Auth0Provider>
	);
}
