# `css-variable`

_Gerado por `src/.scripts/doc/generate.ts` a partir do código-fonte — não editar à mão._

[← Índice da API](README.md)

| Símbolo | Tipo | Resumo |
|---|---|---|
| [`CssVariableUtils`](#cssvariableutils) | classe | Mirrors reactive records as CSS custom properties. |

---

## `CssVariableUtils`

classe · [src/css-variable/utils.ts:5](../../src/css-variable/utils.ts#L5)

Mirrors reactive records as CSS custom properties.

```ts
class CssVariableUtils
```

### Estáticos

#### `static bind(element: HTMLElement, read: () => Readonly<Record<string, string>>): () => void`

Keeps CSS custom properties on `element` equal to the record `read` returns (`{ accent: '#36c' }` → `--accent`),
e.g. a theme's tokens. Returns the function that stops following it.

**Exemplo**

```ts
CssVariableUtils.bind(document.documentElement, () => theme.tokens())
```
