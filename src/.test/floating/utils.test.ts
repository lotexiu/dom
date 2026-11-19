import { afterEach, describe, expect, it } from 'vitest';
import { LayerStack, Popover } from '@lotexiu/typescript';
import { FloatingUtils } from '../../floating/utils';
import { PointerUtils } from '../../pointer/utils';

afterEach(() => {
	document.body.innerHTML = '';
});

function fakeRect(element: Element, rect: { left: number; top: number; width: number; height: number }) {
	element.getBoundingClientRect = () => ({ ...rect, x: rect.left, y: rect.top, right: rect.left + rect.width, bottom: rect.top + rect.height, toJSON: () => rect }) as DOMRect;
}

describe('PointerUtils.offset and FloatingUtils', () => {
	it('measures the pointer along the track axis', () => {
		const track = document.createElement('div');
		fakeRect(track, { left: 100, top: 50, width: 200, height: 20 });
		expect(PointerUtils.offset({ clientX: 150, clientY: 60 }, track)).toEqual([50, 200]);
		expect(PointerUtils.offset({ clientX: 150, clientY: 60 }, track, 'vertical')).toEqual([10, 20]);
	});

	it('places a popover from the measured anchor and content', () => {
		const anchor = document.createElement('button');
		const content = document.createElement('div');
		fakeRect(anchor, { left: 10, top: 10, width: 80, height: 30 });
		fakeRect(content, { left: 0, top: 0, width: 120, height: 60 });
		const popover = new Popover({ placement: 'bottom-start', offset: 4, layers: new LayerStack() });
		const stop = FloatingUtils.follow(popover, anchor, content);
		expect(popover.position()).toMatchObject({ x: 10, y: 44, side: 'bottom' });
		stop();
	});
});
