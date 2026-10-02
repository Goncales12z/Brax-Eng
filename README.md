# Brax Engenharia — Site Institucional

Site estático (HTML/CSS/JS puro, sem build tools) para a Brax Engenharia Consultoria e Projetos, empresa de engenharia civil, elétrica e mecânica no Rio de Janeiro.

## Estrutura

```
brax-site/
├── index.html          # marcação e conteúdo
├── favicon.ico         # ícone da aba do navegador
├── css/
│   └── style.css       # estilos, tokens de design e responsividade
├── js/
│   └── main.js         # menu mobile, scrollspy, reveal on scroll, barra de progresso
└── img/
    ├── brax-icon.png / .webp         # logomarca (só o ícone) — usada no menu
    ├── brax-logo-full.png / .webp    # logotipo completo (ícone + texto) — usada no rodapé
    ├── favicon-32.png                # favicon em PNG (fallback)
    ├── apple-touch-icon.png          # ícone para tela de início no iOS
    └── og-image.jpg                  # imagem de pré-visualização ao compartilhar o link (WhatsApp, redes sociais)
```

## Correções desta revisão (Out/2026)

Revisão feita em cima do relatório do [PageSpeed Insights](https://pagespeed.web.dev/) e de um bug relatado no menu mobile:

- **Bug crítico corrigido — menu mobile transparente:** o menu de celular era o mesmo elemento usado no menu desktop, posicionado como `position:fixed` *dentro* do `<header>`. Como o `<header>` tem `backdrop-filter` (usado pra dar o efeito de vidro fosco), ele vira automaticamente o "container de referência" desse elemento `fixed` — e não mais a tela inteira. Isso fazia o menu calcular um tamanho errado (quase zero) e renderizar praticamente invisível. A correção: o menu mobile agora é um elemento próprio (`#mobileMenu`), fora do `<header>`, então ele sempre usa a tela inteira como referência — sem depender de nenhum elemento pai.
- **Performance:** a logo do rodapé estava sendo servida em 549×447px (100 KB) para ser exibida em ~42×34px — agora está redimensionada para o tamanho real de uso (168×137px) com uma versão `.webp` adicional (2,7 KB) servida via `<picture>`, com PNG como reserva. O favicon também foi comprimido (de 7,5 KB para <1 KB). Todas as imagens agora têm `width`/`height` definidos no HTML para evitar deslocamento de layout (CLS) enquanto carregam.
- **Acessibilidade:** o laranja usado nos rótulos pequenos (`ÉTICA`, `RESPONS.`, etc. e nas tags de seção) tinha contraste insuficiente sobre o fundo claro (3,52:1) — ajustado para 4,9:1, dentro do padrão AA do WCAG. Ícones puramente decorativos agora têm `aria-hidden="true"`.
- **SEO:** adicionados `link rel="canonical"`, `og:url` e dados estruturados (JSON-LD, `ProfessionalService`) com endereço, telefone, horário de funcionamento e nota — ajuda o Google a exibir o negócio de forma mais rica nos resultados de busca.
- **Novas interações:** barra de progresso de leitura no topo, botão "voltar ao topo", destaque automático do item do menu conforme a seção visível na tela (scrollspy), e animações suaves de entrada ao rolar a página — todas respeitando `prefers-reduced-motion` para quem desativa animações no sistema.

## Rodando localmente

Não há dependências. Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático:

```bash
python3 -m http.server 8000
```

## Publicando no GitHub Pages

1. Crie o repositório no GitHub e suba estes arquivos:
   ```bash
   git init
   git add .
   git commit -m "Site institucional Brax Engenharia"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
   git push -u origin main
   ```
2. No repositório, vá em **Settings → Pages**.
3. Em **Source**, selecione a branch `main` e a pasta `/ (root)`.
4. Salve. O site fica disponível em `https://SEU_USUARIO.github.io/NOME_DO_REPO/`.

Se for usar um domínio próprio, adicione um arquivo `CNAME` na raiz com o domínio (mesmo esquema usado no `dennisdias.com.br`).

## Notas de manutenção

- Fontes carregadas via Google Fonts (`Space Grotesk`, `IBM Plex Sans`, `IBM Plex Mono`) — exigem conexão com a internet.
- O botão "Solicitar orçamento" do formulário de contato monta uma mensagem e redireciona para o WhatsApp da empresa (`wa.me/5521983943349`); não há backend nem envio de e-mail.
- Cores, tipografia e demais tokens de design ficam centralizados em `:root` no topo do `css/style.css`.
- As tags `og:image` e `twitter:image` no `<head>` usam caminho relativo (`img/og-image.jpg`). Depois de publicar o site (GitHub Pages ou domínio próprio), troque para a URL absoluta (ex.: `https://seudominio.com/img/og-image.jpg`) para a pré-visualização funcionar corretamente ao compartilhar o link no WhatsApp/redes sociais.
