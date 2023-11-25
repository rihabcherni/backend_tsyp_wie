const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
require ('dotenv').config();
const db= require('./config/bd')
app.use(bodyParser.json());

app.get('/', (req, res) => {
res.send('Hello wie tsyp challenge!');
});
//       router: 
const userRouter= require("./routes/UserRouter")
app.use('/user',userRouter);

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});