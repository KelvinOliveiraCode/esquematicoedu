# esquematicoedu

**English** · [Português (Brasil)](README.md)

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](#) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](#) [![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#) [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-222?style=flat-square&logo=githubpages)](#)

## What it is

The official page of the educational YouTube channel **EsquemáticoEdu** ("the whole subject, as a diagram"). It presents the channel's classes, its study tracks, the video production method and the supporting materials. It is a static HTML/CSS/JS site.

## Status

In production. Published at <https://kelvinoliveiracode.github.io/esquematicoedu/> (HTTP 200 verified).

## Features

- **Hero and channel presentation** ("one long class, quite literally").
- **Seven study tracks** and a library of classes.
- **Production section**: how the class is born (in HTML) and becomes a video.
- **Supporting materials** that go from the screen to paper.
- **FAQ** ("before you start watching").
- **YouTube channel link**.
- **Own styling/theme** with JavaScript interactivity (`script.js`, 404 lines).

## Architecture

A single-page static site: `index.html` (670 lines) + `styles.css` (2,014 lines) + `script.js` (404 lines), no framework and no build.

## Stack

- HTML5, CSS3, vanilla JavaScript
- Hosting: GitHub Pages

## Repository layout

```
esquematicoedu/
├── index.html    # the page (670 lines)
├── styles.css    # styling (2,014 lines)
└── script.js     # interactivity (404 lines)
```

## Prerequisites and installation

None. Just serve the folder statically.

## How to run

```bash
python -m http.server 8080
# go to http://localhost:8080
```

## Tests and quality

There are no automated tests or CI in this repository (no `package.json` or workflow confirmed).

## Technical decisions and trade-offs

- **Zero framework, single HTML**: a light page, easy to publish on GitHub Pages; content edited directly in the HTML.
- **Vanilla JS interactivity**: effects and scrolling with no external dependencies.

## Known limitations and roadmap

- Static page: updating tracks/materials requires editing `index.html`.
- No backend/form integration.

## Development process

An individual project by Kelvin Oliveira, built with orchestrated AI agents and reviewed by the author. The page structure and the review are the author's.

## License and author

This repository has **no license file** (no `LICENSE`). Copyright (c) Kelvin Rebelo de Oliveira.

**Author**: [Kelvin Oliveira](https://github.com/KelvinOliveiraCode) · [YouTube — EsquemáticoEdu](https://www.youtube.com/channel/UC7IBK0kE-myJgRuOrYZA1PQ)
