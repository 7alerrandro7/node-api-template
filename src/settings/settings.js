require('dotenv').config();

const setEnvOrDefault = (name, type = "string") => {
    let res = process.env[name.toUpperCase()] || process.env[name.toLowerCase()]
    switch (type) {
        case 'boolean':
            res = (res == "true") ? true : false;
            break;
        case 'int':
            res = parseInt(res);
            break;
    }
    return res;
};

module.exports = {

    auth: setEnvOrDefault('auth', 'boolean'),

    environment: {
        type: setEnvOrDefault('environment_type'),
    },

    server: {
        port: setEnvOrDefault('server_port'),
        context: setEnvOrDefault('server_context'),
        host: setEnvOrDefault('server_host'),
    },


    database: {
        sync: setEnvOrDefault('database_sync', 'boolean'),
        force: setEnvOrDefault('database_force', 'boolean'),
        dialect: setEnvOrDefault('database_dialect'),
        storage: setEnvOrDefault('database_storage'),
        host: setEnvOrDefault('database_host'),
        user: setEnvOrDefault('database_user'),
        databaseName: setEnvOrDefault('database_database_name'),
        password: setEnvOrDefault('database_password'),
        poolMaxConnection: setEnvOrDefault('database_pool_max_connection', 'int'),
        poolMinConnection: setEnvOrDefault('database_pool_min_connection', 'int'),
        poolIdle: setEnvOrDefault('database_pool_idle', 'int'),
        requestTimeout: setEnvOrDefault('database_request_timeout', 'int'),
        encrypt: setEnvOrDefault('database_encrypt', 'boolean'),
    }
};
