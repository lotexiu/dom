import { afterEach, describe, expect, it } from 'vitest';
import { Slider } from '@lotexiu/typescript';
import { AttributeUtils } from '../../attribute/utils';

afterEach(() => {
	document.body.innerHTML = '';
});


describe('AttributeUtils', () => {
	it('writes values, removes undefined and drops attributes that disappeared', () => {
		const element = document.createElement('div');
		AttributeUtils.apply(element, { role: 'slider', 'aria-valuenow': 3, hidden: '' });
		expect(element.getAttribute('aria-valuenow')).toBe('3');
		AttributeUtils.apply(element, { role: 'slider' }, { role: 'slider', 'aria-valuenow': 3, hidden: '' });
		expect(element.hasAttribute('aria-valuenow')).toBe(false);
		expect(element.hasAttribute('hidden')).toBe(false);
	});

	it('keeps a headless part in sync until stopped', () => {
		const element = document.createElement('div');
		const volume = new Slider({ value: 10 });
		const stop = AttributeUtils.bind(element, () => volume.parts.thumb());
		expect(element.getAttribute('role')).toBe('slider');
		volume.increment();
		expect(element.getAttribute('aria-valuenow')).toBe('11');
		stop();
		volume.increment();
		expect(element.getAttribute('aria-valuenow')).toBe('11');
	});
});
