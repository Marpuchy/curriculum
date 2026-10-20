---
name: curriculum-design-system
description: Usar siempre que se cree, modifique o revise cualquier sección, componente o estilo del Currículum de Marc Ibáñez (pantalla o impresión/PDF), para aplicar su sistema de diseño.
---

# Sistema de diseño – Currículum

## 1. Contexto

- **Qué es:** CV web de un desarrollador junior. Una sola página: contenido principal (izquierda) y columna lateral (derecha).
- **Quién lo usa:** reclutadores y técnicos de selección. Lo leen en 10–30 s: nombre, puesto, experiencia, stack.
- **Dispositivos:** escritorio y móvil; **el canal principal es el PDF A4** que se envía y que procesan los ATS.
- **Prioridades, en orden:** 1) texto extraíble y en orden lógico, 2) todo en una página A4, 3) lectura rápida (jerarquía clara), 4) aspecto cuidado en pantalla.
- **Fuente de verdad de los tokens:** `:root` de `styles.css`. No escribir colores sueltos fuera de ahí.

## 2. Color

No hay modo oscuro del sistema (un CV se diseña para papel). Hay tres contextos: **contenido** (claro), **lateral en pantalla** (oscuro) e **impresión** (todo claro, para ahorrar tinta y asegurar legibilidad).

| Token | Contenido / impresión | Lateral (pantalla) | Uso |
|---|---|---|---|
| `--surface` | `#edf1f6` (fondo de página) | – | Fondo detrás de la hoja. En impresión: `#ffffff` |
| `--panel` (`--paper`) | `#ffffff` | `#17324a` → `#112a3e` (`--sidebar`) | Hoja y columna lateral |
| `--panel-raised` | `#f4f9fd` (tarjeta `.entry`) | blanco 8 % sobre lateral ≈ `#243b4d` | Tarjetas de experiencia/proyecto, grupos de competencias |
| `--ink` (`--text`) | `#17212b` | `#f6fbff` | Texto principal |
| `--ink-strong` | `#102538` | `#ffffff` | Nombre, títulos de tarjeta |
| `--ink-body` | `#334252` | `#f6fbff` al 84 % | Párrafos de tarjetas y resumen |
| `--ink-muted` (`--muted`) | `#5f6c7a` | `#f6fbff` al 78 % | Fechas, subtítulos, etiquetas |
| `--border` (`--line`) | `#dbe4ec` | blanco 8 % | Separadores y bordes decorativos (no requieren 3:1) |
| `--border-control` | `#7d8b99` | blanco 40 % | Bordes de controles (selector de idioma) |
| `--accent` | `#1b6aa8` | `#8cc8f5` | Enlaces, eyebrow, botón activo, chips de tecnologías |
| `--accent-soft` | `#e8f2fa` | – | Fondo de chips de tecnologías |
| `--focus` | `#1b6aa8` | `#8cc8f5` | Anillo de `:focus-visible` (2 px, offset 2 px) |

**Contrastes verificados (fórmula WCAG):**

| Par | Ratio | Mínimo |
|---|---|---|
| `--ink` sobre `#fff` | 16,3 | 4,5 ✔ |
| `--ink-body` sobre tarjeta `#f4f9fd` | 9,7 | 4,5 ✔ |
| `--ink-muted` sobre `#fff` / tarjeta | 5,37 / 5,06 | 4,5 ✔ |
| `--accent` sobre `#fff` / `--accent-soft` | 5,72 / 5,04 | 4,5 ✔ |
| Texto blanco sobre botón `--accent` | 5,72 | 4,5 ✔ |
| `--border-control` sobre `#fff` | 3,49 | 3 ✔ |
| Borde de control blanco 40 % sobre lateral | 3,43 | 3 ✔ |
| `#f6fbff` sobre lateral (arriba / abajo) | 12,7 / 14,2 | 4,5 ✔ |
| `#f6fbff` al 78 % (títulos del lateral) | 8,3 | 4,5 ✔ |
| `#f6fbff` al 84 % sobre grupo de competencias | 8,4 | 4,5 ✔ |
| Foco `#8cc8f5` sobre lateral | 7,4 | 3 ✔ |
| Impresión: `--ink-muted` sobre `#f3f6f9` | 4,95 | 4,5 ✔ |

- **Texto sobre botones rellenos:** siempre `#ffffff` sobre `--accent`.
- `#5f6c7a` es el gris más claro permitido para texto sobre fondos claros. No aclararlo.
- No usar transparencias para texto sobre fondos claros (se imprimen grises e irregulares).

## 3. Espaciado

Escala de 4 px: **4 · 8 · 12 · 16 · 24 · 32 · 48**.

| Valor | Dónde |
|---|---|
| 4 | Título de grupo → su texto; separación interna de chips |
| 8 | Cabecera de tarjeta → párrafo; entre párrafos de una tarjeta; huecos entre iconos y texto |
| 12 | Padding de tarjetas y grupos; separación entre tarjetas |
| 16 | Separación entre título de sección y su contenido; gutter en móvil |
| 24 | Entre secciones; padding de la columna lateral |
| 32 | Padding del contenido principal en escritorio |
| 48 | Solo margen exterior de la página en pantallas grandes |

En impresión se usa la misma escala reducida a la mitad cuando haga falta para caber en una página (2 · 4 · 6 · 8 · 12 · 16), nunca valores sueltos.

## 4. Tipografía

