# Deploy

## Pipeline

```
push / pull request ──▶ GitHub Actions (CI): npm ci → lint → npm run build
push na main        ──▶ Vercel: build e publicação em produção
pull request        ──▶ Vercel: deploy de preview com link no PR
```

- **CI**: `.github/workflows/ci.yml`. Falha se o lint, a checagem de tipos ou a geração dos dados falharem.
- **Vercel**: integração Git do projeto `apostila-pmle` (time "Leonardo's projects"). Configuração em `vercel.json`: build `npm run build`, saída `dist`.

Repositório: https://github.com/leonfpontes/apostila-pmle

## Configuração da Vercel (uma vez)

Para o site ficar público:

1. **Settings → Deployment Protection**: desligar *Vercel Authentication*. Com ela ligada, os endereços pedem login da Vercel.
2. **Settings → Domains**: adicionar `apostila-pmle.vercel.app` (ou outro nome livre). Sem domínio de produção, o endereço curto responde 404.

## Outras hospedagens

`npm run build` gera `dist/`, que é o site inteiro. Como as rotas usam `#/` e os caminhos são relativos (`base: './'` no Vite), funciona em qualquer hospedagem estática, inclusive em subpasta:

- **Netlify**: `netlify.toml` já define build e pasta.
- **GitHub Pages**: publicar `dist/` com `actions/upload-pages-artifact`.
- **Cloud Storage / Firebase Hosting**: subir o conteúdo de `dist/`.
