// Svelte 5 Rune mode composable for haptic feedback
// TODO: import\execute only once

/**
 * Determines whether the current device is running iOS or iPadOS.
 *
 * @returns {boolean} `true` if the device is iOS/iPadOS; otherwise, `false`.
 */
const checkIosDevice = (): boolean => {
	const ua = navigator.userAgent;
	const isIphone = /iPhone|iPod/.test(ua);
	const isIpad = /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);

	return isIphone || isIpad;
};

const HIDDEN_ID = 'HIDDEN_LABEL';

/**
 * Creates a hidden `<label>` element containing a checkbox input.
 * This element is used as a fallback to trigger haptic feedback on
 * iOS devices by leveraging the switch toggle feedback.
 *
 * @returns {HTMLLabelElement} The created label element.
 */
const createHiddenSwitch = (): HTMLLabelElement => {
	const label = document.createElement('label');
	const input = document.createElement('input');

	label.style.opacity = '0';
	label.style.pointerEvents = 'none';
	label.style.position = 'absolute';
	label.style.left = '-9999px';
	label.dataset.id = HIDDEN_ID;
	input.type = 'checkbox';
	input.setAttribute('switch', '');
	label.appendChild(input);

	return label;
};

const getHiddenSwitch = (): HTMLLabelElement => {
	const hiddenSwitch = document.querySelector<HTMLLabelElement>(`label[data-id="${HIDDEN_ID}"]`);
	return hiddenSwitch ?? createHiddenSwitch();
};

/** Configuration options for the `useHaptic` composable. */
type UseHapticOptions = {
	/**
	 * The duration of the vibration in milliseconds.
	 * @default 100
	 */
	hapticDuration?: number;
};

/** The return type for `useHaptic`, providing the `vibrate` method. */
type UseHaptic = {
	/** Triggers the haptic feedback mechanism */
	vibrate: () => void;
};

/**
 * Svelte 5 Rune composable for haptic feedback.
 *
 * On devices where `navigator.vibrate` is supported, it uses the Vibrate API.
 * On iOS devices (where `vibrate` is typically not supported), it falls back
 * to clicking a hidden switch element to trigger haptic feedback.
 */
export const useHaptic = ({ hapticDuration = 100 }: UseHapticOptions = {}): UseHaptic => {
	const isBrowser = typeof window !== 'undefined';
	let labelElement: HTMLLabelElement | null = null;

	const canVibrate = isBrowser && !checkIosDevice() && Boolean(navigator?.vibrate);

	$effect(() => {
		if (!isBrowser) return;
		labelElement = getHiddenSwitch();
		document.body.appendChild(labelElement);
		return () => {
			if (labelElement && labelElement.parentNode === document.body) {
				document.body.removeChild(labelElement);
			}
			labelElement = null;
		};
	});

	/**
	 * Triggers haptic feedback. If `navigator.vibrate` is available,
	 * it uses that API; otherwise, it clicks the hidden switch element
	 * to produce a similar effect on iOS devices.
	 *
	 * @example
	 * vibrate();
	 */
	const vibrate = () => {
		if (!isBrowser) return;
		if (canVibrate) {
			navigator.vibrate(hapticDuration);
		} else {
			labelElement?.click();
		}
	};

	return { vibrate };
};
