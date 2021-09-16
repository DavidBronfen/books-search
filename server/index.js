const express = require('express');
const app = express();
const https = require('https');
const cors = require("cors");
require('dotenv').config();

app.use(cors());

app.get('/search-books', (req, res) => {
    const data = [];
    const term = req.query.term;
    const options = {
        hostname: 'www.googleapis.com',
        path: `/books/v1/volumes?q=${term}&key=${process.env.GOOGLE_API_KEY}`,
        method: 'GET',
    }

    const googleRequest = https.request(options, searchResponse => {
        searchResponse.on('data', chunk => {
            data.push(chunk);
        }).on('end', () => {
            const buffer = Buffer.concat(data);
            const jsonFromBuffer = JSON.parse(buffer.toString());
            const booksList = getBooksList(jsonFromBuffer);
            res
                .status(searchResponse.statusCode)
                .json({ term, booksList });

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

const getBooksList = (responseObject) => {
    return responseObject.items.map(book => ({
        title: book.volumeInfo.title ? book.volumeInfo.title : null,
        subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : null,
        authors: book.volumeInfo.authors ? book.volumeInfo.authors : null,
        description: book.volumeInfo.description ? book.volumeInfo.description : null,
        image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null
    }))
}
