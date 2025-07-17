# pc-assembly-backend

## Tutorial de Execução

### 1. Pré-requisitos

- Python 3.11 instalado ([.python-version](.python-version))
- [uv](https://github.com/astral-sh/uv) instalado (`pip install uv`)

### 2. Instalação das dependências

No terminal, execute:

```sh
uv pip install -r pyproject.toml
```

Ou, para instalar diretamente via lockfile:

```sh
uv pip install -r uv.lock
```

### 3. Ativação do ambiente

O `uv` gerencia as dependências no ambiente global do projeto, não sendo necessário ativar um virtualenv manualmente.

### 4. Banco de dados

- Certifique-se de que o PostgreSQL está rodando e que as credenciais no notebook estão corretas.

- Tenha o docker instalado e rode o seguinte comando.
```sh
docker compose up -d
```

- O arquivo de modelo SQL deve estar no caminho correto conforme especificado no notebook.

### 5. Execução do código

- Execute o código [main.py](src\main.py) com o seguinte comando
```sh
uv run .\src\main.py
```

O notebook realiza:
- Conexão e leitura do banco SQLite (`database.db`)
- Remoção de duplicatas dos dados
- Criação do banco PostgreSQL e tabelas a partir do script [`modelo_pc_assembly.sql`](modelo_pc_assembly.sql)
- Teste de conexão e listagem das tabelas criadas

### 6. Modelo do banco de dados

- Para visualizar o modelo do banco de dados, o site [dbdiagram](https://dbdiagram.io/home) e adicione o texto do arquivo [modelo.txt](extras\modelo.txt)
