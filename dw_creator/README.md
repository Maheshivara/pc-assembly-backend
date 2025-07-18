# PC Assembly Data Warehouse Creator

## Tutorial de Execução

### 1. Pré-requisitos

- Python 3.11 instalado ([.python-version](.python-version))
- [uv](https://github.com/astral-sh/uv) instalado (`pip install uv`)

### 2. Instalação das dependências

No terminal, execute:

```sh
uv sync
```

### 3. Ativação do ambiente

O `uv` gerencia as dependências no ambiente global do projeto, não sendo necessário ativar um virtualenv manualmente.

### 4. Banco de dados

- Certifique-se de que o PostgreSQL está rodando e que as credenciais no notebook estão corretas.

- Tenha o docker instalado e rode o seguinte comando (na pasta raiz do repositório, [aqui](../)).
```sh
docker compose up postgres -d
```
> [!IMPORTANT]
> Para que o script seja executado com sucesso é necessário realizar as migrações para criação de tabelas.
- Para criar as tabelas basta executar (também na pasta raiz do repositório, [aqui](../)):
```sh
docker compose up migrate -d
```

### 5. Execução do código
> [!IMPORTANT]
> Caso não defina suas variáveis de ambiente o script não será capaz de executar.
- Defina suas variáveis de ambiente (na pasta raiz do repositório, [aqui](../)) com:
- Execute o código [main.py](src\main.py) com o seguinte comando
```sh
set -a; source ../.env; set +a; uv run src/main.py
```

O script realiza:
- Conexão e leitura do banco SQLite (`database.db`)
- Remoção de duplicatas dos dados
- Teste de conexão e inserção dos dados

### 6. Modelo do banco de dados

- Para visualizar o modelo do banco de dados, o site [dbdiagram](https://dbdiagram.io/home) e adicione o texto do arquivo [modelo.txt](docs\modelo.dbml)
