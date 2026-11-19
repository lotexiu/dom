import { afterEach, describe, expect, it, vi } from 'vitest';
import { PointerUtils } from '../../pointer/utils';

afterEach(() => {
	document.body.innerHTML = '';
});


describe('PointerUtils.onOutside', () => {
	it('ignores pointer downs inside the given elements', () => {
		document.body.innerHTML = '<div id="inside"><span id="child"></span></div><div id="outside"></div>';
		const handler = vi.fn();
		const stop = PointerUtils.onOutside(() => [document.getElementById('inside')], handler);
		document.getElementById('child')!.dispatchEvent(new Event('pointerdown', { bubbles: true }));
		expect(handler).not.toHaveBeenCalled();
		document.getElementById('outside')!.dispatchEvent(new Event('pointerdown', { bubbles: true }));
		expect(handler).toHaveBeenCalledOnce();
		stop();
	});
});
