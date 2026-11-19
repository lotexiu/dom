# `attribute`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`AttributeUtils`](#attributeutils) | classe | Writes the attributes of headless parts on real elements. |

---

## `AttributeUtils`

classe · [src/attribute/utils.ts:5](../../src/attribute/utils.ts#L5)

Writes the attributes of headless parts on real elements.

```ts
class AttributeUtils
```

### Estáticos

#### `static apply(element: Element, next: TAttributes, previous: TAttributes = {}): void`

Writes the attributes on the element: `undefined` removes one, anything else becomes its text. Attributes present in
`previous` but missing from `next` are removed, so passing the last applied set keeps the element clean.

#### `static bind(element: Element, read: () => TAttributes): () => void`

Applies the attributes `read` returns — usually a headless part, `() => slider.parts.thumb()` — and keeps them in
sync whenever the signals it reads change. Returns the function that stops it.

**Exemplo**

```ts
const stop = AttributeUtils.bind(thumbElement, () => volume.parts.thumb())
```
