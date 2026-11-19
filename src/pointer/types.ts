/** The part of a pointer event `PointerUtils.offset` reads; a DOM `PointerEvent` fits as is. */
type TPointerPosition = {
	/** Horizontal position in the viewport. */
	readonly clientX: number;
	/** Vertical position in the viewport. */
	readonly clientY: number;
};

export type { TPointerPosition };
