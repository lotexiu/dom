# `focus`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`FocusUtils`](#focusutils) | classe | Keyboard focus helpers for overlays. |

---

## `FocusUtils`

classe · [src/focus/utils.ts:4](../../src/focus/utils.ts#L4)

Keyboard focus helpers for overlays.

```ts
class FocusUtils
```

### Estáticos

#### `static tabbables(container: Element): HTMLElement[]`

Elements inside `container` that Tab can reach, in document order (hidden ones left out).

#### `static trap(container: HTMLElement): () => void`

Keeps keyboard focus inside `container`: focuses its first tabbable element (or the container itself), makes Tab and
Shift+Tab cycle inside it, and returns the function that releases it and gives the focus back to where it was.
Pair it with a modal `Dialog`.
