Projeto IT Academy Edição 20


Autor: João Vitor Vogel
Versão: 1.0 20/03/2024


Para executar o projeto é necessária a instalação das dependências listadas nos arquivos package.json
de ambos os projetos (backend, frontend), assim como a inicialização dos projetos


no windows é recomendado o terminal do git bash


Abra primeiramente o projeto frontend e execute o seguinte comando no terminal do seu diretório
"npm install"


Após instalar todas as dependências execute o comando
"npm run dev


Dessa forma o projeto do front já estará em execução.


Em seguida abra um novo terminal no diretório do projeto backend e execute o comando
"npm install"


Após instalar todas as dependências execute o comando
"npm run dev


Dessa forma o projeto do back ja estaria em execução.


Os dois projetos estando em execução basta abrir o navegador de sua preferência
e acessar a porta http://localhost:3000






INSTRUÇÕES DE UTILIZAÇÃO


No topo do projeto existe uma caixa de seleção para a edição, infelizmente não pude realizar
a implementação da opção de criar novas edições e guardar as antigas, sendo assim ela sempre
conterá apenas a opção de primeira edição, e ao resetar as apostas, será essa edição que será resetada


Para a seleção dos números o usuário pode marcá los e demarcá los da maneira que preferir, o sistema só permitirá que 5 números sejam marcados ao mesmo tempo, e só habilitar o botão de envio caso estejam selecionados 5 números


Na função surpresinha o sistema irá realizar uma seleção aleatória dos números


Na caixa de nome o botão apostar só será ativo quando for preenchido pelo menos um caractere para que o nome não fique em branco


No campo cpf só é permitido a inserção de números, e ao completá los o sistema formata automaticamente, também só é liberado o botão apostar após o usuário preencher corretamente o campo cpf




Ao selecionar a opção de iniciar sorteio e confirmá la, não será possível realizar novas apostas


Caso o sistema não encontre vencedores, o usuário pode sortear até 25 novos números diferentes dos que já existem, ou até que seja encontrado um ganhador.


Quando um ganhador é encontrado, é bloqueada a função de sortear novos números, e é disponibilizada a opção de realizar premiação.


Ao realizar a premiação o sistema pega o valor padrão acumulado que é de 1000000 e divide igualmente entre todos os vencedores caso haja mais de um


Por último existe o botão de resetar edição, isso irá apagar todos os dados incluindo as apostas, assim o usuário poderá fazer tudo novamente.
