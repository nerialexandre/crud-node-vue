![screenshot](https://raw.githubusercontent.com/nerialexandre/crud-node-vue/develop/web/src/assets/livros10.jpg)

## Desafio NODE.js + VUE2

Desafio: Criar sistema CRUD (inclusão, leitura, atualização, deleção) com lógica funcional,  como por exemplo: sistema de ponto, sistema de checagem, sistema de monitoramento.

##### Os seguintes requisitos são necessários:

backEnd: nodejs na versão 10.x com webservice restify/express e comunição restfull
frontEnd: VueJs com Vue UI Library Vuetify
banco de dados: neo4j

## Maiores desafios

O maior desafio se deu em usar o Neo4j, mas isso se deve apenas por nao conhecer a ferramenta e nao esta familiarizado com o conceito de banco de dados orientado a grafos!

##### Impedimento encontrado

Não consegui atender o requisito de utilizacao do node.js na versão 10.x pois o vue-service atualmente esta trabalhando com a versao 12.x ou maior, e por ter um prazo limitado optei por usar a versao LTS seguinte mais proxima, o node.js 12.x
![screenshot](https://github.com/nerialexandre/crud-node-vue/blob/develop/web/src/assets/erro_node_10.jpg?raw=true)


## Maiores facilidades

##### Desenvolvimento
Por já está familiarizado com a liguagem e com o desenvolvimento de API restfull o desenvolvimento se deu de forma bem tranquila podendo aproveitar parte do tempo para realizar testes manuais e dedicar algum tempo as validacoes tanto no backend como no frontend

##### Vuetify
Ainda nao havia utilizado o vuitify, mas o mesmo se mostrou uma ferramenta de facil compreenção(muito clara a documentação)


## Projeto
De acordo com o desafio proposto foi desenvolvido um crud() para cadastro e atualizacao de um banco de livros.
No repositorio criei duas pastas, server e Web (backend e frontend respectivamente), sendo necessario executar cada um de forma separada.

Para clonar o projeto

```
git clone https://github.com/nerialexandre/crud-node-vue.git
```

## Backend
This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/en/starter/installing.html)
- [nodemon](https://nodemon.io/)
- [express-validator](https://express-validator.github.io/docs/)
- [neo4j-driver](https://neo4j.com/developer/javascript/)
- [winston](http://codemirror.net/)

## Requisistos 
- Node.js 12.x
- Banco Neo4j Rodando

## Setup

```
cd server
npm install
```
##### Configurar credenciais banco Neo4j
acesse o arquivo [/src/config/config.js](https://github.com/nerialexandre/crud-node-vue/blob/develop/server/src/config/config.js) e informe as credencias do banco

Exemplo:
```
 neo4j:{
        dbHost: 'bolt://localhost:7687',
        dbUser: 'neo4j',
        dbPass: 'root'
      }
```
##### Executando

```
npm run dev
```
Com isso nossa API devera esta rodando na porta 5000 com sucesso!

## Frontend
This software uses the following open source packages:

- [axios](https://axios-http.com/ptbr/docs/intro)
- [moment](https://momentjs.com/)
- [vue](https://vuejs.org/)
- [vuetify](https://vuetifyjs.com/en/)
- [vue-router](https://router.vuejs.org/)
- [vue-sweetalert2](https://www.npmjs.com/package/vue-sweetalert2)

## Requisistos 
- Node.js 12.x

## Setup

```
cd web
npm install
```
##### Necessario Executar o backend primeiramente

##### Executando

```
npm run serve
```
Com isso nossa front deverá esta rodando na porta 8080 com sucesso!
