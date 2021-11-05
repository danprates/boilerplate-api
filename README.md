# Boilerplate API

## Dependencies

- Node: ^14.15.3
- NPM: ^6.14.15
- Docker: ^20.10.8
- docker-compose: ^1.27.4

## Rodando o projeto

1. Duplique o arquivo `.env.exemple` na raíz do projeto e renomeie para `.env`
1. Inicie o docker compose -> `docker-compose up`
1. Acesse http://localhost:3000/health e veja se está funcionando
1. Para debugar com vscode basta abrir a raiz do projeto e apertar `F5`
1. Se tiver usando mongodb, acesse o painel: http://localhost:9000
    1. username: docker
    1. senha: docker
1. Se tiver usando postgres, acesse o painel: http://localhost:8000
    1. username: admin@docker.com
    1. senha: docker


## Testando a aplicação

1. Para rodar os testes unitários -> `npm run test:unit`
1. Para rodar os testes de integração -> `npm run test:integration`
1. Para rodar todos os testes com coverage -> `npm run test:ci`
1. Para rodar todos os testes -> `npm run test`

## Comandos importantes

```bash
# para buildar o projeto para produção
$ npm run build

# para executar em produção
$ npm run start

# para executar em debug
$ npm run debug

# para rodar o lint
$ npm run lint
```

## Workflow com git e github

1. Antes de tudo atualize seu repositório local: `git fetch --all --prune`
1. Mude para a develop: `git checkout develop`
1. Atualize a develop: `git pull origin develop`
1. Crie uma branch nova: `git checkout -b {NOME}`
    - Utilize o padrão do [Gitflow](https://danielkummer.github.io/git-flow-cheatsheet/index.pt_BR.html) para o nome da branch
1. Faça seus commits utlizando o padrão do [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
    - Faça pequenos commits e com uma boa descrição
    - Antes do commit irá rodar o lint e os testes, então fique atento a isso
1. Após concluir o trabalho volte para a develop: `git checkout develop`
1. Atualize a develop para possíveis commits: `git pull origin develop`
1. Volte para sua branch: `git checkout {NOME_BRANCH}`
1. Faça um rebase para reduzir a chance de conflitos: `git rebase develop`
    - Em caso de conflito resolva eles e faça commit das mudanças
1. Faça o push da sua branch para o repositório online: `git push origin {NOME_BRANCH}`
1. Vá até o repositório online e crie uma PR para a develop
1. Atualize suas tasks e notifique o time sobre a PR

## Todos

- [x] Configurar o docker-compose
  - [x] configurar o lauch do vscode para debug
  - [x] colocar o postgres
  - [x] colocar o mongo
- [] configurar um logger
  - [] ver se é possivel modificar o comportamento padrão do `console.log`
- [] criar o crud basico de usuarios
  - [] colocar testes de integração
- [] colocar o fastify
