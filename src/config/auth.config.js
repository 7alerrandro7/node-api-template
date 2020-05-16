module.exports = (app) => {
  app.use((req, res, next) => {
    const auth = {login: 'auth', password: '09abf4c5-5b0d-4179-bd21-39612556af01'};

    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

    if (login && password && login === auth.login && password === auth.password) {
        return next()
    }

    res.set('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');

});
}