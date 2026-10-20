#!/usr/bin/env node
// Genera el HTML estático del CV a partir de data/cv.json (sin dependencias).
//   node build.js        -> escribe index.html (web) y videojuegos/index.html (videojuegos)
// Idiomas: cada idioma de `languages` distinto de `defaultLanguage` se genera en /<idioma>/.
// Al final lista los TODO pendientes (no se publican en el CV).
const fs = require('fs');
const path = require('path');

const root = __dirname;
const data = JSON.parse(fs.readFileSync(path.join(root, 'data', 'cv.json'), 'utf8'));

const ICONS = {
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
};

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const icon = (name) => `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">${ICONS[name]}</svg>`;
const shortUrl = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
// URL visibles: nunca se parten por un guion (pdftotext borra el guion de final de línea y la URL
// llega rota al ATS). `breakable` permite partir solo después de una barra.
const urlHtml = (text, breakable = false) => breakable
  ? text.split(/(?<=\/)/).map((seg) => `<span class="nobr">${esc(seg)}</span>`).join('<wbr>')
  : `<span class="nobr">${esc(text)}</span>`;
const indent = (html, n) => html.split('\n').map((l) => (l ? ' '.repeat(n) + l : l)).join('\n');

function linksLine(links, t) {
  const parts = [];
  if (links.demo) parts.push(`<span class="link-label">${esc(t.labels.demo)}</span> <a href="${esc(links.demo)}">${urlHtml(shortUrl(links.demo))}</a>`);
  if (links.code && links.code.length) {
    const code = links.code.map((u) => `<a href="${esc(u)}">${urlHtml(shortUrl(u))}</a>`).join(', ');
    parts.push(`<span class="link-label">${esc(t.labels.code)}</span> ${code}`);
  }
  return parts.length ? `<p class="links-line">${parts.join(' <span class="sep" aria-hidden="true">·</span> ')}</p>` : '';
}

function entry({ name, meta, bullets, tech, links }, t) {
  return [
    '<article class="entry">',
    '    <div class="entry-head">',
    `        <h3>${esc(name)}</h3>`,
    `        <span class="entry-meta">${esc(meta)}</span>`,
    '    </div>',
    '    <ul class="bullets">',
    ...bullets.map((b) => `        <li>${esc(b)}</li>`),
    '    </ul>',
    tech ? `    <p class="tech-line"><span class="tech-label">${esc(t.labels.technologies)}</span> ${esc(tech.join(', '))}</p>` : '',
    links ? `    ${linksLine(links, t)}` : '',
    '</article>',
  ].filter((l) => l.trim()).join('\n');
}

function compactEntry({ name, meta, text }) {
  return `<p class="entry-compact"><strong>${esc(name)}</strong> <span class="entry-meta">| ${esc(meta)}</span> — ${esc(text)}</p>`;
}

function section(title, body) {
  return `<section class="section">\n    <h2 class="section-title">${esc(title)}</h2>\n\n${indent(body, 4)}\n</section>`;
}

