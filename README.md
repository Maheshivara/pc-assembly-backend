# Data Warehouse PC Assembly

Este repositório se trata do DW para uso na aplicação PC Assembly, sendo composto por uma coletânea de peças para consulta mediante a filtro.

# Como Rodar

> [!IMPORTANT]
> Esse tutorial considera que o usuário possui o [Docker](https://www.docker.com) (com Docker Compose Plugin), [NodeJS](https://nodejs.org/en) e [Git](https://git-scm.com/) instalados e configurados em sua máquina.

1. Clone esse repositório no seu local desejado.
2. Copie o arquivo [./.env.example](./.env.example) para um novo arquivo no mesmo diretório nomeado **.env** (faça as alterações que achar necessário).
3. Suba os containers (**postgres**: Banco de Dados, **migrate**: Utilitário para subir as migrations do prisma, **dw_creator**: Serviço de seed dos dados no banco) com o comando:
   ```sh
   docker compose up -d
   ```
4. Instale as dependências com:
   ```sh
   yarn install
   ```
5. Gere o client do Prisma com:
   ```sh
   yarn prisma generate
   ```
6. Inicie a API com:
   ```sh
   yarn start:dev
   ```
7. Acesse http://localhost:3001/api/docs (altere a porta caso tenha modificado no arquivo .env) para olhar a documentação Swagger e testar os endpoints.
