import express, { Request, Response } from 'express';

// type MyType = {
//     uno: number;
//     due: number;
//     tre?: number;
// };

// const a = {uno: 1, due: 2, tre: 3} as MyType;
const lezione = [
    { id:1, titolo: 'Introduzione a TypeScript', durata: 30 },
    { id:2, titolo: 'Installazione e configurazione', durata: 30 },
    { id:3, titolo: 'Tipi di dati e variabili', durata: 30 },
];

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/api/lezioni', (req: Request, res: Response) => {
  res.json(lezione);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});