function renderPage(versionId, lang) {
  const version = data.versions[versionId];
  const t = data.i18n[lang];
  const vt = t.versions[versionId];
  const p = data.person;
  const langDir = lang === data.defaultLanguage ? '' : `${lang}/`;
  const outRel = path.posix.join(langDir, version.outDir === '.' ? '' : version.outDir, 'index.html');
  const depth = outRel.split('/').length - 1;
  const base = depth ? '../'.repeat(depth) : '';

  // Enlaces a las otras versiones del mismo idioma (solo pantalla).
  const nav = Object.entries(data.versions).map(([id, v]) => {
    const target = path.posix.join(langDir, v.outDir === '.' ? '' : v.outDir + '/');
    const href = base + target || './';
    const current = id === versionId ? ' aria-current="page"' : '';
    return `<a class="version-link" href="${esc(href || './')}"${current}>${esc(t.versions[id].navLabel)}</a>`;
  }).join('\n');

  const sections = {
    experience: () => section(t.labels.experience, version.experience.map((id) => {
      const e = t.experience[id];
      return e.compact ? compactEntry(e) : entry(e, t);
    }).join('\n\n')),
    projects: () => section(t.labels.projects, version.projects.map((id) =>
      entry({ ...t.projects[id], ...data.projects[id] }, t)).join('\n\n')),
    jams: () => section(t.labels.jams, version.jams.map((id) =>
      entry({ ...t.projects[id], ...data.projects[id] }, t)).join('\n\n')),
  };

  const skills = version.skills.map((id) => [
    '<div class="skill-group">',
    `    <h3>${esc(t.skills[id].title)}</h3>`,
    `    <p>${esc(t.skills[id].items)}</p>`,
    '</div>',
  ].join('\n')).join('\n');

  const education = t.education.map((e) => [
    '<div class="study">',
    `    <h3>${esc(e.title)}</h3>`,
    `    <p>${esc(e.center)} | <span class="dates">${esc(e.dates)}</span></p>`,
    '</div>',
  ].join('\n')).join('\n');

  const additional = t.additional.map((text, i) =>
    `<li class="contact-item">${icon(i === 0 ? 'car' : 'clock')}<span>${esc(text)}</span></li>`).join('\n');

  const contact = [
    `<li class="contact-item">${icon('mail')}<a href="mailto:${esc(p.email)}">${esc(p.email)}</a></li>`,
    `<li class="contact-item">${icon('phone')}<a href="${esc(p.phone.href)}">${esc(p.phone.text)}</a></li>`,
    `<li class="contact-item">${icon('mapPin')}<span>${esc(t.labels.location)}</span></li>`,
    `<li class="contact-item">${icon('github')}<a href="${esc(p.github.href)}">${urlHtml(p.github.text, true)}</a></li>`,
    `<li class="contact-item">${icon('linkedin')}<a href="${esc(p.linkedin.href)}">${urlHtml(p.linkedin.text, true)}</a></li>`,
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="${esc(lang)}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${esc(vt.description)}">
    <title>${esc(vt.pageTitle)}</title>
    <link rel="preload" href="${base}fonts/ibm-plex-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="${base}styles.css">
</head>
<body>
<!-- Generado por build.js a partir de data/cv.json: no editar a mano.
     El orden del DOM es el orden de lectura del PDF (ATS). -->
<main class="resume">
    <div class="content">
        <header class="hero">
            <div class="hero-top">
                <p class="eyebrow">${esc(t.labels.eyebrow)}</p>
                <nav class="version-switcher" aria-label="${esc(t.labels.versionNav)}">
${indent(nav, 20)}
                </nav>
            </div>

            <h1>${esc(p.name)}</h1>
            <p class="role">${esc(vt.title)}</p>
            <p class="summary">${esc(vt.profile)}</p>
            <p class="spoken-languages"><strong>${esc(t.labels.languagesLabel)}:</strong> ${esc(t.spokenLanguages.join(' · '))}</p>
        </header>

${indent(version.sections.map((s) => sections[s]()).join('\n\n'), 8)}
    </div>

    <aside class="sidebar">
        <img src="${base}${esc(p.photo)}" alt="${esc(t.labels.photoAlt)}" class="profile-picture">

        <section class="panel">
            <h2 class="panel-title">${esc(t.labels.skills)}</h2>
${indent(skills, 12)}
        </section>

        <section class="panel">
            <h2 class="panel-title">${esc(t.labels.education)}</h2>
${indent(education, 12)}
        </section>

        <section class="panel">
            <h2 class="panel-title">${esc(t.labels.additional)}</h2>
            <ul class="info-list">
${indent(additional, 16)}
            </ul>
        </section>

        <section class="panel">
            <h2 class="panel-title">${esc(t.labels.contact)}</h2>
            <ul class="info-list contact-list">
${indent(contact, 16)}
            </ul>
        </section>
    </aside>
</main>
</body>
</html>
`;

  const outPath = path.join(root, outRel);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  return outRel;
}

function collectTodos(node, trail, out) {
  if (Array.isArray(node)) return node.forEach((v, i) => collectTodos(v, trail.concat(i), out));
  if (!node || typeof node !== 'object') return;
  for (const [k, v] of Object.entries(node)) {
    if (k === 'todo') v.forEach((q) => out.push(q));
    else collectTodos(v, trail.concat(k), out);
  }
}

for (const lang of data.languages) {
  if (!data.i18n[lang]) { console.error(`Falta i18n.${lang} en data/cv.json`); process.exit(1); }
  for (const versionId of Object.keys(data.versions)) console.log(`✔ ${renderPage(versionId, lang)}`);
}

const todos = [];
collectTodos(data, [], todos);
if (todos.length) {
  console.log(`\nTODO pendientes (${todos.length}), no se publican:`);
  todos.forEach((q, i) => console.log(`  ${String(i + 1).padStart(2)}. ${q}`));
}
