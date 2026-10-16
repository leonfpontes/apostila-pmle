# Design system

Base: **shadcn/ui** (estilo `base-nova`, primitivas Base UI) + **Tailwind v4**, com a identidade visual da ATRA. Toda cor, largura e espaçamento recorrente vem de variáveis CSS globais em `src/index.css`. Não escreva hex ou larguras fixas nos componentes.

## Identidade ATRA

| Token | Claro | Uso |
|---|---|---|
| `--brand` | `#0D99FF` | azul ATRA: decoração, anéis de foco, gráficos |
| `--brand-text` | `#009EDB` | subtítulos e frases de apoio |
| `--brand-orange` | `#F29113` | laranja ATRA: ícones de alerta, estrelas, detalhes |
| `--brand-orange-ink` | `#9a5200` | laranja com contraste para texto (kicker) |
| `--brand-tint` | `#E8F6FF` | fundo de destaque (próximo passo, chamadas) |
| `--primary` | `#0071CE` | botões e links (azul ATRA escurecido para contraste AA) |
| `--success` / `--success-bg` | `#138a4a` / `#e7f6ed` | acerto, concluído |
| `--destructive` | `#c62f2f` | erro, apagar |

Cada token tem a versão escura em `.dark`. Logo e ícone em `public/assets/` (tirados de atra.com.br).

No Tailwind, os tokens viram classes: `bg-brand`, `text-brand-text`, `bg-brand-tint`, `text-success`, `bg-success-bg`, `text-brand-orange-ink`…

## Layout

| Variável | Valor | Onde |
|---|---|---|
| `--largura-leitura` | 48rem | páginas de texto e formulários (`<Pagina largura="leitura">`) |
| `--largura-pagina` | 64rem | páginas com grade de cards (padrão) |
| `--largura-larga` | 72rem | documentos com índice lateral |
| `--altura-topo` | 3.5rem | cabeçalho fixo; também o deslocamento de âncoras |
| `--largura-menu` | 18rem | menu lateral |

## Utilitários globais

Definidos com `@utility` em `src/index.css`. Use-os em vez de repetir as mesmas classes:

| Classe | Para quê |
|---|---|
| `kicker` | rótulo pequeno acima de títulos ("MÓDULO 1 · SEÇÃO 2") |
| `titulo-bloco` | título de bloco dentro de uma página |
| `link-texto` | link de texto na cor da marca |
| `card-interativo` | card clicável (realça a borda no hover) |
| `superficie-destaque` | fundo azul claro de chamadas |
| `ancora` | compensa o cabeçalho fixo ao rolar até um elemento |
| `apostila` | estilo de todo conteúdo Markdown (aplicado pelo `<Markdown>`) |

## Componentes compartilhados (`src/components/shared/`)

| Componente | Uso |
|---|---|
| `Pagina`, `CabecalhoDaPagina`, `Migalhas` | estrutura de toda página (contêiner, cabeçalho, rodapé) |
| `ComDados`, `Carregando`, `Erro`, `NaoEncontrada` | estados de carregamento e erro |
| `BotaoLink`, `LinkTexto`, `CardLink`, `Paginacao` | navegação |
| `Destaque` | chamada com rótulo, título, texto e ação; base do "próximo passo" |
| `CartaoInformativo` | card pequeno com ícone, título, texto e link |
| `AnelDeProgresso`, `Numero`, `Estrelas`, `Etiqueta` | indicadores |
| `Markdown`, `MdInline` | conteúdo das notas |
| `Kbd` | tecla de atalho |

## Componentes do shadcn (`src/components/ui/`)

Instalados pelo CLI e mantidos como estão. Para adicionar um: `npx shadcn@latest add <nome>`. Se precisar de um visual diferente, componha em `components/shared/` em vez de editar o arquivo do shadcn.

Em uso: accordion, alert, badge, breadcrumb, button, card, checkbox, collapsible, command, dialog, input, input-group, label, progress, select, separator, sidebar, skeleton, switch, tabs, toggle-group, tooltip.

Detalhe do Base UI: para um botão que navega, use `<BotaoLink para="…">` (ele passa `render={<Link/>}` e `nativeButton={false}` por você).

## Regras de UX

- Toda página começa com `CabecalhoDaPagina` (migalhas, kicker, título, subtítulo) e termina no rodapé da `Pagina`.
- Toda atividade termina dizendo o que fazer em seguida (`Destaque` com ação).
- Texto na voz da turma, em português, frases curtas. Termos técnicos do Google ficam em inglês.
- Contraste AA: texto e botões usam `--primary`, não `--brand`.
- Testar no tema claro, no escuro e na largura de celular (375 px) sem rolagem horizontal.
