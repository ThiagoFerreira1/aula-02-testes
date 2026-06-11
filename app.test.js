const request = require("supertest");
const app = require("./app");

describe("Testes da API", () => {

    test("Deve retornar API funcionando", async () => {
        const response = await request(app).get("/");

        expect(response.statusCode).toBe(200);
        expect(response.body.mensagem).toBe("API funcionando!");
    });

    test("Deve somar corretamente", async () => {
        const response = await request(app)
            .get("/soma?a=2&b=3");

        expect(response.statusCode).toBe(200);
        expect(response.body.resultado).toBe(5);
    });

    // TESTE COM FALHA PROPOSITAL
    test("Teste propositalmente errado", async () => {
        const response = await request(app)
            .get("/soma?a=2&b=2");

        expect(response.body.resultado).toBe(4);
    });

});