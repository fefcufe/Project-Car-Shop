# Projeto Car Shop!
  Projeto desenvolvido com fins de aplicar os princípios de Programação Orientada a Objetos (`POO`) para a construção de uma API `CRUD` para gerenciar uma concessionária de veículos. Foram utilizados neste projeto o banco de dados `MongoDB` e `mocha`, `chai`, `sinon` e `nyc` para os testes unitários e cobertura de testes.


 ## Utilizando o MongoDB via Docker 🐳:

  1. Baixe a imagem do MongoDB:

  ```sh
  docker pull mongo
  ```

  2. Crie o contêiner do MongoDB:

  ```sh
  docker run --name <nome-do-container> -p 27017:27017 -d mongo
  ```

  3. Confira se o contêiner está rodando:

  ```sh
  docker ps
  ```

 ## Rodando o projeto com Docker 🐳

 1. Rode os serviços `node` e `mongodb`:

  ```sh
  docker-compose up -d
  ```
 2. Instale as dependências dentro do container `car_shop` do `node`:

  ```sh
  docker exec -it car_shop bash
  npm install
  ```



  


