<script lang="ts">
	import Header from './lib/Header.svelte';
	import SchemeSwitcher from './lib/SchemeSwitcher/SchemeSwitcher.svelte';
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
	<footer>
		<SchemeSwitcher />
	</footer>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100dvh;
	}
</style>
