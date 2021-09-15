const express = require('express');
const app = express();
const https = require('https');
require('dotenv').config();

app.get('/search-books', (req, res) => {
    const data = [];
    const options = {
        hostname: 'www.googleapis.com',
        path: `/books/v1/volumes?q=${req.query.searchTerm}&key=${process.env.GOOGLE_API_KEY}`,
        method: 'GET',
    }

    const googleRequest = https.request(options, searchResponse => {
        console.log(`statusCode: ${searchResponse.statusCode}`)

        searchResponse.on('data', chunk => {
            data.push(chunk);
        }).on('end', () => {
            const buffer = Buffer.concat(data);
            res.json(JSON.parse(buffer.toString()));
        });
    })

    googleRequest.on('error', error => {
        console.error(error)
    });

    googleRequest.end();
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
})
