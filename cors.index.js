const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSucssStatus: 200,
}

module.exports = cors(corsOptions);