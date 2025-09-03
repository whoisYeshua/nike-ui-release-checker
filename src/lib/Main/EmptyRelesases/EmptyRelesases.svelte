<script lang="ts">
	import imgSrc from './empty-box.avif';
</script>

<div class="container">
	<h3>No releases found</h3>
	<img src={imgSrc} alt="Empty box" />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	h3 {
		color: darkgray;
		font-size: 1.25rem;
		line-height: calc(1.25rem + 4px);
		font-family: 'Trade Gothic', system-ui;
		text-transform: uppercase;
	}

	img {
		width: 18rem;
		object-position: 0 -3rem;
	}
</style>
