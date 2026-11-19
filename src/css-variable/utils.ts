import { computed } from '@lotexiu/typescript';
import { CSS_VARIABLE_PREFIX } from './declarations';

/** Mirrors reactive records as CSS custom properties. */
class CssVariableUtils {
	/**
	 * Keeps CSS custom properties on `element` equal to the record `read` returns (`{ accent: '#36c' }` → `--accent`),
	 * e.g. a theme's tokens. Returns the function that stops following it.
	 * @example
	 * CssVariableUtils.bind(document.documentElement, () => theme.tokens())
	 */
	static bind(element: HTMLElement, read: () => Readonly<Record<string, string>>): () => void {
		const view = computed(read);
		let applied: Readonly<Record<string, string>> = {};
		const apply = (next: Readonly<Record<string, string>>) => {
			for (const name of Object.keys(applied)) {
				if (!(name in next)) element.style.removeProperty(CSS_VARIABLE_PREFIX + name);
			}
			for (const [name, value] of Object.entries(next)) element.style.setProperty(CSS_VARIABLE_PREFIX + name, value);
			applied = next;
		};
		apply(view());
		const unsubscribe = view.subscribe(apply);
		return () => {
			unsubscribe();
			view.dispose();
		};
	}
}

export { CssVariableUtils };
