import { extrairInformacoes, mdLinks, callback } from '../src/md-links';
import { readFile } from 'node:fs';

jest.mock('node:fs')

describe('pegaArquivo', () => {
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
  it('deve resolver e retornar um array de objeto', () => {
    const encode = 'utf-8';
    const caminhoDoArquivo = 'text.md';
    mdLinks(caminhoDoArquivo);

    expect(readFile).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledWith(caminhoDoArquivo, encode, expect.any(Function));
  })
  it('deve retornar um erro quando não tiver parâmetro', () => {
    expect(() => mdLinks()).toThrow()
  });
}) 