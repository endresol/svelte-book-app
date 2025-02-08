import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PUBLIC_FRONTEND_URL } from '$env/static/public';

interface ReturnObject {
	success: boolean;
	email: string;
	password: string;
	passwordConfirm?: never;
	name?: never;
	errors: string[];
}
export const actions = {
	signInWithPassword: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const returnObject: ReturnObject = {
			success: true,
			email,
			password,
			errors: []
		};

		if (!email.length) {
			returnObject.errors.push('Email is required');
		}

		if (password.length < 6) {
			returnObject.errors.push('Password is required');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			console.log('error', error);
			returnObject.success = false;
			return fail(400, returnObject as any);
		}

		redirect(303, '/private/dashboard');
	},
	signInWithGoogle: async ({ request, locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${PUBLIC_FRONTEND_URL}/auth/callback`
			}
		});

		if (error) {
			return fail(400, {
				message: 'Failed to sign in with Google'
			});
		}

		throw redirect(303, data.url);
	}
} satisfies Actions;
