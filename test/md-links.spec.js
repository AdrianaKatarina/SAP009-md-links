import { extrairInformacoes } from '../src/md-links';

describe('pegaArquivo::', () => {
  it('Deve retornar a formatação link, texto e arquivo ', () => {
    const text = 'Markdown';
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const string = `[${text}](${href})`;
    const file = 'text.md'

    const info = extrairInformacoes(string, file);
    
    expect(info).toEqual({href, text, file});
  })
})