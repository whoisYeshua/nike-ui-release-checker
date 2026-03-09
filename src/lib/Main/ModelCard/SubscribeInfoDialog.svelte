<script lang="ts">
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
		<button class="confirm-btn" onclick={handleConfirm}>Got it</button>
	</div>
</Modal>

<style>
	.info {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		line-height: 1.5;
	}

	.confirm-btn {
		align-self: flex-end;
		margin-top: 0.5rem;
		padding: 0.5rem 1.5rem;
		border: none;
		border-radius: var(--border-radius, 6px);
		background-color: var(--accent-color, #111);
		color: var(--white, #fff);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition: opacity 0.15s ease;
	}

	.confirm-btn:hover {
		opacity: 0.85;
	}
</style>
