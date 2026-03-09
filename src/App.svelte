<script lang="ts">
	import Footer from './lib/Footer/Footer.svelte'
	import Header from './lib/Header.svelte'
	import Main from './lib/Main/Main.svelte'
	import { setupServiceProvider } from './lib/Main/services'

	setupServiceProvider()
</script>

<div class="wrapper">
	<Header />
	<Main />
	<Footer />
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100dvh;
	}
</style>
