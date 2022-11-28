const express = require('express');
const bodyParser = require('body-parser');
const extAuthz = require('@build-security/opa-express-middleware');
const cors = require('cors')
const port = 3000;

const app = express();
app.use(cors())

const extAuthzMiddleware = extAuthz.authorize((req) => ({
    port: 8181,
    hostname: 'http://localhost',
    policyPath: '/authz/allow',
}));



app.use(bodyParser.json(), extAuthzMiddleware);

app.listen(port, () => {
    console.log(`Now listening on http://localhost:${port}`)
});

app.get('/test', (req, res) => res.send('It works'))

