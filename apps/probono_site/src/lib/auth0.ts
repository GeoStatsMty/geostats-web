import {ManagementClient, AuthenticationClient} from 'auth0';

import {Auth0Client} from '@auth0/nextjs-auth0/server';

export const auth0 = new Auth0Client();

export const authentication = new AuthenticationClient({
	domain: process.env.AUTH0_DOMAIN!,
	clientId: process.env.AUTH0_CLIENT_ID!,
	clientSecret: process.env.AUTH0_CLIENT_SECRET!,
});

export const management = new ManagementClient({
	domain: process.env.AUTH0_DOMAIN!,
	clientId: process.env.AUTH0_CLIENT_ID!,
	clientSecret: process.env.AUTH0_CLIENT_SECRET!,
	async fetch(url, init) {
		return fetch(url, {
			...init,
			cache: 'no-cache',
		});
	},
});
