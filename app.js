const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API funcionando!"
    });
});

app.get("/soma", (req, res) => {
    const a = Number(req.query.a);
    const b = Number(req.query.b);


    const resultado = a + b;

    res.status(200).json({
        resultado
    });
});

module.exports = app;