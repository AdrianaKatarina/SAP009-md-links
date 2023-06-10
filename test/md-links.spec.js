import { lstatSync, promises } from 'node:fs';
import {
  isDirectory,
  isFile,
  readingFile,
  checkOptions,
  extractInformation,
  mdLinks,
  calculateStats,
} from '../src/md-links';

jest.mock('node:fs', () => ({
  lstatSync: jest.fn(),
  promises: {
    readFile: jest.fn().mockResolvedValue(),
  },
}));
jest.mock('node:fs')
jest.mock('node:path');

afterEach(() => {
  lstatSync.mockClear();
});

const infoPadrao = [
  {
    href: 'https://pt.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'text.md',
  },
  {
    href: 'https://pt.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'text.md',
  },
  {
    href: 'https://curriculum.labor.la/pt/topics/javascript/05-objects/01-objects',
    text: 'Objetos em JavaScript',
    file: 'text.md',
  },
];
const info = [
  {
    href: 'https://pt.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'text.md',
    status: 200,
    message: 'OK',
  },
  {
    href: 'https://pt.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: 'text.md',
    status: 200,
    message: 'OK',
  },
  {
    href: 'https://curriculum.laboratoria.la/pt/topics/javascript/05-objects/01-objec',
    text: 'Objetos em JavaScript',
    file: 'text.md',
    status: 404,
    message: 'FAIL',
  },
];

describe('Verificação do Caminho', () => {
  it('deve verificar se o caminho passado foi um diretório', () => {
    const mockDirectory = { isDirectory: () => true };
    lstatSync.mockReturnValueOnce(mockDirectory);
    const path = 'file';
    const directory = isDirectory(path);
    expect(lstatSync).toHaveBeenCalledTimes(1);
    expect(lstatSync).toHaveBeenCalledWith(path);
    expect(directory).toEqual(true);
  });

  it('deve verificar se o caminho passado foi um arquivo', () => {
    const mockFile = { isFile: () => true };
    lstatSync.mockReturnValueOnce(mockFile);
    const path = 'text.md';
    const file = isFile(path);

    expect(lstatSync).toHaveBeenCalledTimes(1);
    expect(lstatSync).toHaveBeenCalledWith(path);
    expect(file).toEqual(true);
  });
});

describe('Função readingFile', () => {
  it('Deve chamar a função readfile com os parâmetros corretos', () => {
    const encode = 'utf-8';
    const options = {
      validate: false,
      stats: false,
    };

    readingFile(info.file, options);

    expect(promises.readFile).toHaveBeenCalledTimes(1);
    expect(promises.readFile).toHaveBeenCalledWith(info.file, encode);
  });
});

describe('Função checkOptions', () => {
  it('Deve retornar informações sobre o total, unique e broken sobre os links quando somente o stats for igual à true', () => {
    const options = {
      validate: false,
      stats: true,
    }
    const result = {
      total: 3,
      unique: 2,
      broken: 1,
    }
    return checkOptions(infoPadrao, options).then((res) => {
      expect(res).toEqual(result);
    });
  })

 it('Deve retornar informações detalhada sobre cada link somente quando o validate for igual à true', () => {
    const options = {
      validate: true,
      stats: false,
    }
    const result = [
      {
        file: 'text.md',
        href: 'https://pt.wikipedia.org/wiki/Markdown',
        message: 'OK',
        status: 200,
        text: 'Markdown',
      },
      {
        file: 'text.md',
        href: 'https://pt.wikipedia.org/wiki/Markdown',
        message: 'OK',
        status: 200,
        text: 'Markdown',
      },      
      {
        file: 'text.md',
        href: 'https://curriculum.labor.la/pt/topics/javascript/05-objects/01-objects',
        message: 'FAIL',
        status: 'ENOTFOUND',
        text: 'Objetos em JavaScript',
      }
    ]

    return checkOptions(infoPadrao, options).then((res) => {
      expect(res).toEqual(result);
    });
  }) 

  it('Deve retornar o total, unique, broken quando validate e stats forem iguais à true', () => {
    const options = {
      validate: false,
      stats: true,
    };
    const result = {
      broken: 1,
      total: 3,
      unique: 2,
    };
    return checkOptions(infoPadrao, options).then((res) => {
      expect(res).toEqual(result);
    });
    
  });

  it('Deve retornar href, text, file quando validate e stats forem iguais à false', () => {
    const options = {
      validate: false,
      stats: false,
    };
    const result = infoPadrao;

    const check = checkOptions(result, options);
    expect(check).toEqual(result);
  });
});

describe('função extractInformation', () => {
  it('Deve retornar link, text e file', () => {
    const text = 'Markdown';
    const href = 'https://pt.wikipedia.org/wiki/Markdown';
    const string = `[${text}](${href})`;
    const file = 'text.md';

    const info = extractInformation(string, file);
    expect(info).toEqual({ href, text, file });
  });
});

describe('Função calculeStats', () => {
  it('Deve retornar os valores totais, únicos e quebrados dos links', () => {
    const resultado = {
      total: 3,
      unique: 2,
      broken: 1,
    };
  
    const calculo = calculateStats(info);
    expect(calculo).toEqual(resultado);
  });
})

describe('Função md-links', () => {
  it('deve retornar um erro quando não tiver parâmetro', () => {
    expect(() => mdLinks()).toThrow('Parâmetro inválido');
  });
});
