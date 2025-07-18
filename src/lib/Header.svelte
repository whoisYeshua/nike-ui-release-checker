<script lang="ts">
	import logoSvg from '../assets/logo.svg';
</script>

<header>
	<img src={logoSvg} width="50px" height="35px" alt="SNKRS Logo" />
	<h1>Nike release checker</h1>
</header>

<style>
	@keyframes headerShadow {
		to {
			box-shadow: 0 2px var(--divider);
		}
	}

	header {
		display: grid;
		position: sticky;
		top: 0;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		box-shadow: 0 2px var(--divider);

		background-color: var(--bg);
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
		-webkit-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
		user-drag: none;
		-webkit-touch-callout: none;
	}

	h1 {
		grid-column: 2;
		font-size: 1.75rem;
		line-height: calc(1.75rem + 4px);
		text-transform: uppercase;
	}
</style>
