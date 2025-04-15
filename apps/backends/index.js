
const express = require('express');

const registerroutes = require('/Users/soumya/Documents/my-monorepo/apps/backends/routes/authroutes.js');
const app = express();
const bodyparser = require('body-parser');
const connectdb = require('/Users/soumya/Documents/my-monorepo/apps/backends/config/db.js');


app.use(express.json());
connectdb();

app.use("/register",registerroutes)
console.log('______');




app.listen(3000, () => {console.log('Server is running on port 3000')});