const config = {
    PORT: 4000,
    DB_URI: `mongodb://localhost/js-tutorials`,
    SALT_ROUNDS: 10,
    SECRET: 'TESTSALT',
    COOKIE_NAME: 'TOKEN',
}

module.exports = config;