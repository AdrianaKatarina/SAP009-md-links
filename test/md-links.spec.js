import { extrairInformacoes, mdLinks, validate, calculoStats} from '../src/md-links';
import { readFile } from 'node:fs';

jest.mock('node:fs')

describe('função extrairInformacoes', () => {
  it('Deve retornar a formatação link, texto e arquivo ', () => {
    const text = 'Markdown';
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const string = `[${text}](${href})`;
    const file = 'text.md'

    const info = extrairInformacoes(string, file);
    
    expect(info).toEqual({href, text, file});
  });
  it('Deve retornar um erro quando não receber uma string como parâmetro ', () => {
    expect(() => extrairInformacoes(1)).toThrow()
  });
})

describe('função md-links', () => {
  const caminhoDoArquivo = 'text.md';
  it('deve chamar a readfile com os parâmetros corretos', () => {
    const encode = 'utf-8';
    const options = {
      validate: false,
      stats: false
    }
    mdLinks(caminhoDoArquivo, options);

    expect(readFile).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledWith(caminhoDoArquivo, encode, expect.any(Function));
  })
  it('deve retornar um erro quando não tiver parâmetro', () => {
    expect(() => mdLinks()).toThrow()
  });
  it('quando validate for igual a true, deve retornar ser adicionadas message e status', () => {
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const text = 'Markdown';
    const file = 'text.md';
    const status = 200;
    const message = 'OK';
    fetch(href).then(data => {

    })
    const options = {
      validate: true,
      stats: false
    }
    const md = mdLinks(file, options);
    
    
  })
})

it('deve retornar os valores totais, únicos e quebrados dos links' , () =>{
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
  const total = 3;
  const unique = 2;
  const broken = 1;
  const calculo = calculoStats(info)

  expect(calculo).toEqual({total, unique, broken})
})

/* test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
}); */