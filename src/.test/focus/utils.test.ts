import { afterEach, describe, expect, it } from 'vitest';
import { FocusUtils } from '../../focus/utils';

afterEach(() => {
	document.body.innerHTML = '';
});


describe('FocusUtils', () => {
	it('focuses inside, cycles Tab and restores the focus', () => {
		document.body.innerHTML = '<button id="outside"></button><div id="box"><button id="first"></button><button id="last"></button></div>';
		const outside = document.getElementById('outside')!;
		outside.focus();
		const release = FocusUtils.trap(document.getElementById('box')!);
		expect(document.activeElement?.id).toBe('first');
		document.getElementById('last')!.focus();
		document.activeElement!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
		expect(document.activeElement?.id).toBe('first');
		release();
		expect(document.activeElement?.id).toBe('outside');
	});
});
