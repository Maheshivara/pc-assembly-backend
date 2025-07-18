import sqlite3
import pandas as pd
import psycopg2
from sqlalchemy import create_engine
import os

# Configurações do banco de dados PostgreSQL
usuario = os.environ.get("POSTGRES_USER", "postgres")
senha = os.environ.get("POSTGRES_PASSWORD", "")
host = os.environ.get("POSTGRES_HOST", "localhost")
porta = os.environ.get("POSTGRES_PORT", "5432")
banco = os.environ.get("POSTGRES_DB", "pc_assembly")

# Verifica se as variáveis de ambiente estão definidas
if not all([usuario, senha, host, porta, banco]):
    raise ValueError("Certifique-se de que todas as variáveis de ambiente do banco de dados estão definidas.")

# Verificar se o banco já está populado
try:
    conexao = psycopg2.connect(
        user=usuario,
        password=senha,
        host=host,
        port=porta,
        database=banco,
    )
    cursor = conexao.cursor()
    cursor.execute("SELECT 1 FROM desktop.\"CPU\" LIMIT 1;")
    if cursor.fetchone() is not None:
        print("O banco de dados já está populado. Encerrando o script.")
        cursor.close()
        conexao.close()
        exit(0)
except psycopg2.OperationalError:
    print("O banco de dados não está acessível. Verifique as configurações.")
    exit(1)

# Conectando ao banco de dados SQLite
script_dir = os.path.dirname(os.path.abspath(__file__))
caminho_db = os.path.join(script_dir, "..", "data", "database.db")
conexao = sqlite3.connect(caminho_db)

# Cria um dataframe para cada tabela
cpu = pd.read_sql_query("SELECT * FROM cpu", conexao)
memory = pd.read_sql_query("SELECT * FROM memory", conexao)
hd = pd.read_sql_query("SELECT * FROM hd", conexao)
ssd = pd.read_sql_query("SELECT * FROM ssd", conexao)
psu = pd.read_sql_query("SELECT * FROM psu", conexao)
computerCase = pd.read_sql_query("SELECT * FROM computerCase", conexao)
cooler = pd.read_sql_query("SELECT * FROM cooler", conexao)
gpu = pd.read_sql_query("SELECT * FROM gpu", conexao)
motherboard = pd.read_sql_query("SELECT * FROM motherboard", conexao)

# Fechando a conexão
conexao.close()

cpu = cpu.drop_duplicates()
memory = memory.drop_duplicates()
hd = hd.drop_duplicates()
ssd = ssd.drop_duplicates()
psu = psu.drop_duplicates()
computerCase = computerCase.drop_duplicates()
cooler = cooler.drop_duplicates()
gpu = gpu.drop_duplicates()
motherboard = motherboard.drop_duplicates()

motherboard = motherboard[
    ~((motherboard["extensionPCI3x16"] == 0) & (motherboard["extensionPCI4x16"] == 0))
]

motherboard["socket"] = (
    motherboard["socket"].str.split(",").apply(lambda lst: [s.strip() for s in lst])
)
motherboard = motherboard.explode("socket").reset_index(drop=True)

invalid = ["SoC", "AM1", "775", "2011-v3", "2011-3"]
motherboard = motherboard[~motherboard["socket"].isin(invalid)]

cpu["socket"] = cpu["socket"].str.split(",").apply(lambda lst: [s.strip() for s in lst])

cpu = cpu.explode("socket").reset_index(drop=True)

invalid_sockets = ["FM2", "AM3", "sWRX80", "LGA 1851", "1851"]
cpu = cpu[~cpu["socket"].isin(invalid_sockets)]

substituir = ["DDR4, SO - DIMM", "DDR4, ECC - Speicher"]
motherboard = motherboard.replace({"memoryType": {k: "DDR4" for k in substituir}})

memory["type"] = memory["type"].str.split("-").str[0]
memory = memory[~memory["type"].isin(["DDR1", "DDR2", "DDR3L"])]

