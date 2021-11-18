# Boas vindas ao repositório do Store Manager

Esse projeto é uma API de um sistema de gerenciamento de vendas, onde será possível criar, visualizar, deletar e atualizar os produtos e as vendas. Ou seja, um CRUD.

---

# <span id="sumario">Sumário</span>

- [Habilidades](#habilidades)
- <a href="#arquitetura-e-padroes">Arquitetura e padrões</a>
- <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a>
- <a href="#futuras-implementacoes">Futuras implementações</a> 
- <a href="#requisitos-execucao">Requisitos para execução e consumo da API</a>
- [Como executar](#como-executar) 
- <a href="#shape-retornos">ENDPOINTS: Shape dos retornos das requisições</a>
- [Banco de dados: Shape dos Documentos (registros)](#banco-de-dados-shape-dos-documentos-registros)
- [Linter](#linter)
- <a href="#regras-negocio">Regras de negócio</a>
  - <a href="#permissoes-validacoes">Permissões e validações genéricas</a>

  - [Requisitos](#requisitos)
      - [1 - Endpoint para o cadastro de produtos](#1---endpoint-para-o-cadastro-de-produtos)
      - [2 - Endpoint para listar os produtos](#2---endpoint-para-listar-os-produtos)
      - [3 - Endpoint para atualizar um produto](#3---endpoint-para-atualizar-um-produto)
      - [4 - Endpoint para deletar um produto](#4---endpoint-para-deletar-um-produto)
      - [5 - Endpoint para cadastrar vendas](#5---endpoint-para-cadastrar-vendas)
      - [6 - Endpoint para listar as vendas](#6---endpoint-para-listar-as-vendas)
      - [7 - Endpoint para atualizar uma venda](#7---endpoint-para-atualizar-uma-venda)
      - [8 - Endpoint para deletar uma venda](#8---endpoint-para-deletar-uma-venda)
      - <a href="#atualiza-qtd-produtos">9 - Atualização da quantidade de produtos</a>
      - <a href="#valida-qtd-produtos">10 - Validação da quantidade de produtos </a>

# Habilidades

Esse projeto teve como objetivo praticar as seguintes hardskills:

- Estruturação de uma aplicação em camadas (Arquitetura MSC);
- Delegação de responsabilidades específicas para cada parte do app;
- Melhora da manutenibilidade e reusabilidade do código;
- Aplicação dos padrões REST;
- Implementação de uma API intuitiva e facilmente entendível.
---

# <span id="arquitetura-e-padroes">Arquitetura e Padrões</span>
<a href="#sumario">Sumário</a>

* Arquitetura MSC
* API RESTfull.

# <span id="tecnologias-utilizadas">Tecnologias utilizadas</span>
<a href="#sumario">Sumário</a>

* Node.js
* Express
* MongoDB
* ESLinter

# <span id="futuras-implementacoes">Futuras implementações</span>
<a href="#sumario">Sumário</a>

* Implantar a aplicação na plataforma (PaaS) do Heroku, para que possa ser consumida e testada externamente.
* Implantar um Banco de Dados na nuvem do [MongoDB Atlas](https://www.mongodb.com/atlas) para que possa ser utilizado via Heroku.

# <span id="requisitos-execucao">Requisitos para execução e consumo da API:</span>
<a href="#sumario">Sumário</a>

1. **Node.js**
2. **MongoDB**
3. **Porta 3000** disponível, ou configurar outra.
4. Algum cliente de teste de API (ex.: Postman, Insomnia e etc) caso queira testar as requisições.

# <span id="dependencias">Dependências:</span>
<a href="#sumario">Sumário</a>

No arquivo `package.json` é listado as dependências necessárias.
Para instalar as dependências, estando conectado a internet e dentro da pasta do repositório, basta digitar o seguinte comando:

    `npm install`

# Como Executar

Instalado os requisitos e as dependecias necessárias, basta seguir as seguintes etapas:

1. Dentro pasta do projeto, execute o comando: `npm start`.
2. Em seguida, abra algum cliente de API (ex.: Postman, Insomnia e etc) e faça as requicições para as rotas de **http://localhost:3000** (A porta 3000 está como padrão alternativo na ausência de variável de ambiente).

# <span id="shape-retornos">ENDPOINTS: Shape dos retornos das requisições</span>
<a href="#sumario">Sumário</a>

  - Caso o recurso não seja encontrado, a API deve retornar o status HTTP adequado com o body `{ message: '<recurso> não encontrado' }`.
  - Em caso de erro, a API deve retornar o status HTTP adequado com o body `{ err: { message: <mensagem de erro>, code: <código do erro> } }`.
    - O código de erro implementado deve deve seguir o mesmo padrão para toda a aplicação. Por exemplo: `'not_found'`, `'invalid_data'` e afins.
  - Em caso de dados inválidos, a API deve retornar o status HTTP adequado, com o body `{ err: { message: 'Dados inválidos', code: <código do erro> } }`.
  - Todos os retornos de erro devem seguir o mesmo formato. Para erros que requerem dados adicionais (por exemplo, para informar quais campos estão incorretos) é utilizado a propriedade `data` dentro do objeto `err`.

# Banco de dados: Shape dos Documentos (Registros)
<a href="#sumario">Sumário</a>

O banco deve duas `collections` para: uma para os produtos e outra para as vendas

A tabela terá o seguinte nome: `products`

Os campos da collection `products` terão esse formato:

```json
{ "name": "Produto Silva", "quantity": 10 }
```

A resposta retornada após um `insert` (criação) no banco precisa ter o seguinte shape:

```json
{ "_id": ObjectId("5f43cbf4c45ff5104986e81d"), "name": "Produto Silva", "quantity": 10 }
```

(O \_id é gerado automaticamente)

A tabela de vendas terá o seguinte nome: `sales`

Os campos da tabela `sales` terão esse formato:

```json
{ "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] }
```

A resposta retornada após um `insert` (criação) no banco precisa ter o seguinte shape:

```json
{
  "_id": ObjectId("5f43cc53c45ff5104986e81e"),
  "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }]
}
```

(O \_id é gerado automaticamente)


# Linter
<a href="#sumario">Sumário</a>

Foi usado [ESLint](https://eslint.org/) para fazer a análise estática do código.
No entanto, para usá-lo de forma mais manual, o projeto já vem com as dependências relacionadas ao ESLint configuradas no arquivos `package.json`.

Para executá-lo basta usar --- dentro da pasta do projeto --- o comando `npm run lint`. Se a análise do `ESLint` encontrar problemas no código, tais problemas serão mostrados no seu terminal. Se não houver problema no seu código, nada será impresso no seu terminal.

## ESLint de foram automática

Particulamente eu preferi utilizar o [plugin `ESLint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) pela extensão do `VSCode`, em favor da produtividade.

---

# <span id="regras-negocio">Regras de negócio</span>
<a href="#sumario">Sumário</a>

## <span id="permissoes-validacoes">Permissões e validações genéricas: </span>

- Deve ser possível que a pessoa usuária, independente de cadastramento ou login, possa adicionar, ler, deletar e atualizar produtos no seu estoque. 
- O usuário deve poder também enviar vendas para o sistema. Essas vendas devem validar se o produto em questão existe.
- Deve, também, ser possível ler, deletar e atualizar vendas.

## Requisitos
<a href="#sumario">Sumário</a>

### 1 - Endpoint para o cadastro de produtos

- O endpoint deve ser acessível através do caminho (`/products`);

- Os produtos enviados devem ser salvos em uma **collection** do MongoDB;

- O endpoint deve receber a seguinte estrutura:

```json
{
  "name": "product_name",
  "quantity": "product_quantity"
}
```

O retorno da API de um produto cadastrado com sucesso deverá ser:

```json
{
  "_id": "5f43a7ca92d58904914656b6",
  "name": "Produto do Batista",
  "quantity": 100
}
```

#### Validações:

- `name` deve ser uma _string_ com mais de 5 caracteres e deve ser único;

- `quantity` deve ser um número inteiro maior que 0;

- Cada produto deve ter um id que seja único e gerado no momento em que o recurso for criado.

- A resposta do endpoint em caso de sucesso deve ser o produto criado.


### 2 - Endpoint para listar os produtos
<a href="#sumario">Sumário</a>

- O endpoint deve ser acessível através do caminho (`/products`) ou (`/products/:id`);

- Através do caminho `/products`, todos os produtos devem ser retornados;

- Através do caminho `/products/:id`, apenas o produto com o `id` presente na URL deve ser retornado;


### 3 - Endpoint para atualizar um produto
<a href="#sumario">Sumário</a>

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- O corpo da requisição deve seguir a mesma estrutura do método responsável por adicionar um produto;

- Apenas o produto com o `id` presente na URL deve ser atualizado;


### 4 - Endpoint para deletar um produto
<a href="#sumario">Sumário</a>

- O endpoint deve ser acessível através do caminho (`/products/:id`);

- Apenas o produto com o `id` presente na URL deve ser deletado;

### 5 - Endpoint para cadastrar vendas
<a href="#sumario">Sumário</a>

- O endpoint deve ser acessível através do caminho (`/sales`);

- As vendas enviadas devem ser salvas em uma `collection` do MongoDB;

- Deve ser possível cadastrar a venda de vários produtos através da uma mesma requisição;

- O endpoint deve receber a seguinte estrutura:

```json
[
  {
  "productId": "product_id",
  "quantity": "product_quantity",
  },
  ...
]
```

O retorno de uma venda cadastrada com sucesso deverá ser:

```json
{
  "_id": "5f43ba333200020b101fe4a0",
  "itensSold": [
    {
      "productId": "5f43ba273200020b101fe49f",
      "quantity": 2
    }
  ]
}
```

#### Validações:

- O `productId` devem ser igual ao `id` de um produto anteriormente cadastrado;

- `quantity` deve ser um número inteiro maior que 0;

- Cada venda deve ter um id que seja único e gerado no momento em que o recurso for criado;

- A resposta do endpoint em caso de sucesso deve ser a(s) venda(s) criada(s).


### 6 - Endpoint para listar as vendas
<a href="#sumario">Sumário</a>

- O endpoint deve ser acessível através do caminho (`/sales`) ou (`/sales/:id`);

- Através do caminho `/sales`, todas as vendas devem ser retornadas;

- Através do caminho `/sales/:id`, apenas a venda com o `id` presente na URL deve ser retornada;


### 7 - Endpoint para atualizar uma venda
<a href="#sumario">Sumário</a>

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- O corpo da requisição deve receber a seguinte estrutura:

```json
[
  {
    "productId": "5f3ff849d94d4a17da707008",
    "quantity": 3
  }
]
```

- `quantity` deve ser um número inteiro maior que 0;

- Apenas a venda com o `id` presente na URL deve ser atualizada;


### 8 - Endpoint para deletar uma venda
<a href="#sumario">Sumário</a>

- O endpoint deve ser acessível através do caminho (`/sales/:id`);

- Apenas a venda com o `id` presente na URL deve ser deletado;


### <span id="atualiza-qtd-produtos"> 9 - Atualização da quantidade de produtos</span>
<a href="#sumario">Sumário</a>

- Ao realizar uma venda, atualizá-la ou deletá-la, deve-se, também, atualizar a quantidade do produto em questão presente na `collection` responsável pelos produtos;

- Por exemplo: suponha que haja um produto chamado _Bola de Futebol_ e a sua propriedade `quantity` tenha o valor _10_. Caso seja feita uma venda com _8_ unidades desse produto, a quantidade do produto deve ser atualizada para _2_ , pois 10 - 8 = 2;


### <span id="valida-qtd-produtos">10 - Validação da quantidade de produtos</span>
<a href="#sumario">Sumário</a>

- Um produto nunca deve ter a quantidade em estoque menor que 0;

- Quando uma venda for realizada, precisa ser garantido que a quantidade sendo vendida está disponível no estoque.