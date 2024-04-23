const { Client } = require('pg');

const config = {
    user: 'postgres',
    host: '192.168.2.165',
    database: 'keycloak9x',
    password: 'Welcome@100',
    port: 35432, 
};

export const client = new Client(config);
