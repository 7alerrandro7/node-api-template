# Node-Api

## Description

That's a nodejs api template connected in a sqlite database.
Configure your api on Environment Variables:

| Variable                      | Value                                                                 |
| ----------------------------- | --------------------------------------------------------------------- |
| auth                          | true or false                                                         |
| server_port                   | 3030                                                                  |
| database_dialect              | /* one of 'sqlite' - 'mysql' - 'mariadb' - 'postgres' - 'mssql' */    |
| database_storage              | 'path/to/database.db'  - Only for sqlite                              |
| database_sync                 | true or false                                                         |
| database_force                | true or false                                                         |
| database_host                 | Database host                                                         |
| database_user                 | Database user                                                         |
| database_database_name        | Database name                                                         |
| database_password             | Database password                                                     |
| database_pool_max_connection  | 100                                                                   |
| database_pool_min_connection  | 100                                                                   |
| database_pool_idle            | 10000                                                                 |
| database_request_timeout      | 300000                                                                |

### Prerequisites

- [Git](https://git-scm.com/) to clone the repository.
- [Node.js](https://nodejs.org/) v10+ to run.

### Installing

```sh
$ cd src
$ npm install
```

In src folder run next command to run the project

```
$ npm start
```

## Deployment

In the root folder run:

```
$ make release
```

Access Rancher then login with these credentials:

* Username: admin
* Password: @digital2020

Create a container with the correct image.

## Built With

* [express](https://expressjs.com/pt-br/) - The web framework used
* [mongoose](https://mongoosejs.com/) - The elegant mongodb object modeling for node.js
* [redoc-express](https://www.npmjs.com/package/redoc-express) - The Express Middleware for OpenAPI/Swagger-generated API Reference Documentation
* [body-parser](https://www.npmjs.com/package/body-parser) - Node.js body parsing middleware
* [passport](https://www.npmjs.com/package/passport) - Passport is Express-compatible authentication middleware for Node.js.
* [applicationinsights](https://www.npmjs.com/package/applicationinsights) - Azure Application Insights monitors your backend services and components after you deploy them to help you discover and rapidly diagnose performance and other issues.
