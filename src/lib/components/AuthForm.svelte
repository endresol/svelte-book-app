<script lang="ts">
	import { Button } from '$components';
	import type { ActionData } from '../../routes/register/$types';

	interface ComponentProps {
		isRegistration: boolean;
		form: ActionData;
	}

	let { isRegistration, form }: ComponentProps = $props();
</script>

<div class="default-margin auth-container">
	<h1 class="mb-l">{isRegistration ? 'Registration' : 'Login'}</h1>
	<div class="form-and-social-login">
		<form
			method="POST"
			class="auth-form"
			action={isRegistration ? '/' : '/login/?/signInWithPassword'}
		>
			{#if form && form.errors}
				{#each form.errors as error}
					<div class="auth-error"><p>{error}</p></div>
				{/each}
			{/if}
			{#if isRegistration}
				<input placeholder="Name" type="text" name="name" value={form?.name || ''} />
			{/if}
			<input placeholder="Email" type="email" name="email" value={form?.email || ''} />
			<input placeholder="Password" type="password" name="password" value={form?.password || ''} />
			{#if isRegistration}
				<input
					placeholder="Confirm Password"
					type="password"
					name="confirmPassword"
					value={form?.confirmPassword || ''}
				/>
			{/if}
			<Button type="submit">{isRegistration ? 'Register' : 'Login'}</Button>
			{#if isRegistration}
				<p class="auth-hint">
					Already have an account? <a href="/login">Login</a>
				</p>
			{:else}
				<p class="auth-hint">
					Do you not have an account? <a href="/register">Register</a>
				</p>
			{/if}
		</form>
		<div class="social-login">
			<!-- Add button to social login -->
			<form
				method="POST"
				action={isRegistration ? '/login/?/signInWithGoogle' : '?/signInWithGoogle'}
			>
				<Button type="submit">Login with Google</Button>
			</form>
		</div>
	</div>
</div>

<style>
	.auth-container {
		margin-top: 80px;
	}

	.form-and-social-login {
		display: flex;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		align-items: start;
		border-right: 1px soldi gray;
		padding-right: 80px;
		width: 40%;
	}

	.auth-form input {
		margin-bottom: 12px;
		width: 100%;
	}
	.auth-form input:last-of-type {
		margin-bottom: 30px;
	}
	.auth-hint {
		font-size: 16px;
		color: gray;
	}
	.auth-error {
		background-color: rgb(122, 35, 35);
		color: white;
		font-size: 12px;
		padding: 12px;
		width: 100%;
		margin-bottom: 8px;
		border-radius: 12px;
	}

	.auth-error:last-of-type {
		margin-bottom: 16px;
	}

	.social-login {
		padding-left: 80px;
		width: 40%;
	}
</style>
