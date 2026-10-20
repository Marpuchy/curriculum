# Currículum de Marc Ibáñez

CV web de Marc Ibáñez como desarrollador junior, en dos versiones generadas desde los mismos datos:
desarrollo web (principal, https://marpuchy.github.io/curriculum/) y videojuegos (`/curriculum/videojuegos/`).
Lo leen reclutadores en escritorio y móvil, pero el uso principal es **exportarlo a PDF** para enviarlo:
ese PDF debe ocupar una sola página A4, tener capa de texto y pasar filtros ATS.

## Stack

- HTML estático generado por `build.js` (Node, sin dependencias) a partir de `data/cv.json`. Sin JS en la página.
- Fuentes IBM Plex Sans (400/600/700) y Serif (600) **estáticas y alojadas en `fonts/`**. No volver a Google
  Fonts: sirve fuentes variables que Chrome incrusta en el PDF como Type 3, peor para los ATS.
- GitHub Pages desde `main` / raíz (`.nojekyll` presente).
- Herramientas locales: Node 22, Chrome 155, `pdftotext` (Git for Windows / mingw64).

## Comandos

```bash
# Regenerar el HTML tras editar data/cv.json (lista también los TODO pendientes)
node build.js

# Servir en local (cualquiera de los dos)
npx --yes serve .            # http://localhost:3000
python -m http.server 8000   # http://localhost:8000

# Exportar el PDF con capa de texto (desde la raíz del repo)
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --no-pdf-header-footer --print-to-pdf="cv.pdf" "file:///D:/Classe/curriculum/index.html"
# Versión videojuegos: misma orden con .../curriculum/videojuegos/index.html

# Comprobar el PDF (pdfinfo no está instalado; cada página acaba en un salto \f)
pdftotext -enc UTF-8 cv.pdf - | tr -cd '\f' | wc -c   # nº de páginas: debe ser 1
pdftotext -enc UTF-8 cv.pdf - | less                  # orden de lectura
pdftotext -enc UTF-8 -raw cv.pdf - | less             # orden del flujo de contenido
```

Desde el navegador (Ctrl+P): destino «Guardar como PDF», papel A4, escala 100 %. `@page` tiene
margen 0, así que no salen encabezados ni pies aunque estén activados.

No hay lint ni tests: la verificación es `node build.js` + PDF de ambas versiones (1 página, URL completas).

## Estructura

- `data/cv.json` – **fuente única** del contenido. Textos en `i18n.es` (para inglés: añadir `i18n.en` y `"en"`
  en `languages`; se generará en `/en/`). `versions` decide qué secciones y proyectos lleva cada versión.
  Los campos `todo` son preguntas pendientes: no se publican.
- `build.js` – plantilla y generador. Escribe `index.html` y `videojuegos/index.html`: **no editarlos a mano**.
- `styles.css` – tokens en `:root`, estilos de pantalla, responsive y `@media print`.
- `img.png` – foto de perfil. Los iconos son SVG de lucide en línea, generados por `build.js`.
- `fonts/` – woff2 de IBM Plex y su licencia OFL.
- `.claude/` – hook de comprobación, skill `curriculum-design-system` y agente `ui-reviewer`.

## Convenciones

- Textos en español; la estructura debe permitir añadir inglés más adelante.
- El apellido se escribe **Ibáñez** en todas partes.
- **No inventar** tareas, resultados, fechas ni datos: si falta información, dejar `TODO:` y preguntar.
- Verbos de acción concretos en experiencia y proyectos («Desarrollé…», «Implementé…»).
- Todo el texto del CV debe ser texto real del DOM (nada de texto dentro de imágenes): es lo que lee el ATS.
- Archivos en UTF-8 (sin «Â» ni caracteres rotos).
- Commits en español, en imperativo y cortos (p. ej. «Añade columna lateral en impresión»).
- Diseño: sigue la skill `curriculum-design-system`.

## Forma de trabajar

- Prioridad: PDF en una página A4, dos columnas, texto extraíble en orden lógico
  (nombre, título, perfil + idiomas, experiencia, proyectos, competencias, formación, info adicional, contacto).
- Tras cualquier cambio de datos o estilos: `node build.js`, regenerar el PDF de **las dos** versiones y
  comprobar con `pdftotext` que es 1 página y que las URL salen completas. La de videojuegos va justa (~90 %).
- No hacer commits, push ni borrar archivos sin preguntar.
- No tocar el repo `Marpuchy.github.io` (contiene otros proyectos) desde aquí.
