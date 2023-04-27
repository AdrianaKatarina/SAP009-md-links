import { mdLinks } from './index.js';
import chalk from 'chalk';

mdLinks('files/texto.md')
.then((informacoes) =>{
    console.log(chalk.blue(informacoes[0].href));
}).catch((err)=>{
    console.log(err);
})