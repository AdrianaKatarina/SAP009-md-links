import {
isDirectory,
isFile,
readingFile,
checkOptions,
extractInformation,
mdLinks,
validate, 
calculateStats
} from '../src/md-links';

import { readFile, lstatSync } from 'node:fs';
import { extname } from 'node:path';

jest.mock('node:fs')
jest.mock('node:path')

afterEach(() => {
  lstatSync.mockClear()
  //jest.clearAllMocks()
})

//Passou ✔️
describe('Verificação do Caminho', () => {
//1. isDirectory ✔️
  it('deve verificar se o caminho passado foi um diretório', () => {
    const mockDirectory = {isDirectory: () => true}
    lstatSync.mockReturnValueOnce(mockDirectory)
    const path = 'file';
    const directory = isDirectory(path)
    //https://jestjs.io/pt-BR/docs/mock-function-api#mockfnmockreturnvaluevalue
    expect(lstatSync).toHaveBeenCalledTimes(1);
    expect(lstatSync).toHaveBeenCalledWith(path);
    expect(directory).toEqual(true) 
  });
//2. isFile ✔️
  it('deve verificar se o caminho passado foi um arquivo', () => {
    const mockFile = {isFile: () => true}
    lstatSync.mockReturnValueOnce(mockFile)
    const path = 'text.md';
    const file = isFile(path)

    expect(lstatSync).toHaveBeenCalledTimes(1);
    expect(lstatSync).toHaveBeenCalledWith(path);
    expect(file).toEqual(true);
  });
});

//3. readFile() ❌
const path = 'text.md';
 it('deve chamar a readfile com os parâmetros corretos', () => {
    readFile.mockResolvedValue()
    const path = 'text.md'
    const encode = 'utf-8';
    const options = {
      validate: false,
      stats: false
    }
    readingFile(path, options);

    expect(readFile).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledWith(path, encode);
  })
const info = [
    {
      href: 'https://pt.wikipedia.org/wiki/Markdown', 
      text: 'Markdown',
      file: 'text.md',
      status: 200,
      message: 'OK'
    },
    {
      href: 'https://pt.wikipedia.org/wiki/Markdown', 
      text: 'Markdown',
      file: 'text.md',
      status: 200,
      message: 'OK'
    },
    {
      href: 'https://curriculum.laboratoria.la/pt/topics/javascript/05-objects/01-objec', 
      text: 'Objetos em JavaScript',
      file: 'text.md',
      status: 404,
      message: 'FAIL'
    }
];
//4. checkOptions ❌
describe('Função checkOptions', () => {
  it.only('Deve retornar total, unique, broken', () => {
    const options = {
      validate: true,
      stats: true
    }
    const result = {
      total: 3,
      unique: 2,
      broken: 1
    }
    //retorna uma promise. então tem que resolvê-la
    const check = checkOptions(info, options)

    expect(check).toEqual(result)
  })
})

describe('função extractInformation', () => {
//5. extractInformation -> retornar link, text e file ✔️
  it('Deve retornar link, text e file', () => {
    const text = 'Markdown';
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const string = `[${text}](${href})`;
    const file = 'text.md'

    const info = extractInformation(string, file);
    
    expect(info).toEqual({href, text, file});
  });
  
  //6. extractInformation -> retornar um erro quando não receber uma string como parâmetro. ✔️
  
  /* it('Deve retornar um erro quando não receber uma string como parâmetro', () => {
    expect(() => extractInformation(1)).toThrow()
  }); */
})

//7. função validate ❌ 
  /* it('deve retornar ser adicionadas message e status', () => {
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const text = 'Markdown';
    const file = 'text.md';
    const status = 200;
    const message = 'OK';
    fetch(href).then(data => {

    })
  })
*/

//8. Função calculeStats -> retornar total,unique,broken ✔️
it('deve retornar os valores totais, únicos e quebrados dos links' , () =>{
  
  const resultado = {
    total: 3,
    unique: 2,
    broken: 1
  }
  
  const calculo = calculateStats(info)

  expect(calculo).toEqual(resultado)
})

describe('função md-links', () => {
  //9. Função Md-links: erro quando não tiver parâmetro ✔️
  it('deve retornar um erro quando não tiver parâmetro', () => {
    expect(() => mdLinks()).toThrow();
  });

  //10. Função Md-links: erro quando a extensão não for .md ❌

});

//----------------------------------------------------------------------------
  //Erro ❌
  /* it('deve retornar um erro quando o arquivo não tiver extensão .md', () => {
    const path = 'text.html';
    const options = {
      validate: false,
      stats: false
    };
    const md = mdLinks(path, options);
    
    expect(extname).toHaveBeenCalledTimes(1);
    expect(extname).toHaveBeenCalledWith(path);
    expect(md).toThrow();
  }) */

  //Erro ❌
  /* it('deve retornar um erro quando arquivo não tiver link', () => {

  });

  
  

  
})


/* test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});*/