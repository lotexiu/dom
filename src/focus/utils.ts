import { TABBABLE_SELECTOR } from './declarations';

/** Keyboard focus helpers for overlays. */
class FocusUtils {
	/** Elements inside `container` that Tab can reach, in document order (hidden ones left out). */
	static tabbables(container: Element): HTMLElement[] {
		return [...container.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR)].filter((element) => element.closest('[hidden]') === null);
	}

	/**
	 * Keeps keyboard focus inside `container`: focuses its first tabbable element (or the container itself), makes Tab and
	 * Shift+Tab cycle inside it, and returns the function that releases it and gives the focus back to where it was.
	 * Pair it with a modal `Dialog`.
	 */
	static trap(container: HTMLElement): () => void {
		const previous = container.ownerDocument.activeElement as HTMLElement | null;
		(FocusUtils.tabbables(container)[0] ?? container).focus();
		const keepInside = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return;
			const focusable = FocusUtils.tabbables(container);
			if (focusable.length === 0) {
				event.preventDefault();
				return;
			}
			const active = container.ownerDocument.activeElement;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		};
		container.addEventListener('keydown', keepInside);
		return () => {
			container.removeEventListener('keydown', keepInside);
			previous?.focus?.();
		};
	}
}

export { FocusUtils };
