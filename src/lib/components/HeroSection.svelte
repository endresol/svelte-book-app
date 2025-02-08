<script lang="ts">
	import heroImage from '$assets/hero.png';
	import { Button } from '$components';
</script>

<section class="default-margin hero">
	<div class="hero-text">
		<h1>Book Nest</h1>
		<h3>your personal book library</h3>
		<p class="mt-l">
			Book Nest is a simple and easy to use book library application. You can add, edit, delete and
			search for books. You can also mark books as read or unread.
		</p>
		<p class="mb-s">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, dolor eligendi ratione culpa aut
			aliquam tenetur, enim commodi, magni omnis quibusdam odio. Perferendis commodi non impedit
			incidunt atque repellendus accusantium?
		</p>
		<Button href="/register">Sign up</Button>
	</div>
	<img src={heroImage} alt="" class="hero-image" />
</section>

<style>
	.hero {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 100px;
		margin-bottom: 80px;
	}

	.hero-image {
		width: 40%;
	}

	.hero-text {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 55%;
		padding-right: 50px;
	}
</style>
