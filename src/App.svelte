<script lang="ts">
	import Footer from './lib/Footer.svelte';
	import Header from './lib/Header.svelte';
</script>

<div class="wrapper">
	<Header />
	<main>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
		<div style="width: 180px; height: 180px; background-color: red"></div>
	</main>
	<Footer />
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100dvh;
	}
</style>
