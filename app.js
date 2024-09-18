let accounts = require('./accounts');
const express = require('express');
const app = express();
const accountsRoutes = require('./api/accounts/accounts.routes');
const connectDB = require("./database");
const dotenv = require("dotenv");
const morgan = require('morgan');
dotenv.config();
connectDB();

app.use(express.json());
app.use(morgan("dev"));
app.use('/accounts', accountsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`The application is running on localhost:${process.env.PORT}`);
});
