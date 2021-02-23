# Teste Técnico Desenvolvedor(a) Python Júnior [REMOTO]

Neste repositório você encontra o enunciado do teste técnico para a vaga de Desenvolvedor(a) Python Júnior [REMOTO] da [Instruct](https://instruct.com.br/)!
Você provavelmente chegou aqui através da indicação de alguma pessoa da empresa após passar pelas [outras etapas](https://instruct.com.br/trabalhe-com-a-gente/processo-de-selecao/) do processo seletivo. Se este não for o seu caso e mesmo assim você implementar alguma solução para este exercício, ele não será avaliado.

> Você pode usar o problema descrito aqui para exercitar suas habilidades de desenvolvimento, mas a sua solução será avaliada por alguém da Instruct apenas se você estiver no processo seletivo da vaga de Desenvolvedor(a) Python Júnior [REMOTO].

Caso tenha interesse em se candidatar para uma vaga da Instruct, siga as instruções no site: https://instruct.com.br/trabalhe-com-a-gente/

Nessa página você encontra as vagas abertas atualmente e todos os detalhes de nosso processo seletivo. Se você não encontrou uma vaga que pareça adequada, confira a página novamente em um ou dois meses, ela é atualizada com certa frequência.

## PROBLEMA

A companhia de marketing Vough tem trabalhado cada vez mais para empresas de tecnologia que disponibilizam código aberto.

Com o aumento das demandas surgiu a necessidade de rankear seus atuais e potenciais clientes por um nível de prioridade, de modo a dar preferência a projetos de empresas maiores e mais influentes no meio open source.

## SOLUÇÃO

Para auxiliar a Vough, você deve desenvolver uma API que calcula o valor de prioridade de cada cliente e retorna uma lista de clientes ordenandos por prioridade.

Na versão inicial da API, o valor de prioridade é calculado com base em dados encontrados no Github, através da seguinte fórmula:

`prioridade = <quantidade de membros públicos da organização no Github> + <quantidade de repositórios públicos da organização no Github>`

Na raiz deste repositório você encontra uma base para o projeto na pasta `vough_backend`. A API foi desenvolvida em Django/Python e seu dever é completar este projeto com as funcionalidades que estão faltando.

Para isso, foram passados alguns requisitos técnicos:

- Deve utilizar a [API Rest do Github](https://docs.github.com/pt/free-pro-team@latest/rest) para coletar as informações referentes às organizações.

- Deve possuir um endpoint para consultar uma organização específica através do nome (`login`):

```
GET /api/orgs/<login>/
```

Esse endpoint deverá apresentar os dados no seguinte formato:

```
{
    "login": "string",
    "name": "string",
    "score": int
}
```

Onde o `score` é o nível de prioridade da organização.
Em caso de sucesso, o status `200` deverá ser retornado.
Caso a empresa não seja encontrada, deve retornar o status `404`.

- Deve possuir um endpoint para a listagem de todas as organizações já consultadas através da API:

```
GET /api/orgs/
```

Esse endpoint deverá apresentar os dados no seguinte formato:

```
[
  {
    "login": "string",
    "name": "string",
    "score": int
  },
  {
    "login": "string",
    "name": "string",
    "score": int
  },
  ...
]
```

As organizações listadas aqui devem estar ordenadas pela prioridade (`score`), da maior para a menor.

- Deve possuir um endpoint para a remoção de organizações da listagem:

```
DELETE /api/orgs/<login>/
```

Em caso de sucesso, o status `204` deverá ser retornado.
Caso a empresa não seja encontrada, deve retornar o status `404`.

## AVALIAÇÃO

Inicialmente, nós não iremos olhar o seu código. O projeto será testado de forma automatizada e se ele passar nos testes você receberá um e-mail comunicando que irá para a etapa da entrevista técnica.

Portanto, você deve codificar seu projeto em Python e fazer deploy dele usando os recursos disponibilizados no Frees Tiers da [Heroku](https://www.heroku.com/).

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
`k6 run -e API_BASE='http://localhost:8000/' tests-open.js`

## RECOMENDAÇÕES

- Use Python >= 3.7
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
