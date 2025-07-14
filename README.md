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

### 4. Execução do notebook

Abra o arquivo [`src/main.ipynb`](src/main.ipynb) no VS Code ou JupyterLab e execute as células.

O notebook realiza:
- Conexão e leitura do banco SQLite (`database.db`)
- Remoção de duplicatas dos dados
- Criação do banco PostgreSQL e tabelas a partir do script [`modelo_pc_assembly.sql`](modelo_pc_assembly.sql)
- Teste de conexão e listagem das tabelas criadas

### 5. Observações

- Certifique-se de que o PostgreSQL está rodando e que as credenciais no notebook estão corretas.
- O arquivo de modelo SQL deve estar no caminho correto conforme especificado no notebook.

---