IBM Plex Sans (texto) e IBM Plex Serif 600 (solo el nombre), **estáticas y alojadas en `fonts/`** con `@font-face`. Nunca fuentes variables ni Google Fonts: Chrome las incrusta como Type 3 en el PDF. Base pantalla: `html { font-size: 14px }`; impresión: `8.6pt`.

| Rol | Pantalla | Impresión | Peso | Uso |
|---|---|---|---|---|
| `display` | 36 px (2.6rem) | 22–24 pt | Serif 600 | Nombre |
| `h1` | 16–17 px | 11–12 pt | 600 | Puesto bajo el nombre |
| `h2` | 14 px, mayúsculas, tracking 0.1em | 9,5–10 pt | 700 | Títulos de sección |
| `h3` | 14–15 px | 9,5–10 pt | 700 | Empresa / proyecto / centro |
| `body` | 14 px, line-height 1.5 | 8,5–9 pt, line-height 1.35 | 400 | Párrafos |
| `small` | 13 px | 8 pt | 400 | Fechas, tipo de proyecto, enlaces |
| `label` | 12 px | 7,5–8 pt | 600 | Chips de tecnologías |

- **Mínimo 12 px en pantalla y 7,5 pt en impresión.**
- **Máximo 3 pesos:** 400, 600, 700 (quitar 500 de la carga de fuentes).
- Fechas y teléfonos con `font-variant-numeric: tabular-nums`.
- Tracking de mayúsculas ≤ 0.12em.

## 5. Iconos

- Librería única: **lucide**, como **SVG en línea** (sin CDN: el PDF y el ATS no dependen de recursos externos). Trazo 2 (1.75 en impresión), `stroke="currentColor"`.
- Tamaños: 16 px (contacto, enlaces), 20 px (cabeceras si hiciera falta), 24 px (no se usa por ahora).
- Los iconos son **decorativos**: `aria-hidden="true"` y siempre acompañados del texto completo (el email, el teléfono, la URL). Nunca un icono sustituye a un dato.
- **Nada de emoji** en el CV. Los PNG actuales (`img_1..5.png`) se sustituirán por SVG de lucide.

| Concepto | Icono lucide |
|---|---|
| Email | `mail` |
| Teléfono | `phone` |
| Ubicación | `map-pin` |
| GitHub / repositorio de código | `github` |
| LinkedIn | `linkedin` |
| Demo / web publicada | `external-link` |
| Carnet de conducir / vehículo | `car` |
| Disponibilidad horaria | `clock` |
| Idiomas | `languages` |

## 6. Interacción y accesibilidad

- Zonas de clic: **36 px** en escritorio, **44 px** en táctil (`@media (pointer: coarse)`), incluidos los botones ES/EN y los enlaces de contacto.
- Foco visible en todo lo interactivo: `:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }`. Nunca `outline: none` sin alternativa.
- Botones de solo icono con `aria-label`. El selector de idioma usa `aria-pressed`.
- Nada solo en hover: los enlaces se distinguen por color y subrayado, no solo al pasar el ratón.
- Jerarquía semántica: un único `h1` (nombre), `h2` para secciones, `h3` para entradas. El orden del DOM es el orden de lectura del PDF: **nombre, título, perfil, experiencia, proyectos, competencias, formación, idiomas, contacto**.
- Una acción principal por bloque; en el CV no hay acciones destructivas.
- Enlaces externos con `rel="noreferrer"`; en el PDF las URL deben ser legibles como texto, no solo como hipervínculo.

## 7. Responsive e impresión

Probar a **1440 / 820 / 390 px** y en **impresión A4**.

- **1440:** dos columnas (contenido + lateral de ~300 px), hoja centrada con sombra.
- **820:** una columna, el lateral pasa debajo del contenido. Nada de anchos fijos que obliguen a hacer scroll horizontal.
- **390:** gutter de 16 px, cabeceras de tarjeta apiladas (título y fecha en dos líneas), selector de idioma debajo del eyebrow.
- **Impresión (A4):**
  - `@page { size: A4; margin: 0 }` con el margen de 12 mm como `padding` del `body` (así no se imprimen encabezados ni pies del navegador), y todo el CV en **una página**.
  - Rangos de fechas con raya «–», no guion: `pdftotext` borra el guion de final de línea.
  - Tracking de mayúsculas ≤ 0.06em en impresión, para que el ATS no separe las letras.
  - **Se mantienen las dos columnas** (no aplicar las media queries de móvil al imprimir).
  - Lateral con **fondo claro** en impresión (texto `--ink` sobre blanco o `#f3f6f9`), sin sombras ni degradados.
  - `break-inside: avoid` en tarjetas y grupos.
  - Ocultar el selector de idioma y cualquier control.
  - Ningún texto dentro de imágenes; la foto es la única imagen de contenido.

## 8. Checklist

- [ ] Colores solo desde tokens de `:root`; contrastes ≥ 4,5:1 (texto) y ≥ 3:1 (controles) verificados con la fórmula.
- [ ] Espaciados de la escala de 4 px; tipografía ≥ 12 px (pantalla) y ≥ 7,5 pt (impresión), máximo 3 pesos.
- [ ] Iconos de lucide en línea, decorativos y siempre con texto; sin emoji ni PNG de iconos.
- [ ] `:focus-visible` en todo lo interactivo; zonas de clic de 36/44 px.
- [ ] Sin scroll horizontal a 390 px; dos columnas a 1440 px.
- [ ] PDF de Chrome headless: **1 página**, `pdftotext` extrae todo el texto en el orden lógico.
- [ ] Textos en español, UTF-8 correcto, apellido «Ibáñez», sin datos inventados (lo pendiente queda como `TODO:`).
