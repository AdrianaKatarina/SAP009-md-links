#! /usr/bin/env node

import { mdLinks } from './md-links.js';
import chalk from 'chalk';
import { argv } from 'node:process'

const caminhoDoArquivo = argv[2];

mdLinks(caminhoDoArquivo)
.then((informacoes) =>{
    informacoes.map((item) => {
      console.log(`${chalk.magenta(item.file)} ${chalk.cyanBright(item.href)} ${chalk.yellowBright(item.text)}`);
    })
    
}).catch((err)=>{
    console.log(err);
})

