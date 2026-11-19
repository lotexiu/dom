# `floating`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`FloatingUtils`](#floatingutils) | classe | Measures elements and keeps popovers placed against their anchors. |

---

## `FloatingUtils`

classe · [src/floating/utils.ts:4](../../src/floating/utils.ts#L4)

Measures elements and keeps popovers placed against their anchors.

```ts
class FloatingUtils
```

### Estáticos

#### `static rectOf(element: Element): TRect`

The element's box in viewport coordinates.

#### `static viewport(view: Window = window): TRect`

The visible area of the window.

#### `static follow(popover: Popover, anchor: Element, floating: Element, view: Window = window): () => void`

Measures `anchor` and `floating` and calls `popover.place` now and on every resize or scroll, so `popover.position()`
stays right. Apply the position with `position: fixed` and `left`/`top`. Returns the function that stops following.
