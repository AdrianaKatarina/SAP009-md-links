import { readFile } from 'node:fs';
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
        }); */
        
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

//path.extname(path)
//O path.extname()método retorna a extensão do path, desde a última ocorrência do .caractere (ponto) até o final da string na última parte do path.

/* mdLinks("./some/example.md", { validate: true }) */

//CLI md-links <path-to-file> [options] -> --validate

// verificar se o link funciona ou não utilizando o protocolo http
/* $ md-links ./some/example.md --validate
./some/example.md http://algo.com/2/3/ ok 200 Link de algo
./some/example.md https://outra-coisa-.net/algum-doc.html fail 404 algum doc
./some/example.md http://google.com/ ok 301 Google */

