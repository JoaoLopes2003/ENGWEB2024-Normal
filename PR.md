# Respostas

## Pergunta 1.1

Para fazer o setup da persistência e bases de dados realizei os seguintes comandos (sendo que os últimos comandos foram para verificar se a importação correu bem). Importante salientar que antes destes comandos fiz a análise e tratamento do dataset fornecido, tendo convertido o mesmo de csv para json (conversor na net), trocado o nome do atributo "idcontrato" para "_id" (manualmente) e convertido todos os valores associados ao atributo "precoContratual" para numéricos através do script de python normalizer.py, para que fosse possível fazer a importação para a base de dados.

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
docker cp contratos.json mongodb:/tmp/contratos.json
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