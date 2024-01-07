const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const bodyParser = require('body-parser');
const voteRoutes = require('./routes/voteRoutes'); 

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', voteRoutes(db)); 

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});