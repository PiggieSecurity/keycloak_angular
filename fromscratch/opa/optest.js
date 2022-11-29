const express = require('express');
const bodyParser = require('body-parser');
const extAuthz = require('@build-security/opa-express-middleware');
const cors = require('cors')
const { auth }  = require('express-oauth2-jwt-bearer');

const port = 3000;

const app = express();

app.use(cors())
app.use(auth({
        issuerBaseURL : 'http://localhost:8080/realms/test',
        audience: 'http://localhost:3000'
    }
));

const extAuthzMiddleware = extAuthz.authorize((req) => ({
    port: 8181,
    hostname: 'http://localhost',
    policyPath: '/fromscratch/allow',
    enrich: {token: req.auth.payload}
}));



app.use(bodyParser.json(), extAuthzMiddleware);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`)
});


app.get('/admin', (req, res) => res.send('admin works'))
app.get('/user', (req, res) => res.send('user works'))
app.get('/test',
    (req, res, next) => {
        const auth = req.auth;
        auth.header; // The decoded JWT header.
        auth.payload;  // The decoded JWT payload.
        auth.token; // The raw JWT token.
        res.send('test works')
    }
);

