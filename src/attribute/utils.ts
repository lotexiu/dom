import { computed } from '@lotexiu/typescript';
import type { TAttributes } from '@lotexiu/typescript';

/** Writes the attributes of headless parts on real elements. */
class AttributeUtils {
	/**
	 * Writes the attributes on the element: `undefined` removes one, anything else becomes its text. Attributes present in
	 * `previous` but missing from `next` are removed, so passing the last applied set keeps the element clean.
	 */
	static apply(element: Element, next: TAttributes, previous: TAttributes = {}): void {
		for (const name of Object.keys(previous)) {
			if (!(name in next) || next[name] === undefined) element.removeAttribute(name);
		}
		for (const [name, value] of Object.entries(next)) {
			if (value === undefined) element.removeAttribute(name);
			else if (element.getAttribute(name) !== String(value)) element.setAttribute(name, String(value));
		}
	}

	/**
	 * Applies the attributes `read` returns — usually a headless part, `() => slider.parts.thumb()` — and keeps them in
	 * sync whenever the signals it reads change. Returns the function that stops it.
	 * @example
	 * const stop = AttributeUtils.bind(thumbElement, () => volume.parts.thumb())
	 */
	static bind(element: Element, read: () => TAttributes): () => void {
		const view = computed(read);
		let applied = view();
		AttributeUtils.apply(element, applied);
		const unsubscribe = view.subscribe((next) => {
			AttributeUtils.apply(element, next, applied);
			applied = next;
		});
		return () => {
			unsubscribe();
			view.dispose();
		};
	}
}

export { AttributeUtils };
