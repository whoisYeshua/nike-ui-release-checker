<script lang="ts">
	import Button from './Button.svelte'

	import type { Snippet } from 'svelte'
	import type { HTMLDialogAttributes } from 'svelte/elements'

	interface Props extends HTMLDialogAttributes {
		headerText: string
		children?: Snippet
		dialog: HTMLDialogElement
	}

	let { dialog = $bindable(), headerText, children, ...rest }: Props = $props()

	const closeDialogOnOutsideClick = (e: MouseEvent) => {
		if ('closedBy' in HTMLDialogElement.prototype) return

		const dialogDimensions = dialog.getBoundingClientRect()
		if (
			e.clientX < dialogDimensions.left ||
			e.clientX > dialogDimensions.right ||
			e.clientY < dialogDimensions.top ||
			e.clientY > dialogDimensions.bottom
		) {
			dialog.close()
		}
	}
</script>

<dialog bind:this={dialog} onclick={closeDialogOnOutsideClick} closedby="any" {...rest}>
	<div class="modal-container">
		<header class="header">
			<h2 class="header__title">{headerText}</h2>
			<Button variant="light" onclick={() => dialog.close()} aria-label="Close">
				{#snippet icon()}
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<path
							fill="none"
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				{/snippet}
			</Button>
		</header>
		<div class="content">
			{@render children?.()}
		</div>
		<footer class="footer">
			<Button variant="light" onclick={() => dialog.close()} text="Close" style="height: 32px" />
		</footer>
	</div>
</dialog>

<style>
	.modal-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1rem;
		max-height: calc(var(--dialog-max-height) - 2 * var(--dialog-border-width));
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
	}

	.header__title {
		font-weight: 500;
		font-size: 1.5rem;
		line-height: calc(1.5rem + 4px);
		text-box-trim: trim-end;
	}

	.content {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
	}

	.footer {
		display: flex;
		justify-content: end;
		gap: 1rem;
	}

	dialog {
		--dialog-margin: 4rem;
		--dialog-max-height: calc(100dvh - 2 * var(--dialog-margin));
		--dialog-border-width: 1px;
		top: var(--dialog-margin);
		left: 50%;
		translate: -50%;
		backdrop-filter: var(--popup-bg-blur);
		box-shadow: var(--popup-shadow);
		border: var(--dialog-border-width) solid var(--divider-color);
		border-radius: var(--border-radius);
		background-color: var(--popup-bg);
		padding: 0;
		width: clamp(20rem, 33vw, 32rem);
		max-height: var(--dialog-max-height);
	}

	/* PREVENT SCROLLING */
	/* html {
		scrollbar-gutter: stable;
	} */

	:global(body):has(dialog[open]) {
		overflow: hidden;
		touch-action: none;
	}

	/* OPEN / CLOSE ANIMATION */
	dialog {
		/* Exit Stage To */
		transform: scale(0.95);
		opacity: 0;
		transition:
			display 0.2s allow-discrete,
			overlay 0.2s allow-discrete,
			opacity 0.2s ease,
			transform 0.2s ease;

		&::backdrop {
			/* Exit Stage To */
			backdrop-filter: none;

			transition:
				display 0.2s allow-discrete,
				overlay 0.2s allow-discrete,
				backdrop-filter 0.2s ease,
				background-color 0.2s ease,
				transform 0.2s ease;
			background-color: transparent;
		}

		/* For safari which buggy on overlay transition */
		@supports not (overlay: none) {
			&,
			&::backdrop {
				/* Exit Stage To */
				transition:
					opacity 0.2s ease,
					transform 0.2s ease;
			}
		}

		/* On Stage */
		&[open] {
			transform: scale(1);
			opacity: 1;

			&::backdrop {
				backdrop-filter: blur(16px);
				background-color: color-mix(in srgb, var(--black) 50%, transparent);
			}

			@media (prefers-reduced-transparency: reduce) {
				&::backdrop {
					backdrop-filter: none;
					background-color: var(--black);
				}
			}
		}

		/* Enter Stage From */
		@starting-style {
			&[open] {
				transform: scale(0.95);
				opacity: 0;

				&::backdrop {
					backdrop-filter: none;
					background-color: transparent;
				}
			}
		}
	}
</style>
