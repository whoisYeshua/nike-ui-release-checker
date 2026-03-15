<script lang="ts">
	import BrowserContent from '$lib/BrowserContent.svelte'
	import Button from '$lib/Button.svelte'
	import Modal from '$lib/Modal.svelte'
	import { checkIsPwa } from '$utils/checkIsPwa'

	import chromeDesktopImg from './assets/chrome-desktop.png'
	import firefoxDesktopImg from './assets/firefox-desktop.png'
	import safariMacosImg from './assets/safari-macos.png'

	interface Props {
		dialog: HTMLDialogElement
		onconfirm: () => void
	}

	let { dialog = $bindable(), onconfirm }: Props = $props()

	const handleConfirm = () => {
		onconfirm()
		dialog.close()
	}

	const env = checkIsPwa() ? 'app' : 'browser'
</script>

<Modal bind:dialog headerText="How notifications work">
	<div class="info">
		<p>You'll receive a {env} notification 1 hour before this release.</p>
		<p>
			Notifications work while this tab is open or in the background. If you close the {env},
			notifications won't be delivered.
		</p>
		<BrowserContent>
			{#snippet chromeDesktop()}
				<p>
					Click <strong>Allow</strong> when {env} asks to show notifications. Notifications will appear
					in the top left corner near the URL search bar.
				</p>
				<img
					class="screenshot"
					src={chromeDesktopImg}
					alt="Chrome notification permission dialog showing 'wants to Show notifications' with Block and Allow buttons"
				/>
			{/snippet}
			{#snippet safariMacos()}
				<p>Click <strong>Allow</strong> when Safari asks to send notifications.</p>
				<img
					class="screenshot"
					src={safariMacosImg}
					alt="Safari notification dialog showing 'The website would like to send you notifications in Notification Center' with Don't Allow and Allow buttons"
				/>
			{/snippet}
			{#snippet firefoxDesktop()}
				<p>Click <strong>Allow</strong> when Firefox asks to send notifications.</p>
				<img
					class="screenshot"
					src={firefoxDesktopImg}
					alt="Firefox notification popup showing 'Allow to send notifications?' with Always Block and Allow buttons"
				/>
			{/snippet}
			<p>You'll need to allow notifications when prompted by the {env}.</p>
		</BrowserContent>
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

	.screenshot {
		border-radius: 12px;
		max-width: 100%;
	}
</style>
