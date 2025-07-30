<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Modal from '$lib/Modal.svelte';

	import QuestionIcon from './icons/QuestionIcon.svelte';

	interface Props {
		price?: string;
		method?: string;
	}

	let { price, method }: Props = $props();

	let formattedPrice = $derived(price ? price : '—');

	let dialog: HTMLDialogElement = $state()!;

	const handleShare = () => {
		dialog.showModal();
	};
</script>

<div class="model-info-container">
	<div class="price">{formattedPrice}</div>
	{#if method}
		<div class="method-container">
			<span class="method-text">Method: <strong>{method}</strong></span>
			<Button onclick={handleShare} variant="light" aria-label="Describes what this method means">
				{#snippet icon()}
					<QuestionIcon />
				{/snippet}
			</Button>
			<Modal bind:dialog headerText="Release Methods">
				<div class="methods-info">
					<dl class="methods-info__list">
						<div class="methods-info__item">
							<dt class="methods-info__title">
								<abbr title="First-Come, First-Serve">FCFC (FLOW)</abbr>
							</dt>
							<dd class="methods-info__description">
								FLOW releases are straightforward first-come, first-serve drops. These pairs
								typically have moderate hype levels with larger quantities available. They don't
								sell out immediately, giving you time to add them to your cart, enter payment
								information, and complete your purchase normally.
							</dd>
						</div>

						<div class="methods-info__item">
							<dt class="methods-info__title">
								<abbr title="Limited Entry Opportunity">LEO</abbr>
							</dt>
							<dd class="methods-info__description">
								LEO is a two-minute raffle system for moderately hyped sneakers. When the drop goes
								live at a specific time, you have exactly 2 minutes to enter with your information
								and payment method. After the entry window closes, Nike randomly selects winners,
								charges their payment, and secures their pairs. This method ensures fair access for
								everyone.
							</dd>
						</div>

						<div class="methods-info__item">
							<dt class="methods-info__title">
								<abbr>DAN</abbr>
							</dt>
							<dd class="methods-info__description">
								DAN raffles provide a 15-minute entry window for highly limited releases like
								Off-White or Travis Scott collaborations. Similar to LEO but with extended time,
								this method is reserved for Nike's most exclusive drops. Winners are randomly
								selected after the entry period, requiring pre-entered address and payment details.
							</dd>
						</div>
					</dl>
				</div>
			</Modal>
		</div>
	{/if}
</div>

<style>
	.model-info-container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;
	}

	.price {
		font-size: 14px;
		line-height: 18px;
	}

	.method-container {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.method-text {
		font-size: 14px;
		line-height: 18px;
		text-box-trim: trim-end;
	}

	.method-text strong {
		font-weight: 500;
	}

	.methods-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.methods-info__list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		list-style: none;
	}

	.methods-info__item {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.methods-info__title {
		font-weight: 500;
		font-size: 18px;
		line-height: 22px;
	}

	.methods-info__title abbr {
		text-decoration: none;
	}

	.methods-info__description {
		font-size: 14px;
		line-height: 1.5;
	}
</style>
