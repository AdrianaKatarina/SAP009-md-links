#! /usr/bin/env node

import { mdLinks } from './md-links.js';
import chalk from 'chalk';
import { argv } from 'node:process'

const caminhoDoArquivo = argv[2];
const options = {
  validate: argv.includes('--validate'),
  stats: argv.includes('--stats')
};
/* console.log(options) */

/* mdLinks(caminhoDoArquivo, options)
.then((validate) =>{
    console.log('validate cli', validate)
    validate.map((item) => {
      console.log(`${chalk.blue(item.file)} ${chalk.cyanBright(item.href)} ${chalk.yellow(item.status)} ${chalk.greenBright(item.status)} ${chalk.yellowBright(item.text)}`)
    })  
}).catch((err)=>{
    console.log(err);
}) */

if (options.validate && options.stats){
  mdLinks(caminhoDoArquivo, options)
    .then((informacoes) => {
      const links = informacoes.map((item) => item.href);
      const broken = [];
      Promise.all(informacoes.map((item) =>
        fetch(item.href)
        .then((res) => {
          if(res.status !== 200){
            broken.push(item.href)
          }
        })
        .catch((err) => {
          broken.push(item.href)
        })
      ))
        .then(() => {
          console.log(`Total: ${informacoes.length}`);
          console.log(`Unique: ${links.length}`);
          console.log(`Broken: ${broken.length}`);
        })
    }) 
    .catch((err) => {
      console.log(err);
    });
}else if(options.validate){
  mdLinks(caminhoDoArquivo, options)
    .then((informacoes) =>{
        informacoes.map((item) => {
          fetch(item.href)
            .then((res) => {
              const status = res.status;
              if(status === 200){
                console.log(`${chalk.blue(item.file)} ${chalk.cyanBright(item.href)} ${chalk.yellow('ok')} ${chalk.greenBright(status)} ${chalk.yellowBright(item.text)}`)
              }else{
                console.log(`${chalk.blue(item.file)} ${chalk.cyanBright(item.href)} ${chalk.red('fail')} ${chalk.red(status)} ${chalk.yellowBright(item.text)}`)
              }
            })
            .catch((err) => {
              console.log(`${chalk.blue(item.file)} ${chalk.cyanBright(item.href)} ${chalk.gray('link não existe')} ${chalk.yellowBright(item.text)}`)
            })
        });
    }).catch((err)=>{
        console.log(err);
    })
}else if (options.stats){
  mdLinks(caminhoDoArquivo, options)
    .then((informacoes) => {
      const links = informacoes.map((item) => item.link);
      console.log(`Total: ${informacoes.length}`);
      console.log(`Unique: ${links.length}`);
    }).catch((err) => {
      console.log(err);
    });
}else{
  mdLinks(caminhoDoArquivo, options)
    .then((informacoes) => {
      informacoes.map((item) => {
        console.log(`${chalk.blue(item.file)} ${chalk.cyanBright(item.href)} ${chalk.yellowBright(item.text)}`)
      });
    }).catch((err) => {
      console.log(err);
    });
}


    


//Se existir validate -> 

/* $ md-links ./some/example.md --validate

-> Se status code for igual a 200
./some/example.md http://algo.com/2/3/ ok 200 Link de algo
-> Se status code for igual a 400
./some/example.md https://outra-coisa-.net/algum-doc.html fail 404 algum doc
-> Se status code for igual a 301
./some/example.md http://google.com/ ok 301 Google */

//Se existir stats

/* $ md-links ./some/example.md --stats
Total: 3
Unique: 3 */

//Se tiver validate e stats

/* $ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1 */

//Se não tiver validate e stats
  // => [{ href, text, file }, ...]