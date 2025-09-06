<script lang="ts">
	import logoSvg from '../assets/logo.svg'
</script>

<header>
	<img class="not-selectable" src={logoSvg} width="50px" height="35px" alt="SNKRS Logo" />
	<h1>Nike release checker</h1>
</header>

<style>
	@keyframes headerShadow {
		to {
			box-shadow: 0 2px var(--divider-color);
		}
	}

	header {
		display: grid;
		position: sticky;
		top: 0;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		z-index: 1;
		backdrop-filter: blur(16px);
		box-shadow: 0 2px var(--divider-color);
		background: linear-gradient(
			to bottom,
			var(--bg) 5%,
			color-mix(in srgb, var(--bg) 70%, transparent) 80%
		);
		font-family: 'Trade Gothic', system-ui;

		@media (prefers-reduced-transparency: reduce) {
			background: var(--bg);
		}

		padding-inline: calc(50% - 838px);
		padding-block: 1rem;

		@media (width <= 1760px) {
			padding-inline: 1.5rem;
		}

		@media (width >= 1024px) {
			@supports (animation-timeline: auto) {
				animation-fill-mode: both;
				animation-name: headerShadow;
				box-shadow: 0 2px transparent;
				animation-range: 0 100px;
				animation-timeline: scroll();
				animation-timing-function: linear;
			}
		}

		@media (width <= 640px) {
			grid-template-columns: 1fr auto;
			padding-inline: 1rem;
		}
	}

	img {
		grid-column: 1;
		justify-self: start;
	}

	h1 {
		grid-column: 2;
		font-size: 1.75rem;
		line-height: calc(1.75rem + 4px);
		text-transform: uppercase;
	}
</style>
