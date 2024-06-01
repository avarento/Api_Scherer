const express = require('express');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const https = require('https');
const fs = require('fs');

const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: fs.readFileSync('cert'),
});

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/search', async (req, res) => {
    const busca = req.query.busca;
    if (!busca) {
        return res.status(400).send('O parâmetro "busca" é necessário');
    }

    const url = ``;

    try {
      const response = await axios.get(url);
        const html = response.data;
        const dom = new JSDOM(html);
        const document = dom.window.document;

        res.send(document.documentElement.outerHTML);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao buscar os dados');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});