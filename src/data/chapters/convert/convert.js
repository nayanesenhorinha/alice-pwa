import fs from 'fs';

// 1. Lê o arquivo de texto puro
const rawText = fs.readFileSync('capitulo.txt', 'utf-8');

// 2. Separa os parágrafos pelas quebras de linha e remove linhas vazias
const paragraphs = rawText
  .split(/\r?\n\r?\n/)
  .map(p => p.trim())
  .filter(p => p.length > 0);

// 3. Monta o objeto final do capítulo
const chapterData = {
  id: 2,
  title: "2",
  section: 7,
  paragraphs: paragraphs
};

// 4. Formata os parágrafos com aspas duplas limpas
const formattedParagraphs = paragraphs
  .map(p => `    ${JSON.stringify(p)}`)
  .join(',\n');

// 5. Gera a string final mantendo a sintaxe exata do seu padrão
const fileContent = `export const chapter${chapterData.id} = {
  id: ${chapterData.id},
  title: "${chapterData.title}",
  section: ${chapterData.section},
  paragraphs: [
${formattedParagraphs}
  ]
};
`;

// 6. Salva o arquivo usando crases corretas (``)
fs.writeFileSync(`chapter${chapterData.id}.js`, fileContent);

console.log(`Sucesso! Capítulo ${chapterData.id} processado com${paragraphs.length} parágrafos.`);