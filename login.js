const express = require("express");
const app = express();

app.use(express.json());

// Simulação de banco de dados (Senhas deveriam usar criptografia/hash)
let users = [
  { id: 1, user: "admin", pass: "admin123", tipo: "admin" },
  { id: 2, user: "joao", pass: "123456", tipo: "user" },
  { id: 3, user: "maria", pass: "senha123", tipo: "user" },
];

// LOGIN
app.post("/login", (req, res) => {
  const { user, pass } = req.body;

  // Busca o usuário de forma segura sem estourar o índice do array
  const foundUser = users.find(u => u.user === user && u.pass === pass);

  if (!foundUser) {
    return res.status(401).json({ ok: false, msg: "Usuário ou senha incorretos" });
  }

  // IMPORTANTE: Remove a senha antes de retornar os dados por segurança
  const { pass: _, ...userWithoutPassword } = foundUser;

  // Em uma API real, aqui você geraria e retornaria um Token JWT
  res.json({ 
    ok: true, 
    msg: "Logado com sucesso!", 
    dados: userWithoutPassword 
  });
});

// LISTAR USUÁRIOS (Sem expor as senhas)
app.get("/usuarios", (req, res) => {
  const safeUsers = users.map(({ pass, ...rest }) => rest);
  res.json(safeUsers);
});

// DELETAR USUÁRIO (Utilizando o método DELETE correto)
app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id);
  
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  users.splice(userIndex, 1);
  res.json({ ok: true, msg: `Usuário com ID ${id} deletado.` });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});