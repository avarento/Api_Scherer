const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/search', async (req, res) => {
    const busca = req.query.busca;
    if (!busca) {
        return res.status(400).send('O parâmetro "busca" é necessário');
    }

    const url = `https://www.scherer-sa.com.br/promocoes?parametro=codigo-scherer&busca=${busca}`;

    try {
        const response = await axios.get(url);
        const html = response.data;
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Modifique os seletores para buscar os dados desejados no site
        const data = [];
        const items = document;
        data.push(items);

        res.json(document);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar os dados');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});