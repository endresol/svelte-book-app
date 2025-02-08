import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

interface ReturnObject {
	success: boolean;
	errors: string[];
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}
export const actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		const returnObject: ReturnObject = {
			success: true,
			name,
			email,
			password,
			confirmPassword,
			errors: []
		};

		if (name.length < 3) {
			returnObject.errors.push('Name must be at least 3 characters long');
		}
		if (!email.length) {
			returnObject.errors.push('Email is required');
		}

		if (password.length < 6) {
			returnObject.errors.push('Password must be at least 6 characters long');
		}
		if (password !== confirmPassword) {
			returnObject.errors.push('Passwords do not match');
		}

		if (returnObject.errors.length) {
			returnObject.success = false;
			return returnObject;
		}

		const { data, error } = await supabase.auth.signUp({
			email,
			password
		});

		if (error) {
			returnObject.success = false;
			return fail(400, returnObject as any);
		}

		const userId = data?.user?.id;

		await supabase.from('user_names').insert([{ user_id: userId, name }]);

		redirect(303, '/private/dashboard');
	}
} satisfies Actions;
