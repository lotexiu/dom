# @lotexiu/dom

A ponte entre [`@lotexiu/typescript`](../typescript) e o DOM, **sem framework**. Os controles headless da lib devolvem dados (estado, intenções, atributos por parte); este pacote os aplica em elementos reais. Os adaptadores de framework (`@lotexiu/react`, `@lotexiu/angular`) usam estas funções por baixo — e qualquer código em JS puro, Svelte ou Web Components pode usá-las direto.

```ts
import { Slider } from '@lotexiu/typescript'
import { AttributeUtils, PointerUtils } from '@lotexiu/dom'

const volume = new Slider({ min: 0, max: 100, value: 30 })
AttributeUtils.bind(thumb, () => volume.parts.thumb())        // role, aria-valuenow… sempre atualizados
thumb.addEventListener('keydown', volume.keydown)        // o KeyboardEvent serve direto
track.addEventListener('pointerdown', (event) => volume.pointerDown(...PointerUtils.offset(event, track)))
```

| Função | Para quê |
|---|---|
| `AttributeUtils.bind(element, () => control.parts.x())` | aplica uma parte headless e a mantém sincronizada |
| `AttributeUtils.apply(element, next, previous?)` | escreve um conjunto de atributos uma vez |
| `CssVariableUtils.bind(element, () => record)` | mantém variáveis CSS (`--nome`) iguais a um registro reativo (tokens, cores de papel) |
| `FocusUtils.trap(container)` | prende o foco num dialog modal e devolve ao sair |
| `PointerUtils.onOutside(() => elements, handler)` | clique fora → `control.interactOutside` |
| `FloatingUtils.follow(popover, anchor, floating)` | mede e posiciona um `Popover` (redimensionar/rolar incluídos) |
| `PointerUtils.offset(event, track, orientation?)` | `[distância, comprimento]` para `Slider.pointerDown/pointerMove` |

A referência completa, gerada do código, fica em [`docs/api`](docs/api/README.md).
