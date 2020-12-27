Precisamos desenvolver um sistema web que nos permita controlar a utilização dos automóveis
de uma empresa.

Para isso precisaremos construir uma WebAPI com as funcionalidades abaixo:

• Cadastro de automóvel:

• Cadastrar um novo automóvel

• Atualizar um automóvel cadastrado

• Excluir um automóvel cadastrado

• Recuperar um automóvel cadastrado pelo seu identificador único

• Listar os automóveis cadastrados.

Deve ser possível filtrar a listagem dos
automóveis por cor e marca.

• Cadastro de motoristas

• Cadastrar um novo motorista

• Atualizar um motorista cadastrado

• Excluir um motorista cadastrado

• Recuperar um motorista cadastrado pelo seu identificador único

• Listar os motoristas cadastrados.

Deve ser possível filtrar a listagem dos
motoristas por nome.

• Utilização de um automóvel

• Criar um registro que represente a utilização de um automóvel por um
motorista, com uma data de início e um texto do motivo de utilização.

• Finalizar a utilização de um automóvel por um motorista guardando a data de
finalização

• Listar os registros de utilização cadastrados no sistema com o nome do motorista
e as informações do automóvel utilizado

O que devemos controlar de cada recurso:

-> Automóvel

• Placa

• Cor

• Marca

-> Motorista

• Nome

-> Utilização do automóvel

• Data de início da utilização

• Data de término da utilização

• Motorista que utilizou

• Automóvel utilizado

• Motivo de utilização

-> Regras de negócio:

Um automóvel só pode ser utilizado por um motorista por vez. Um
motorista que já esteja utilizando um automóvel não pode utilizar outro automóvel ao mesmo
tempo.
