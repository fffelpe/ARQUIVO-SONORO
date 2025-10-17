// script: scripts/fix_catalogo.js
// Usage: node scripts/fix_catalogo.js
// Reads json/catalogo.json (raw text), attempts to extract objects with "titulo", "url", "tipo" and
// rebuilds a valid JSON array in json/catalogo.fixed.json

const fs = require('fs');
const path = require('path');

const inPath = path.join(__dirname, '..', 'json', 'catalogo.json');
const outPath = path.join(__dirname, '..', 'json', 'catalogo.fixed.json');

const raw = fs.readFileSync(inPath, 'utf8');

// Regex to find blocks containing titulo, url and tipo
const itemRegex = /{[^}]*?"titulo"\s*:.*?"(.*?)"[^}]*?"url"\s*:.*?"(.*?)"[^}]*?"tipo"\s*:.*?"(.*?)"[^}]*?}/gs;

const items = [];
let m;
while ((m = itemRegex.exec(raw)) !== null) {
  items.push({
    titulo: m[1],
    url: m[2],
    tipo: m[3]
  });
}

// fallback: try line-pair parsing
if (items.length === 0) {
  const lines = raw.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].match(/"titulo"\s*:.*?"(.*)"/);
    const u = lines[i+1] && lines[i+1].match(/"url"\s*:.*?"(.*)"/);
    const tp = lines[i+2] && lines[i+2].match(/"tipo"\s*:.*?"(.*)"/);
    if (t && u && tp) {
      items.push({ titulo: t[1], url: u[1], tipo: tp[1] });
      i += 2;
    }
  }
}

fs.writeFileSync(outPath, JSON.stringify(items, null, 2), 'utf8');
console.log(`Reconstruídos ${items.length} itens em ${outPath}`);