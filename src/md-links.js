import { readFile, lstatSync, readdirSync, promises } from 'node:fs';
import { extname } from 'node:path';

/* Tenho que checar se o caminho é do diretorio ou arquivo.
O retorno de fs.lstatSync() são uma instancia de fs.stats.isFile()
fs.stats.isDirectory()) */
//Vai me retornar um booleano.
export const isDirectory = (path) => lstatSync(path).isDirectory();
export const isFile = (path) => lstatSync(path).isFile();

/* export const lerArquivo = (path,encode) => readFile(path, encode, (err, data)) */
//promises.readFile

export const extractInformation = (string, pathFile) => {
  /* if(!string && !pathFile) throw new Error('Dados inválidos') */
  /* console.log(string) */
  const separate = string.split('](');
  const text = separate[0].replace('[', '');
  const href = separate[1].replace(')', '');
  return {
    href,
    text,
    file: pathFile,
  };
};

export const validate = (data) => {
  return Promise.all(data.map((item) =>
    fetch(item.href)
      .then((res) => {
        item.status = res.status;
        if(res.status !== 200){
          item.message = 'FAIL'
        } else {
          item.message = res.statusText;
        }
        return item;
      })
      .catch((err) => {
        item.status = err;
        item.message = 'Esse link não existe';
        return item;
      })
  ))
}

export const calculateStats = (data) => {
  /* console.log(data) */
  const links = data.map((item) => item.href);
  const total = links.length;
  //O new Set() serve para tirar valores repetidos de uma array;
  const unique = new Set(links).size;
  const broken = data.filter((item) => item.status !== 200).length;
  /* console.log('show', broken) */
  return {
    total,
    unique,
    broken
  }
}

export const mdLinks = (path, options) => {
  if(!path) throw new Error('Parâmetro inválido');
  /* console.log(isDirectory(path));
  console.log(isFile(path)); */
  //Se igual a file
  if(isFile(path)){
    //termina com a extensão .md
    if(extname(path) !== '.md') throw new Error('Extensão inválida');
    return new Promise((resolve, reject) => {
      const encode = 'utf-8';
      const regex = /\[[^\]]+\]\(([^)]+)\)/gm;
      readFile(path,encode, (err, data) => {
        if (err) throw reject(err);
        const arrLinks = data.match(regex);
        //quando não tem link retorna null
        //quando tem link retorna o arrLinks
        /* console.log('cont', arrLinks); */
        if(arrLinks === null) throw new Error('Arquivo sem link');
        const informacoes = arrLinks.map((item) => extractInformation(item, path));
        if(options.validate && options.stats){
          validate(informacoes)
            .then((response) => {
              resolve(calculateStats(response))
            })
        }else if(options.validate){
          validate(informacoes)
            .then(resolve)
        }else if(options.stats){
          validate(informacoes)
            .then((response) => {
              resolve(calculateStats(response))
            })
        }
        else{
          resolve(informacoes);
        }
      })
    });
  }else if(isDirectory(path)){
    
    //Ler os arquivos dentro da pasta. fs.readdirSync(path[, options]) -> Retorna uma matriz de nomes de arquivos excluindo '.'e '..'.
    
    //Saber se tem +pastas
    let pathFile;
    const createPathFile = (path) => {
      const files = readdirSync(path)
      files.forEach((item) => {
      //juntar
        const formation = `${path}/${item}`
        if(item === isDirectory){
          return createPathFile(formation)
        }else if(item === isFile) {
          if(extname(item) !== '.md') throw new Error('Extensão inválida');
          return pathFile = formation
        }
      })
    }
    createPathFile(path);
    console.log('nome do diretorio:', pathFile)
    /* const fileMd = files.filter((item) => ) */
    /* console.log('arquivo md:', fileMd); */
    //Agora é formar um caminho do arquivo
    /* const directoryName = path; */
    /* console.log('nome do diretorio:', directoryName) */

    /* const filePathMd = `${directoryName}/${fileMd}`; */
    return new Promise((resolve, reject) => {
      const encode = 'utf-8';
      const regex = /\[[^\]]+\]\(([^)]+)\)/gm;
      readFile(pathFile,encode, (err, data) => {
        if (err) throw reject(err);
          const conteudo = data.match(regex);
          const informacoes = conteudo.map((item) => extractInformation(item, filePathMd));  
          if(options.validate){
            validate(informacoes)
              .then(resolve)
          }else{
            resolve(informacoes);
          }
      })
    });
  }
};

//Caso options
/* if (options.validate && options.stats){
  Chamar o validate e passar como parametro na função stats.
  Porque tem que retornar o stats com total,unique,broken
}
if (options.validate){
  Chamar o validate e retornar com as info+ status e message; 
}
if (options.stats){
  Chamar o validate e passar como parametro na função stats.
  Porque tem que retornar o stats com total e unique 
} else{
  se nenhuma dessa não tiver flags
  retornar extractInformation
}
*/

/* const filenames = readdirSync('./files');
  
console.log("\nCurrent directory filenames:");
filenames.forEach(file => {
  console.log(`=> ${file}`);
});

console.log("\Filenames with the .md extension:");
filenames.forEach(file => {
  if (extname(file) === ".md")
    console.log(file);
})
 */

 //MÉTODO fs.lstatSync(path) -> Retorna uma instância de fs.Stats.
//Classe: fs.Stats -> stats.isFile() ou stats.isDirectory()