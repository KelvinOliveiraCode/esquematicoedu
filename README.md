# esquematicoedu

[English](README.en.md) · **Português (Brasil)**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#) [![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#) [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-222?style=flat-square&logo=githubpages)](#)

## O que é

Página oficial do canal educacional **EsquemáticoEdu** ("a matéria inteira, em esquema"). Apresenta o canal de aulas, suas trilhas de estudo, o método de produção dos vídeos e os materiais de apoio. É um site estático em HTML/CSS/JS.

## Status

Em produção. Publicado em <https://kelvinoliveiracode.github.io/esquematicoedu/> (HTTP 200 verificado).

## Funcionalidades

- **Hero e apresentação do canal** ("uma aula longa, no sentido literal").
- **Sete trilhas de estudo** e acervo de aulas.
- **Seção de produção**: como a aula nasce (em HTML) e vira vídeo.
- **Materiais de apoio** que saem da tela para o papel.
- **FAQ** ("antes de começar a assistir").
- **Link para o canal no YouTube**.
- **Tema/estilo próprio** com interatividade em JavaScript (`script.js`, 404 linhas).

## Arquitetura

Site estático de página única: `index.html` (670 linhas) + `styles.css` (2.014 linhas) + `script.js` (404 linhas), sem framework e sem build.

## Stack

- HTML5, CSS3, JavaScript vanilla
- Hospedagem: GitHub Pages

## Estrutura do repositório

```
esquematicoedu/
├── index.html    # a página (670 linhas)
├── styles.css    # estilo (2.014 linhas)
└── script.js     # interatividade (404 linhas)
```

## Pré-requisitos e instalação

Nenhum. Basta servir a pasta estaticamente.

## Como executar

```bash
python -m http.server 8080
# acesse http://localhost:8080
```

## Testes e qualidade

Não há testes automatizados nem CI neste repositório (ausência de `package.json` e workflow confirmada).

## Decisões técnicas e trade-offs

- **Zero framework, um único HTML**: página leve e fácil de publicar no GitHub Pages; conteúdo editado diretamente no HTML.
- **Interatividade em JS vanilla**: efeitos e rolagem sem dependências externas.

## Limitações conhecidas e roadmap

- Página estática: atualizar trilhas/materiais exige editar o `index.html`.
- Sem integração de backend/formulários.

## Processo de desenvolvimento

Projeto individual de Kelvin Oliveira, construído com agentes de IA orquestrados e revisado pelo autor. A estrutura da página e a revisão são do autor.

## Licença e autor

Este repositório **não possui arquivo de licença** (sem `LICENSE`). Copyright (c) Kelvin Rebelo de Oliveira.

**Autor**: [Kelvin Oliveira](https://github.com/KelvinOliveiraCode) · [YouTube — EsquemáticoEdu](https://www.youtube.com/channel/UC7IBK0kE-myJgRuOrYZA1PQ)