cooler["adicionalFan"] = cooler["adicionalFan"].map({0: False, 1: True})

cooler["sockets"] = cooler["sockets"].str.split(",")

cooler_exploded = cooler.explode("sockets")

df_assoc = pd.merge(
    cpu[["mpn", "socket"]],
    cooler_exploded[["mpn", "sockets"]],
    left_on="socket",
    right_on="sockets",
    how="inner",
)

CPU_Cooler = (
    df_assoc.rename(columns={"mpn_x": "cpu_mpn", "mpn_y": "cooler_mpn"})[
        ["cpu_mpn", "cooler_mpn"]
    ]
    .drop_duplicates()
    .reset_index(drop=True)
)

df_assoc = pd.merge(
    cpu[["mpn", "socket"]], motherboard[["mpn", "socket"]], on="socket", how="inner"
)

CPU_PlacaMae = (
    df_assoc.rename(columns={"mpn_x": "cpu_mpn", "mpn_y": "placamae_mpn"})[
        ["cpu_mpn", "placamae_mpn"]
    ]
    .drop_duplicates()
    .reset_index(drop=True)
)

df_assoc = pd.merge(
    motherboard[["mpn", "memoryType"]],
    memory[["mpn", "type"]],
    left_on="memoryType",
    right_on="type",
    how="inner",
)

PlacaMae_MemoriaRAM = (
    df_assoc.rename(columns={"mpn_x": "placamae_mpn", "mpn_y": "memoriaram_mpn"})[
        ["placamae_mpn", "memoriaram_mpn"]
    ]
    .drop_duplicates()
    .reset_index(drop=True)
)

engine = create_engine(
    f"postgresql+psycopg2://{usuario}:{senha}@{host}:{porta}/{banco}", echo=False
)

pk_cols = {
    "CPU": "mpn",
    "GPU": "mpn",
    "HD": "mpn",
    "MemoriaRAM": "mpn",
    "PlacaMae": "mpn",
    "FonteDeAlimentacao": "mpn",
    "SSD": "mpn",
    "CPUCooler": "mpn",
    "CPU_Cooler": ["cpu_mpn", "cooler_mpn"],
    "CPU_PlacaMae": ["cpu_mpn", "placamae_mpn"],
    "PlacaMae_MemoriaRAM": ["placamae_mpn", "memoriaram_mpn"],
}

dfs_para_inserir = {
    "CPU": cpu,
    "GPU": gpu,
    "HD": hd,
    "MemoriaRAM": memory,
    "PlacaMae": motherboard,
    "FonteDeAlimentacao": psu,
    "SSD": ssd,
    "CPUCooler": cooler,
    "CPU_Cooler": CPU_Cooler,
    "CPU_PlacaMae": CPU_PlacaMae,
    "PlacaMae_MemoriaRAM": PlacaMae_MemoriaRAM,
}

for tabela, df in dfs_para_inserir.items():
    pk = pk_cols[tabela]

    if isinstance(pk, list):
        select_expr = "||'|'||".join(pk)
        sql = f'SELECT {select_expr} AS pk FROM desktop."{tabela}"'
        existentes = pd.read_sql(sql, engine)["pk"].tolist()
        df["_pk"] = df[pk].agg("|".join, axis=1)
        df_novo = df[~df["_pk"].isin(existentes)].drop(columns=["_pk"])
    else:
        sql = f'SELECT "{pk}" FROM desktop."{tabela}"'
        existentes = pd.read_sql(sql, engine)[pk].tolist()
        df_novo = df[~df[pk].isin(existentes)]

    if not df_novo.empty:
        df_novo.to_sql(
            name=tabela,
            con=engine,
            schema="desktop",
            if_exists="append",
            index=False,
            method="multi",
            chunksize=500,
        )
        print(f"✔ Inseriu {len(df_novo)} novos em {tabela}")
    else:
        print(f"- Não há registros novos para {tabela}")
