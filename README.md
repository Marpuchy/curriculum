# Currículum – Marc Ibáñez

Currículum web de Marc Ibáñez, desarrollador junior, en dos versiones generadas a partir de los mismos datos:

- **Desarrollo web** (principal): https://marpuchy.github.io/curriculum/
- **Videojuegos**: https://marpuchy.github.io/curriculum/videojuegos/

Cada versión está pensada para exportarse a un PDF A4 de **una sola página**, con capa de texto y compatible con ATS (los filtros automáticos de candidaturas).

## Exportar el PDF

### Desde el navegador

1. Abre la versión que quieras enviar en Chrome o Edge.
2. Pulsa `Ctrl + P`.
3. Destino: **Guardar como PDF**. Papel: **A4**. Escala: **100 %** (o «Predeterminada»).
4. Guarda.

No hace falta tocar márgenes ni desactivar encabezados: la hoja de estilos de impresión ya los controla, y la columna lateral se imprime con fondo claro.

> Usa «Guardar como PDF». «Microsoft Print to PDF» y otros controladores de impresora pueden convertir el texto en imagen, y entonces un ATS no puede leerlo.

### Desde la línea de comandos (Chrome headless)

```bash
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"   # Windows (Git Bash)

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="cv-marc-ibanez-web.pdf" "file:///D:/Classe/curriculum/index.html"

"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="cv-marc-ibanez-videojuegos.pdf" "file:///D:/Classe/curriculum/videojuegos/index.html"
```

Para comprobar el resultado:

```bash
pdftotext -enc UTF-8 cv-marc-ibanez-web.pdf - | tr -cd '\f' | wc -c   # nº de páginas: debe ser 1
pdftotext -enc UTF-8 cv-marc-ibanez-web.pdf -                         # todo el texto, en orden
```

Los `*.pdf` están en `.gitignore`.

## Editar el contenido

Todo el contenido está en **`data/cv.json`**. Las páginas HTML se generan a partir de ese archivo, así que no se editan a mano.

```bash
node build.js   # regenera index.html y videojuegos/index.html, y lista los TODO pendientes
```

No necesita dependencias (basta con Node 18 o superior).

- `versions` decide qué secciones, proyectos y grupos de competencias lleva cada versión, y en qué orden.
- Los textos traducibles están en `i18n.es`. Los datos que no se traducen (enlaces, tecnologías, contacto) están fuera, en `person` y `projects`.
- Los campos `todo` son notas internas: **no se publican**. `build.js` los muestra por consola.

Después de cada cambio, regenera el PDF de **las dos** versiones y comprueba que siguen ocupando una página. La de videojuegos es la más justa.

### Añadir una versión en inglés

1. Copia el bloque `i18n.es` como `i18n.en` y traduce los textos.
2. Añade `"en"` a `languages`.
3. Ejecuta `node build.js`. Se generarán `en/index.html` y `en/videojuegos/index.html`.

## Estructura

| Ruta | Contenido |
|---|---|
| `data/cv.json` | Fuente única del contenido |
| `build.js` | Plantilla y generador del HTML |
| `index.html`, `videojuegos/index.html` | Páginas generadas (no editar) |
| `styles.css` | Estilos de pantalla, responsive e impresión (`@media print`) |
| `fonts/` | IBM Plex Sans y Serif estáticas (licencia OFL en `fonts/OFL.txt`) |
| `img.png` | Foto de perfil |
| `.claude/` | Configuración de Claude Code: hook, sistema de diseño y agente `ui-reviewer` |

Las fuentes están alojadas en el propio repo, y no en Google Fonts, a propósito: Google Fonts sirve fuentes variables que Chrome incrusta en el PDF como Type 3, un formato que algunos ATS leen mal.

## Publicación

GitHub Pages publica la rama `main` desde la raíz (*Settings → Pages → Deploy from a branch → `main` / `(root)`*). El archivo `.nojekyll` hace que los archivos se sirvan tal cual.
