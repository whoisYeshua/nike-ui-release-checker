<script lang="ts">
	import logoSvg from '../assets/logo.svg';
</script>

<header>
	<img src={logoSvg} width="50px" height="35px" alt="SNKRS Logo" />
	<h1>NIKE RELEASE CHECKER</h1>
</header>

<style>
	@keyframes headerShadow {
		to {
			box-shadow: 0 2px 0 light-dark(#e5e5e5, #303030);
		}
	}

	header {
		position: sticky;
		top: 0;
		padding-inline: 1.5rem;
		padding-block: 1rem;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;

		background-color: var(--bg);
		box-shadow: 0 2px 0 light-dark(#e5e5e5, #303030);

		@media (width <= 640px) {
			padding-inline: 1rem;
			grid-template-columns: 1fr auto;
		}

		@media (width >= 1024px) {
			@supports (animation-timeline: auto) {
				box-shadow: 0 2px 0 transparent;
				animation-fill-mode: both;
				animation-name: headerShadow;
				animation-range: 0 100px;
				animation-timeline: scroll();
				animation-timing-function: linear;
			}
		}
	}

	img {
		grid-column: 1;
		justify-self: start;
		-webkit-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
		user-drag: none;
	}

	h1 {
		grid-column: 2;
		font-size: 1.5rem;
		line-height: calc(1.5rem + 4px);
	}
</style>
