<script lang="ts">
	import { BookCategory } from '$components';
	import BookCard from '$components/BookCard.svelte';
	import StarRating from '$components/StarRating.svelte';
	import { getUserState } from '$lib/state/user-state.svelte';
	import Icon from '@iconify/svelte';

	let userContext = getUserState();
	let { userName, allBooks } = $derived(userContext);
</script>

<div class="dashboard">
	<div class="dashboard-header mb-m">
		<a href="/private/scan-shelf" class="add-book">
			<Icon icon="icons8:plus" width={'72'} height={'72'} />
			<p>Add a book</p>
		</a>
	</div>
	<div class="headline">
		<h4 class="bold mb-xs">Welcome Back, {userName}</h4>
		<p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque ipsa quasi culpa nemo aperiam
			saepe, exercitationem nulla quod!
		</p>
	</div>
</div>

{#if allBooks.length}
	{#if userContext.getHighestRatedBooks().length}
		<BookCategory
			categoryName={'Your favorites books'}
			booksToDisplay={userContext.getHighestRatedBooks()}
		/>
	{/if}
	<BookCategory
		categoryName={'Recently added, unread books'}
		booksToDisplay={userContext.getUnreadBooks()}
	/>

	{#if userContext.getFavoriteGenre()}
		<BookCategory
			categoryName={`Highest rated books from your favorite genre: ${userContext.getFavoriteGenre()}`}
			booksToDisplay={userContext.getHighestRatedBooks()}
		/>
	{/if}
{:else}
	<a href="/private/scan-shelf" class="upload-hint mt-l">
		<h3>You have not books in your library</h3>
		<div class="mt-m">
			<Icon icon="icons8:plus" width={'72'} height={'72'} />Add books
		</div>
	</a>
{/if}

<style>
	.dashboard {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		width: 100%;
	}

	.add-book {
		display: flex;
		align-items: center;
		text-decoration: none;
	}

	.add-book p {
		margin-left: 8px;
	}

	.headline {
		text-align: right;
		max-width: 30%;
		min-width: 300px;
	}

	.upload-hint {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	.upload-hint div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
