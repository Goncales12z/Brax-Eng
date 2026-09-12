# Brax Engenharia — Site Institucional

Site estático (HTML/CSS/JS puro, sem build tools) para a Brax Engenharia Consultoria e Projetos, empresa de engenharia civil, elétrica e mecânica no Rio de Janeiro.

## Estrutura

```
brax-site/
├── index.html      # marcação e conteúdo
├── css/
│   └── style.css   # estilos, tokens de design e responsividade
└── js/
    └── main.js     # menu mobile (abrir/fechar)
```

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
