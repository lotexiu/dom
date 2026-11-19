import { afterEach, describe, expect, it } from 'vitest';
import { signal } from '@lotexiu/typescript';
import { CssVariableUtils } from '../../css-variable/utils';

afterEach(() => {
	document.body.innerHTML = '';
});


describe('CssVariableUtils', () => {
	it('mirrors a reactive record as custom properties', () => {
		const accent = signal('#123456');
		const element = document.createElement('div');
		const stop = CssVariableUtils.bind(element, () => ({ accent: accent() }));
		expect(element.style.getPropertyValue('--accent')).toBe('#123456');
		accent.set('#abcdef');
		expect(element.style.getPropertyValue('--accent')).toBe('#abcdef');
		stop();
	});
});
