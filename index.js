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

    const url = `https://www.scherer-sa.com.br/extranet/site/produtoDetalhes?idproduto=104504&token=03AFcWeA5ctzlALaVWf0rHGKHGfMPX646jDIguxRHgt9DswtLbVuiS8Lk5BRkWHrA3UoEnbfw6vartbwts0sm4GVteLrF0_s5fdWpxctn7RGf_k6OAlac5BxTEJM3tFWsbmkgMb4YbI58IlYZquPYzZAw1_BZMAk3P-kFDYqrS-0TA6HpsAlsRb8-217Hw7gYrGJ6uRlmpfbh35TtjD7_Qrh-2IEXVTr_8hQwGuyUnfQ9jt4Ns_fNsVNFjA3Af4tJm-_Y7vNOfxM3O7imgS5qfrxsm0UYbxMrqQnYhbuwZ3ltEsJUDCdXoyV_HOb7WF5X-swgQV09PyEdrpr-1kl5D21TxOQunE8cCo2Ab_DI6ZEeXoU5eE4XGF6PaebUufWOlM8DVM-Jqrx3NWWKylSdpeP2JMie6gCP1cHsm4IUI0VBYXfgK0uDEax1ruDuqnvURuRmCLob9N36CZqnFcy--Ki-GvMczQZxDBUPl9fgymY7-X9sPWR4HyqGyG2sGQC_NjZEQ4qDtKBtNHYeuwhW9RmW-oFGgb0a44Tt1eY2HXGHcM3lL17LZXgv1VmZxv_8NgCy3ME21SoiJLPqsUyDrMTTx3YnOk3hqPS75zTsQB80KRfxKBhYd_87197cM9BUeAMV4Orr3KMcYUPDJnHLsOo2EzmkEq6mslwIW7ubJTQM8cNIw7L7PRAtAOlvovHyEYKqam3hVH8H7fUbLUX3ei4wVbR3-fOR4fg`;

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