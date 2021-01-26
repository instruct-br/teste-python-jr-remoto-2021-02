# Teste Técnico Desenvolvedor(a) Python Júnior [REMOTO]

Neste repositório você encontra o enunciado do teste técnico para a vaga de Desenvolvedor(a) Python Júnior [REMOTO] da [Instruct](https://instruct.com.br/)!
Você provavelmente chegou aqui através da indicação de alguma pessoa da empresa após passar pelas [outras etapas](https://instruct.com.br/trabalhe-com-a-gente/processo-de-selecao/) do processo seletivo. Se este não for o seu caso e mesmo assim você implementar alguma solução para este exercício, ele não será avaliado.

> Você pode usar o problema descrito aqui para exercitar suas habilidades de desenvolvimento, mas a sua solução será avaliada por alguém da Instruct apenas se você estiver no processo seletivo da vaga de Desenvolvedor(a) Python Júnior [REMOTO].

Caso tenha interesse em se candidatar para uma vaga da Instruct, siga as instruções no site: https://instruct.com.br/trabalhe-com-a-gente/

Nessa página você encontra as vagas abertas atualmente e todos os detalhes de nosso processo seletivo. Se você não encontrou uma vaga que pareça adequada, confira a página novamente em um ou dois meses, ela é atualizada com certa frequência. 

## PROBLEMA

A companhia de marketing Vough tem trabalhado cada vez mais para empresas de tecnologia que disponibilizam código aberto. 

Por conta disso, para ter um controle maior de suas operações, ela deseja descobrir quais são os repositórios mais populares de cada empresa que atende, além de comparar os resultados de popularidade entre todos esses clientes.

Compreendendo também que contratos podem ser cancelados, a Vough espera poder apagar os dados anteriormente salvos a respeito de um ex-cliente.

## SOLUÇÃO

Para atender a essa necessidade, você deve desenvolver uma API que apresente os seguintes dados do Github das organizações:

- Nome, companhia, localização, descrição, nomes dos repositórios públicos e quantidade de repositórios públicos de cada organização;
- Um top 3 repositórios de cada organização, contendo seus respectivos nomes, número de issues e de pull requests e a classificação dele.

__Atenção__: a sua aplicação deve obrigatoriamente utilizar a [API Rest do Github](https://docs.github.com/pt/free-pro-team@latest/rest) para coletar as informações referentes às organizações.

A API deverá seguir o seguinte padrão de endpoint:
```
/orgs/<nome-org>/
```
Onde `nome-org` é obrigatório para recuperar as infos de uma organização ou deletá-la da base da dados.

Adiante, organizamos em tópicos os principais requisitos esperados em sua aplicação e exemplos de como cumpri-los.

### Recuperar informações da organização

Deve existir um endpoint onde o usuário insira o nome da organização e receba os dados sobre ela.

Deve ser possível filtrar por um intervalo de tempo as informações da organização.
Padrão da _query string_: `?initial_date=YYYY-MM-DD&end_date=YYYY-MM-DD`

Se não for passado o filtro de data a API deve pegar as informações da organização entre 2020-07-01 à 2020-12-31.

Ex.: busca de informações da organização instruct-br
```
GET /orgs/instruct-br/?initial_date=2021-01-01&end_date=2021-01-15
{
  "name": "Instruct",
  "slug": "instruct-br",
  "top_3_repositories": [
    {
      "name": "repo_1",
      "issues_count": 15,
      "pulls_count": 2,
      "rating": 1
    },
    ...
  ]
}
```

Ainda, para definir o top 3 de repositórios, considere que a popularidade de um repositório é definida pelo número de pull requests e pelo número de issues. Os pesos são os seguintes: o pull request tem peso 2 e a issue peso 1 (pulls_count * 2 + issues_count).

A aplicação também deve fazer o cache das informações encontradas na API do Github e salvar em um banco de dados no momento em que a organização é consultada.

Se a organização já tiver sido consultada e for fazer uma segunda consulta a aplicação deve retornar o cache das informações já salvas no banco, para atualizar as infos o usuário precisa apaga-las via API e depois efetuar a nova consulta.

Se a organização consultada não existir no Github, deve retornar um erro.

Atenção: se o usuário já consultou alguma organização, a aplicação não deve coletar os dados da API do Github, mas sim do banco de dados.

### Listar organizações já consultadas

Deve existir um endpoint onde serão listadas todas as organizações já consultadas pelo usuário.

Ex.:
```
GET /orgs/
[
  {
    "name": "Instruct",
    "slug": "instruct-br",
    "top_3_repositories": [
      {
        "name": "repo_1",
        "issues_count": 15,
        "pulls_count": 2,
        "rating": 1
      },
      ...
    ]
  }
  ...
]
```

### Apagar organização anteriormente consultada

Deve existir um endpoint onde será possível apagar o cache de uma organização já consultada.

Ex.:
```
DELETE /orgs/instruct-br/
{}
```

Se a organização consultada não existir no banco de dados, deve retornar um erro.

## AVALIAÇÃO

Inicialmente, nós não iremos olhar o seu código. O projeto será testado de forma automatizada e se ele passar nos testes você receberá um e-mail comunicando que irá para a etapa da entrevista técnica.

Portanto, você deve codificar seu projeto em Python e fazer deploy dele usando os recursos disponibilizados no Frees Tiers da [Heroku](https://www.heroku.com/). Isso significa que sua API deverá rodar num ambiente virtualizado com [512 MB de RAM](https://www.heroku.com/dynos) e um banco de dados PostgreSQL com um [limite de 10.000 linhas](https://elements.heroku.com/addons/heroku-postgresql#pricing).

Quando você finalizar a implementação, adicione o usuário com o e-mail jobs@instruct.com.br como colaborador do app publicado até o fim do prazo estipulado. A partir disso, conseguimos o endereço em que sua API está publicada e seguimos com os testes automatizados.

Nós executaremos três conjuntos de testes na sua API:

1. Testes básicos (abertos)
2. Testes avançados (fechados)
3. Testes extras (fechados)

Se a API não passar nos testes básicos, faremos mais duas tentativas. Se mesmo assim ela não passar nos testes básicos, nós encerramos os testes.

Se a API passar nos testes básicos e não passar nos testes avançados, faremos mais duas tentativas. Se mesmo assim ela não passar nos testes avançados, nós encerramos os testes.

Se a API passar pelos testes avançados, você já garantiu a sua participação na próxima etapa do processo — mesmo assim vamos executar os testes extras para avaliar mais alguns pontos da sua solução.

Os testes básicos estão disponíveis neste repositório, no arquivo tests-open.js, e é recomendado que você os use durante o desenvolvimento para avaliar se a sua API está correta. 

Como explicado acima, você não passará para a próxima etapa se a sua solução não atender a todos os testes desse arquivo. Use as verificações presentes nele para guiar o desenvolvimento da sua solução.

Você pode executar esses testes com o [k6](https://k6.io/). Para instalar o k6 basta [baixar o binário](https://github.com/loadimpact/k6/releases) para o seu sistema operacional (Windows, Linux ou Mac).

E para rodar os testes abertos, especifique a variável de ambiente "API_BASE" com o endereço base da API testada.

Exemplo de aplicação rodando no localhost na porta 8000:
`k6 run -e API_BASE='http://localhost:8000' tests-open.js`

## RECOMENDAÇÕES
- Use Python >= 3.6
- Siga a PEP-8.
- Use Git.
- [Escreva mensagens claras no Git](https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/best-practices).
- Escreva testes unitários!
- Modele o banco de dados com cautela e procure representar as entidades corretamente.
- Siga as [boas práticas](https://swagger.io/resources/articles/best-practices-in-api-design/) para o desenvolvimento de APIs RESTful.
- Documente sua aplicação:
  - Descreva sua aplicação e os problemas que ela resolve.
  - Dê instruções de como executar os testes e a sua aplicação.
  - Documente os endpoints da API (ex.: Swagger).
