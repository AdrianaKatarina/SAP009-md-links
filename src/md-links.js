import {
  readFile, lstatSync, readdirSync, promises,
} from 'node:fs';
import { extname } from 'node:path';

export const isDirectory = (path) => lstatSync(path).isDirectory();
export const isFile = (path) => lstatSync(path).isFile();

export const readingFile = (path, options) => {
  const encode = 'utf-8';
  const regex = /\[[^\]]+\]\(([^)]+)\)/gm;
  return promises.readFile(path, encode)
    .then((data) => {
      const arrLinks = data.match(regex);
      if (arrLinks === null) throw new Error('Arquivo sem link');
      const formatting = arrLinks.map((item) => extractInformation(item, path));
      return checkOptions(formatting, options);
    })
    .catch((err) => err);
};

export const checkOptions = (data, options) => {
  if (options.validate && options.stats) {
    return validate(data)
      .then((response) => calculateStats(response));
  } if (options.validate) {
    return validate(data)
      .then((response) => response);
  } if (options.stats) {
    return validate(data)
      .then((response) => calculateStats(response));
  }

  return data;
};

export const extractInformation = (string, pathFile) => {
  const separate = string.split('](');
  const text = separate[0].replace('[', '');
  const href = separate[1].replace(')', '');
  return {
    href,
    text,
    file: pathFile,
  };
};

export const validate = (data) => Promise.all(data.map((item) => fetch(item.href)
  .then((res) => {
    item.status = res.status;
    if (res.status !== 200) {
      item.message = 'FAIL';
    } else {
      item.message = res.statusText;
    }
    return item;
  })
  .catch((err) => {
    item.status = err.cause.code;
    item.message = 'FAIL';
    return item;
  })));

export const calculateStats = (data) => {
  const links = data.map((item) => item.href);
  const total = links.length;
  const unique = new Set(links).size;
  const broken = data.filter((item) => item.status !== 200).length;
  return {
    total,
    unique,
    broken,
  };
};

export const mdLinks = (path, options) => {
  if (!path) throw new Error('Parâmetro inválido');

  if (isFile(path)) {
    if (extname(path) !== '.md') throw new Error('Extensão inválida');
    return readingFile(path, options);
  } if (isDirectory(path)) {
    // Ler os arquivos dentro da pasta. fs.readdirSync(path[, options]) -> Retorna uma matriz de nomes de arquivos excluindo '.'e '..'.
    const openDirectory = readdirSync(path);
    const fileMd = openDirectory.filter((item) => extname(item) === '.md');
    const directoryName = path;
    const filePathMd = `${directoryName}/${fileMd}`;
    return readingFile(filePathMd, options);
  }
};
