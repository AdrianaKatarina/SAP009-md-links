//logica do projeto
//export a função para o md-links
//protcolo http -> status code

//separar links

export const validateFuncions = (informacoes) => {
  console.log('info', informacoes.href)
  return fetch(informacoes.href)
    .then(response => {
      const status = response.status;
      console.log('status', status)
      if(status === 200){
        return {file: informacoes.file, href: informacoes.href, message: 'ok', status, text: informacoes.file}
      }
    console.log(response.status)
    })
    .catch(err => console.log('Erro de solicitação', err))
}

// Solicitação GET.
fetch('https://nodejs.or/')
    .then(response => console.log(response.status))
    .catch(err => console.log('Erro de solicitação', err)); 

     /* .then((response) =>{
        const status = response.status;
        if(status === 200){
            return {file: link.file, href: link.href, message: 'ok', status, text: link.file}
          /* return console.log(`${status} ${chalk.yellow('ok')}`); */
        /* }  
      })
      .catch(err => console.log('Erro de solicitação', err)); */ 