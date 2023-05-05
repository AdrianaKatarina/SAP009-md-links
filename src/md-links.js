import { readFile } from 'node:fs';
import { readdirSync } from 'node:fs';
import { extname } from 'node:path';
/* import { validateFuncions } from './validate.js' */

export const extrairInformacoes = (string, arquivo) => {
  if(!string && !arquivo) throw new Error('dados inválidos')
  const informacoes = string.split('](');
  const texto = informacoes[0].replace('[', '');
  const link = informacoes[1].replace(')', '');
  return {
    href: link,
    text: texto,
    file: arquivo,
  };
};

export const mdLinks = (caminhoDoArquivo, options) => {
  if(!caminhoDoArquivo) throw new Error('Parâmetro inválido')
  return new Promise((resolve, reject) => {
    const encode = 'utf-8';
    const regex = /\[[^\]]+\]\(([^)]+)\)/gm;
    readFile(caminhoDoArquivo,encode, (err, data) => {
      if (err) throw reject(err);
      const conteudo = data.match(regex);
      const informacoes = conteudo.map((item) => extrairInformacoes(item, caminhoDoArquivo));
      /* informacoes.map((item) => console.log('item', item.href)) */
      /* console.log('info md-links', informacoes) */
      /* if(options.validate){
        const validate = informacoes.map((item) => {
          const t = validateFuncions(item)
            .then((result) => { 
             return result 
            })
            console.log('t', t)
        });
        
        /* const validate = validateFuncions(informacoes); */
        /* validate.map((item) => console.log('item', item)) */
        /* return validate */
        /* console.log('retorno md-links ', validate)
        resolve(validate);
      }else { */
      resolve(informacoes)
      /* } */
       
    });
  });
};

/* const filenames = readdirSync('./files');
  
console.log("\nCurrent directory filenames:");
filenames.forEach(file => {
  console.log(`=> ${file}`);
});

console.log("\Filenames with the .md extension:");
filenames.forEach(file => {
  if (extname(file) === ".md")
    console.log(file);
}) */

