import type { TOrientation } from '@lotexiu/typescript';
import type { TPointerPosition } from './types';

/** Pointer helpers: clicks outside overlays and positions along a slider track. */
class PointerUtils {
	/**
	 * Calls `handler` on a pointer down outside every element `inside` returns — wire it to a control's `interactOutside`
	 * (`Dialog`, `Popover`, `Menu`, `Select`, `Combobox`). Returns the function that stops listening.
	 */
	static onOutside(inside: () => readonly (Element | null | undefined)[], handler: () => void, target: Document = document): () => void {
		const listener = (event: Event) => {
			const node = event.target as Node | null;
			if (node !== null && inside().some((element) => element?.contains(node))) return;
			handler();
		};
		target.addEventListener('pointerdown', listener, true);
		return () => target.removeEventListener('pointerdown', listener, true);
	}

	/**
	 * Distance of the pointer from the start of `track` along its axis, and the track length — the two numbers
	 * `Slider.pointerDown`/`pointerMove` take.
	 * @example
	 * volume.pointerDown(...PointerUtils.offset(event, trackElement))
	 */
	static offset(position: TPointerPosition, track: Element, orientation: TOrientation = 'horizontal'): [offset: number, length: number] {
		const bounds = track.getBoundingClientRect();
		return orientation === 'vertical' ? [position.clientY - bounds.top, bounds.height] : [position.clientX - bounds.left, bounds.width];
	}
}

export { PointerUtils };
