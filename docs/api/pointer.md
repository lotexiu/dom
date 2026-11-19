# `pointer`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`TPointerPosition`](#tpointerposition) | tipo | The part of a pointer event `PointerUtils.offset` reads; a DOM `PointerEvent` fits as is. |
| [`PointerUtils`](#pointerutils) | classe | Pointer helpers: clicks outside overlays and positions along a slider track. |

---

## `TPointerPosition`

tipo · [src/pointer/types.ts:2](../../src/pointer/types.ts#L2)

The part of a pointer event `PointerUtils.offset` reads; a DOM `PointerEvent` fits as is.

```ts
type TPointerPosition = { … }
```

### Propriedades

#### `readonly clientX: number`

Horizontal position in the viewport.

#### `readonly clientY: number`

Vertical position in the viewport.

---

## `PointerUtils`

classe · [src/pointer/utils.ts:5](../../src/pointer/utils.ts#L5)

Pointer helpers: clicks outside overlays and positions along a slider track.

```ts
class PointerUtils
```

### Estáticos

#### `static onOutside(inside: () => readonly (Element | null | undefined)[], handler: () => void, target: Document = document): () => void`

Calls `handler` on a pointer down outside every element `inside` returns — wire it to a control's `interactOutside`
(`Dialog`, `Popover`, `Menu`, `Select`, `Combobox`). Returns the function that stops listening.

#### `static offset(position: TPointerPosition, track: Element, orientation: TOrientation = 'horizontal'): [offset: number, length: number]`

Distance of the pointer from the start of `track` along its axis, and the track length — the two numbers
`Slider.pointerDown`/`pointerMove` take.

**Exemplo**

```ts
volume.pointerDown(...PointerUtils.offset(event, trackElement))
```
