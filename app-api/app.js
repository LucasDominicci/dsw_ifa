const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");

const ProdutoRoutes = require("./src/api/routes/ProdutoRoute")
// const CarrinhoRoutes = require("./src/api/routes/CarrinhoRoute")

const app = express();

//Configuração dos middlewares
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(bodyParser.json())

app.use(ProdutoRoutes)
// app.use(CarrinhoRoutes)

//Exporta o aplicativo express configurado
module.exports = app;