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

import { readFile, lstatSync, promises } from 'node:fs';
import { extname } from 'node:path';

/* jest.mock('node:fs', () => ({
  promises: {
    readFile: jest.fn().mockResolvedValue()
  }
})) */
jest.mock('node:fs')
jest.mock('node:path')

afterEach(() => {
  lstatSync.mockClear()
  //jest.clearAllMocks()
})

describe('Verificação do Caminho', () => {
//1. isDirectory ✔️
  it('deve verificar se o caminho passado foi um diretório', () => {
    const mockDirectory = {isDirectory: () => true}
    lstatSync.mockReturnValueOnce(mockDirectory)
    const path = 'file';
    const directory = isDirectory(path)
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
/* const path = 'text.md';
 it('deve chamar a readfile com os parâmetros corretos', () => {
    const path = 'text.md'
    const encode = 'utf-8';
    const options = {
      validate: false,
      stats: false
    }
    readingFile(path, options);

    expect(promises.readFile).toHaveBeenCalledTimes(1);
    expect(promises.readFile).toHaveBeenCalledWith(path, encode);
  }) */
const infoPadrao = [
    {
      href: 'https://pt.wikipedia.org/wiki/Markdown', 
      text: 'Markdown',
      file: 'text.md'
    },
    {
      href: 'https://pt.wikipedia.org/wiki/Markdown', 
      text: 'Markdown',
      file: 'text.md'
    },
    {
      href: 'https://curriculum.laboratoria.la/pt/topics/javascript/05-objects/01-objec', 
      text: 'Objetos em JavaScript',
      file: 'text.md'
    }
];
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
/* describe('Função checkOptions', () => {
  it('Deve retornar total, unique, broken quando validate e stats forem iguais à true', () => {
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

  it('Deve retornar total, unique, broken quando validate forem iguais à true', () => {
    const options = {
      validate: true,
      stats: false
    }
    const result = {
      total: 3,
      unique: 2
    }
    //retorna uma promise. então tem que resolvê-la
    const check = checkOptions(info, options)
    expect(check).toEqual(result)
  })

  it('Deve retornar total, unique, broken quando stats forem iguais à true', () => {
    const options = {
      validate: false,
      stats: true
    }
    const result = info;
    //retorna uma promise. então tem que resolvê-la
    const check = checkOptions(infoPadrao, options)
    expect(check).toEqual(result)
  })

  it('Deve retornar href, text, file quando validate e stats forem iguais à false', () => {
    const options = {
      validate: false,
      stats: true
    }
    const result = infoPadrao;
    //retorna uma promise. então tem que resolvê-la
    const check = checkOptions(infoPadrao, options)
    expect(check).toEqual(result)
  })
}) */

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
