import type { Popover, TRect } from '@lotexiu/typescript';

/** Measures elements and keeps popovers placed against their anchors. */
class FloatingUtils {
	/** The element's box in viewport coordinates. */
	static rectOf(element: Element): TRect {
		const bounds = element.getBoundingClientRect();
		return { x: bounds.left, y: bounds.top, width: bounds.width, height: bounds.height };
	}

	/** The visible area of the window. */
	static viewport(view: Window = window): TRect {
		return { x: 0, y: 0, width: view.innerWidth, height: view.innerHeight };
	}

	/**
	 * Measures `anchor` and `floating` and calls `popover.place` now and on every resize or scroll, so `popover.position()`
	 * stays right. Apply the position with `position: fixed` and `left`/`top`. Returns the function that stops following.
	 */
	static follow(popover: Popover, anchor: Element, floating: Element, view: Window = window): () => void {
		const update = () => {
			const { width, height } = FloatingUtils.rectOf(floating);
			popover.place(FloatingUtils.rectOf(anchor), { width, height }, FloatingUtils.viewport(view));
		};
		update();
		view.addEventListener('resize', update);
		view.addEventListener('scroll', update, true);
		return () => {
			view.removeEventListener('resize', update);
			view.removeEventListener('scroll', update, true);
		};
	}
}

export { FloatingUtils };
