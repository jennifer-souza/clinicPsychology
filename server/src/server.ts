import express from 'express';

const app = express();

app.get('/usuarios', () => {
    console.log('Início de tudo.');
});

app.listen(3306);