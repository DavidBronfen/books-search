const express = require('express');
const app = express();
const https = require('https');
const cors = require("cors");
require('dotenv').config();
const PORT = 3000;

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/search-books', (req, res) => {
    const data = [];
    const term = req.query.term;
    const encodedTerm = encodeURI(term);
    const options = {
        hostname: 'www.googleapis.com',
        path: `/books/v1/volumes?q=${encodedTerm}&maxResults=20`,
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

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
})

const getBooksList = (responseObject) => {
    if(responseObject.totalItems === 0) return [];
    return responseObject.items?.map(book => ({
        id: book.id,
        title: book.volumeInfo.title ? book.volumeInfo.title : null,
        subtitle: book.volumeInfo.subtitle ? book.volumeInfo.subtitle : null,
        authors: book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : null,
        description: book.volumeInfo.description ? book.volumeInfo.description : null,
        image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null,
        publishedDate: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : null,
        pageCount: book.volumeInfo.pageCount ? book.volumeInfo.pageCount : null,
        rating: book.volumeInfo.averageRating ? book.volumeInfo.averageRating : null,
    }))
}
