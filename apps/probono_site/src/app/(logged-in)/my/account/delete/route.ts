import {redirect} from 'next/navigation';
import {NextResponse} from 'next/server';
import {deleteUser, getUserFromSession} from '@/lib/models/user.ts';
import {
	consumeUserReauthentication,
	NoReauthenticationRequestedError,
	ReauthenticationExpiredError,
} from '@/lib/models/user-reauthentication.ts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GET = async () => {
	const user = await getUserFromSession();

	if (!user) {
		return NextResponse.next({
			status: 401,
		});
	}

	try {
		await consumeUserReauthentication();
	} catch (error) {
		if (error instanceof ReauthenticationExpiredError) {
			return redirect('/my/account#expired');
		}

		if (error instanceof NoReauthenticationRequestedError) {
			return redirect('/my/account#no-reauth');
		}

		console.error(error);

		return redirect('/my/account#unknown-error');
	}

	try {
		await deleteUser(user.id);
	} catch (error) {
		console.error(error);
		return redirect('/my/account#unknown-error');
	}

	return redirect('/');
};
