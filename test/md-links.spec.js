import { 
extractInformation,
mdLinks,
validate, 
calculateStats, 
isDirectory,
isFile
} from '../src/md-links';

import { readFile, lstatSync } from 'node:fs';
import { extname } from 'node:path';

jest.mock('node:fs')
jest.mock('node:path')

afterEach(() => {
  lstatSync.mockClear()
  //jest.clearAllMocks()
})
//Erro no isDirectory e isFile ❌
describe('Verificação do Caminho', () => {
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

//Passou ✔️
describe('função extractInformation', () => {
  it('Deve retornar link, text e file', () => {
    const text = 'Markdown';
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const string = `[${text}](${href})`;
    const file = 'text.md'

    const info = extractInformation(string, file);
    
    expect(info).toEqual({href, text, file});
  });
  //Passou ✔️
  /* it('Deve retornar um erro quando não receber uma string como parâmetro', () => {
    expect(() => extractInformation(1)).toThrow()
  }); */
})

describe('função md-links', () => {
  //Passou ✔️
  it('deve retornar um erro quando não tiver parâmetro', () => {
    expect(() => mdLinks()).toThrow();
  });
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
  const path = 'text.md';
 /*  it('deve chamar a readfile com os parâmetros corretos', () => {
    const encode = 'utf-8';
    const options = {
      validate: false,
      stats: false
    }
    mdLinks(path, options);

    expect(readFile).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledWith(path, encode, expect.any(Function));
  }) */
  //Erro ❌
  /* it('deve retornar um erro quando arquivo não tiver link', () => {

  }); */

  //Erro ❌
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

  //Passou ✔️
  it('deve retornar os valores totais, únicos e quebrados dos links' , () =>{
      const resultado = {
        total: 3,
        unique: 2,
        broken: 1
      }
      
      const calculo = calculateStats(info)

      expect(calculo).toEqual(resultado)
  })
})


/* test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});*/