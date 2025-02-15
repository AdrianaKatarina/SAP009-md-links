# Markdown Links

## Índice

* [1. Sobre o projeto](#1-sobre-o-projeto)
* [2. Instalação da biblioteca](#2-instalação-da-biblioteca)
* [3. Guia de uso](#3-guia-de-uso)
* [4. Ferramentas utilizadas](#4-ferramentas-utilizadas)

***

## 1. Sobre o projeto

[Markdown](https://pt.wikipedia.org/wiki/Markdown) é uma linguagem de marcação
muito popular entre os programadores. É usada em muitas plataformas que
manipulam texto (GitHub, fórum, blogs e etc) e é muito comum encontrar arquivos
com este formato em qualquer repositório (começando pelo tradicional
`README.md`).

Os arquivos `Markdown` normalmente contém _links_ que podem estar
quebrados, ou que já não são válidos, prejudicando muito o valor da
informação que está ali.

Este projeto teve como objetivo principal criar uma ferramenta de linha de comando (CLI) que possiblita a execução da biblioteca direta no terminal, a partir de um módulo do Node.js, que irá fazer a leitura e análise dos arquivos no formato `Markdown('.md')`, informando mediante uma verificação a existência de links e algumas estatísticas.

## 2. Instalação da biblioteca

Instale a biblioteca, através do comando: `npm i md-links-adriana-oliveira`

## 3. Guia de uso

1. Com a biblioteca instalada, certifique de criar um arquivo `Markdown` com alguns [links](https://pt.wikipedia.org/wiki/Markdown).

2. Feito isso, o usuário poderá executar as seguintes funcionalidades:

    * `md-links <caminho-do-arquivo>` -> Este comando irá lê o arquivo e procurar por links, caso encontre, irá descrever o caminho do arquivo, URL e texto do link.
Essa será a saída no terminal:
      ```sh
      $ md-links directory/example.md
      directory/example.md https://pt.wikipedia.org/wiki/Markdown Markdown
      directory/example.md https://pt.wikipedia.org/wiki/Markdown Markdown
      directory/example.md https://jestjs.io/docs/pt-BR/getting-starte Introdução ao Jest - Documentação oficial
      directory/example.md https://outra-coisa-.net/algum-doc.html algum doc
      directory/example.md https://curriculum.laboratoria.la/pt/topics/javascript/05-objects/01-objects Objetos em JavaScript
      ```

    * `md-links <caminho-do-arquivo> --validate` -> Este comando irá fazer as validações dos links encontrados, através de uma requisição HTTP. Na saída irá informar o caminho do arquivo, URL, StatusCode, texto do link.
Essa será a saída no terminal:
      ```sh
      $ md-links directory/example.md --validate
      ✔️ directory/example.md https://pt.wikipedia.org/wiki/Markdown OK 200 Markdown
      ✔️ directory/example.md https://pt.wikipedia.org/wiki/Markdown OK 200 Markdown
      ❌ directory/example.md https://jestjs.io/docs/pt-BR/getting-starte FAIL 404 Introdução ao Jest - Documentação oficial
      ❌ directory/example.md https://outra-coisa-.net/algum-doc.html FAIL ENOTFOUND algum doc
      ✔️ directory/example.md https://curriculum.laboratoria.la/pt/topics/javascript/05-objects/01-objects OK 200 Objetos em JavaScript
      ```

    * `md-links <caminho-do-arquivo> --stats` -> Este comando irá calcular a quantidade de links totais e únicos encontrados.
    Essa será a saída no terminal:
      ```sh
      $ md-links directory/example.md --stats
      Total: 5
      Unique: 4
      ```

    * `md-links <caminho-do-arquivo> --validate --stats` -> Este comando irá informar uma estatística com a quantidade de links totais, únicos e inválidos (quebrados). 
    Essa será a saída no terminal:
      ```sh
      $ md-links directory/example.md --validate --stats
      Total: 5
      Unique: 4
      Broken: 2
      ```

## 5. Ferramentas utilizadas


* Node.js
* JavaScript
* Git
* GitHub
* Jest
