# Respostas

## Pergunta 1.1

Para fazer o setup da persistência de dados e bases de dados realizei os seguintes comandos (sendo que os últimos comandos foram para verificar se a importação correu bem). Importante salientar que antes destes comandos fiz a análise e tratamento do dataset fornecido, tendo convertido o mesmo de csv para json (conversor na net), trocado o nome do atributo "idcontrato" para "_id" (manualmente) e convertido todos os valores associados ao atributo "precoContratual" para valores numéricos (pois alguns estavam em string) através do script de python normalizer.py, para só depois fazer a importação para a base de dados.

#### Remove o container do MongoDB

```
docker stop mongodb
docker rm mongodb
```

##### Corre o container do MongoDB

```
docker run -d --name mongodb -p 27017:27017 mongo
```

##### Copia o arquivo JSON para o container

```
docker cp contratos_normalized.json mongodb:/tmp/contratos.json
```

##### Importa o arquivo JSON para o MongoDB

```
docker exec -it mongodb mongoimport --db contratos --collection contratos --file /tmp/contratos.json --jsonArray
```

##### Entra no container do MongoDB

```
docker exec -it mongodb bash
```

##### Abre o shell do MongoDB

```
mongosh
```

##### Conecta no banco de dados

```
use contratos
```

##### Lista as coleções

```
show collections
```

##### Lista os documentos da coleção

```
db.contratos.find()
```
<br>
<br>

# Como Executar

Para executar o projeto, basta correr os seguintes programas:

### 1. NOrmalização do Dataset

Importante salientar que antes de correr este script, é necessário converter o dataset de csv para json com um conversor online e trocar o nome das keys de "idcontrato" para "_id".

```
python normalizer.py contratos.json contratos_normalized.json
```

### 2. Criação da Base de Dados

Corre o container do MongoDB

```
docker run -d --name mongodb -p 27017:27017 mongo
```

##### Copia o arquivo JSON para o container

```
docker cp contratos_normalized.json mongodb:/tmp/contratos.json
```

##### Importa o arquivo JSON para o MongoDB

```
docker exec -it mongodb mongoimport --db contratos --collection contratos --file /tmp/contratos.json --jsonArray
```

### 2. Execução da API de Dados

```
cd ex1/Api_dados/
npm install
npm start
```

### 3. Execução da Interface

```
cd ex2/html_Contratos/
npm install
npm start
```

### 5. Depois pode aceder à interface através do link

```
http://localhost:16001/
```
