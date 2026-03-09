<script lang="ts">
	import Button from '$lib/Button.svelte'
	import Modal from '$lib/Modal.svelte'

	interface Props {
		dialog: HTMLDialogElement
		onconfirm: () => void
	}

	let { dialog = $bindable(), onconfirm }: Props = $props()

	const handleConfirm = () => {
		onconfirm()
		dialog.close()
	}
</script>

<Modal bind:dialog headerText="How notifications work">
	<div class="info">
		<p>You'll receive a browser notification 1 hour before this release.</p>
		<p>
			Notifications work while this tab is open or in the background. If you close the browser,
			notifications won't be delivered.
		</p>
		<p>You'll need to allow notifications when prompted by your browser.</p>
		<Button text="Got it" onclick={handleConfirm} style="width: max-content; margin: 0 auto" />
	</div>
</Modal>

<style>
	.info {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		line-height: 1.5;
	}
</style>
