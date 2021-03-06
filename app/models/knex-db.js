
const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile');
const environmentConfig = config[environment];

const knex = require('knex');
const connection = knex(environmentConfig);


async function assertDatabaseConnection() {
    return connection.raw('select 1+1 as result')
        .catch((err) => {
            console.log('[Fatal] Failed to establish connection to database! Exiting...');
            console.log(err);
            process.exit(1);
        });
}


async function init() {
    await assertDatabaseConnection();
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

// init();
module.exports = connection;
