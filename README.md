# Boilerplate API

An opinionated template for building highly maintainable and modular APIs using TypeScript, Node.js, and Clean Architecture.

## Dependencies

- Node: ^16.14.2
- NPM: ^8.5.0
- Docker: ^20.10.14
- docker-compose: ^1.27.4

## Running the Project

1. Duplicate the `.env.example` file in the project root and rename it to `.env`.
2. Start the docker-compose -> `docker-compose up`.
3. Access http://localhost:3000/health and verify if it's functioning.
4. To debug with VSCode, open the project root and press `F5`.
5. If you're using MongoDB, access the panel: http://localhost:9000.
   - Username: docker
   - Password: docker
6. If you're using PostgreSQL, access the panel: http://localhost:8000.
   - Username: admin@docker.com
   - Password: docker

## Testing the Application

1. To run unit tests -> `npm run test:unit`.
2. To run integration tests -> `npm run test:integration`.
3. To run all tests with coverage -> `npm run test:ci`.
4. To run all tests -> `npm run test`.

## Important Commands

```bash
# Build the project for production
$ npm run build

# Run the application in production
$ npm run start

# Run the application in debug mode
$ npm run debug

# Run the lint
$ npm run lint
```

## Deployment Reminders

1. Configure the TypeORM environment variables to point to the 'dist' folder:
   ```ini
   TYPEORM_ENTITIES=dist/infra/databases/typeorm/entities/**/*
   TYPEORM_ENTITIES_DIR=dist/infra/databases/typeorm/entities
   TYPEORM_MIGRATIONS=dist/infra/databases/typeorm/migrations/**/*
   TYPEORM_MIGRATIONS_DIR=dist/infra/databases/typeorm/migrations
   ```

## Creating a New Project Version

1. Update the project version: `npm version [VERSION] -m '[MESSAGE]'`
   - Choose the version according to [Semver](https://semver.org/)
   - Add a [MESSAGE] to identify the change, e.g., 'feat: add some feature'
1. Push the tag: `git push origin [BRANCH] --follow-tags`

## Running SonarQube Locally

1. Start the Docker Compose: `docker-compose up sonar`
1. Install `sonar-scanner` (Refer to the [Tutorial](https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/))
1. Execute `sonar-scanner` with the command:

```bash
sonar-scanner \
  -Dsonar.projectKey=boilerplate-api \
  -Dsonar.projectName=boilerplate-api \
  -Dsonar.login=74368321996ef230fee92ae2821c599156285831
```

4. Access the SonarQube page: http://localhost:9000/

- Login: admin
- Password: 123456

## Contributing

We welcome contributions to enhance the project and make it better. To contribute, please follow these guidelines:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and ensure they are well-tested.
3. Commit your changes using a descriptive commit message adhering to the [Conventional Commits](https://www.conventionalcommits.org/) format.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository, explaining the changes you have made.

Please ensure that your code follows our coding standards and conventions. Also, include appropriate tests with your changes.

Thank you for your interest in contributing!

## License

This project is licensed under the [MIT License](https://github.com/danprates/boilerplate-api/blob/master/LICENSE).
