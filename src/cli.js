#! /usr/bin/env node

import { mdLinks } from './md-links.js';
import chalk from 'chalk';
import { argv } from 'node:process'

const caminhoDoArquivo = argv[2];
const options = {
  validate: argv.includes('--validate'),
  stats: argv.includes('--stats')
};

if (options.validate && options.stats){
  mdLinks(caminhoDoArquivo, options)
    .then((result) => {
      /* console.log(result) */
      const links = result.map((item) => item.href);
      const broken = result.filter((item) => item.status !== 200);
        console.log(`Total: ${result.length} \nUnique: ${links.length} \nBroken: ${broken.length}`);
      })
    .catch((err) => {
      console.log(err);
    });
}else if(options.validate){
  mdLinks(caminhoDoArquivo, options)
    .then((result) =>{
        result.map((item) => {
          if(item.status !== 200){
            console.log(`${chalk.blue(item.file)} ${chalk.cyanBright(item.href)} ${chalk.red(item.message)} ${chalk.redBright(item.status)} ${chalk.yellowBright(item.text)}`)
          }else{
            console.log(`${chalk.blue(item.file)} ${chalk.cyanBright(item.href)} ${chalk.green(item.message)} ${chalk.greenBright(item.status)} ${chalk.yellowBright(item.text)}`)
          }          
        });
    }).catch((err)=>{
        console.log(err);
    })
}else if (options.stats){
  mdLinks(caminhoDoArquivo, options)
    .then((informacoes) => {
      const links = informacoes.map((item) => item.link);
      console.log(`Total: ${informacoes.length} \nUnique: ${links.length}`);
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
