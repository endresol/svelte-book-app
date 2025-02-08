import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { Database } from '$lib/types/database.types';
import { createClient } from '@supabase/supabase-js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request }) => {
	const supabaseAdmin = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

	const authHeader = request.headers.get('Authorization');
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return json({ error: 'No valid authorization header' }, { status: 401 });
	}

	const accessToken = authHeader.split('Bearer ')[1];

	try {
		const { data: userData, error: verificationError } =
			await supabaseAdmin.auth.getUser(accessToken);

		if (verificationError) {
			return json({ error: 'Invalid session' }, { status: 401 });
		}

		const userId = userData.user.id;
		const { email, userName } = await request.json();
		const { error: updateAuthError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
			email
		});

		if (updateAuthError) {
			return json({ error: 'Failed to update user email' }, { status: 500 });
		}

		const { error: updateProfileError } = await supabaseAdmin
			.from('user_names')
			.update({ name: userName })
			.eq('user_id', userId);

		if (updateProfileError) {
			return json({ error: 'Failed to update user profile' }, { status: 500 });
		}

		return json({ message: 'Account updated successfully' }, { status: 200 });
	} catch (error) {
		return json({ error: 'Unexpected error occured' }, { status: 500 });
	}
};
