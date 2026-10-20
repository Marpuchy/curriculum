# Currículum de Marc Ibáñez

CV web de Marc Ibáñez como desarrollador junior, publicado en https://marpuchy.github.io/curriculum/.
Lo leen reclutadores en escritorio y móvil, pero el uso principal es **exportarlo a PDF** para enviarlo:
ese PDF debe ocupar una sola página A4, tener capa de texto y pasar filtros ATS.

## Stack

- HTML, CSS y JavaScript sin dependencias ni build.
- Fuentes IBM Plex Sans (400/600/700) y Serif (600) **estáticas y alojadas en `fonts/`**. No volver a Google
  Fonts: sirve fuentes variables que Chrome incrusta en el PDF como Type 3, peor para los ATS.
- GitHub Pages desde `main` / raíz (`.nojekyll` presente).
- Herramientas locales: Node 22, Chrome 155, `pdftotext` (Git for Windows / mingw64).

## Comandos

```bash
# Servir en local (cualquiera de los dos)
npx --yes serve .            # http://localhost:3000
python -m http.server 8000   # http://localhost:8000

# Exportar el PDF con capa de texto (desde la raíz del repo)
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu \
  --no-pdf-header-footer --print-to-pdf="cv.pdf" "file:///D:/Classe/curriculum/index.html"

# Comprobar el PDF (pdfinfo no está instalado; cada página acaba en un salto \f)
pdftotext -enc UTF-8 cv.pdf - | tr -cd '\f' | wc -c   # nº de páginas: debe ser 1
pdftotext -enc UTF-8 cv.pdf - | less                  # orden de lectura
pdftotext -enc UTF-8 -raw cv.pdf - | less             # orden del flujo de contenido
```

Desde el navegador (Ctrl+P): destino «Guardar como PDF», papel A4, escala 100 %. `@page` tiene
margen 0, así que no salen encabezados ni pies aunque estén activados.

No hay lint ni tests. TODO: si se añade un generador o script de exportación, documentarlo aquí.

## Estructura

- `index.html` – marcado del CV (contenido principal a la izquierda, columna lateral a la derecha).
- `styles.css` – tokens en `:root`, estilos de pantalla, responsive y `@media print`.
- `script.js` – textos ES/EN y cambio de idioma (`data-i18n`).
- `img.png` – foto de perfil. `img_1..5.png` – iconos antiguos, ya sin uso (sustituidos por SVG de lucide en línea).
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
  (nombre, título, perfil, experiencia, proyectos, competencias, formación, idiomas, contacto).
- Tras cualquier cambio visual, regenerar el PDF y comprobarlo con `pdfinfo` y `pdftotext`.
- No hacer commits, push ni borrar archivos sin preguntar.
- No tocar el repo `Marpuchy.github.io` (contiene otros proyectos) desde aquí.
