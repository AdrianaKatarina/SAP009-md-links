import { readFile } from 'node:fs';

const extrairInformacoes = (string, arquivo) => {
  const informacoes = string.split('](');
  const texto = informacoes[0].replace('[', '');
  const link = informacoes[1].replace(')', '');
  return {
    href: link,
    text: texto,
    file: arquivo,
  };
};

export const mdLinks = (caminhoDoArquivo) => {
  const encode = 'utf-8';
  const regex = /\[[^\]]+\]\(([^)]+)\)/gm;
  readFile(caminhoDoArquivo,encode, (err, data) => {
    if (err) throw err;
      const conteudo = data.match(regex);
      const informacoes = conteudo.map((item) => extrairInformacoes(item, caminhoDoArquivo));
      console.log(informacoes);
    }); 
};
mdLinks('src/texto.md');