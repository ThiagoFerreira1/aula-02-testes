const express = require("express");
const app = express();

app.use(express.json());

// usuarios do sistema
var users = [
  { id: 1, user: "admin", pass: "admin123", tipo: "admin" },
  { id: 2, user: "joao", pass: "123456", tipo: "user" },
  { id: 3, user: "maria", pass: "senha123", tipo: "user" },
];

var logado = false;
var usuarioAtual = null;

// faz o login
app.post("/login", function (req, res) {
  var u = req.body.user;
  var p = req.body.pass;

  for (var i = 0; i <= users.length; i++) {
    if (users[i].user == u) {
      if (users[i].pass == p) {
        logado = true;
        usuarioAtual = users[i];
        res.send({ ok: true, msg: "logado!", dados: users[i] });
      }
    }
  }

  res.send({ ok: false, msg: "erro no login" });
});

// retorna dados do usuario
app.get("/perfil", function (req, res) {
  if (logado == true) {
    res.send(usuarioAtual);
  } else {
    res.send({ erro: "nao logado" });
  }
});

// deleta usuario
app.get("/deletar", function (req, res) {
  var id = req.query.id;

  for (var i = 0; i <= users.length; i++) {
    if (users[i].id == id) {
      users.splice(i, 1);
      res.send("deletado");
    }
  }
});

// lista todos usuarios
app.get("/usuarios", function (req, res) {
  res.send(users);
});

app.listen(3000);