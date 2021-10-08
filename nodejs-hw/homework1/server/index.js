const express = require('express');
const fileRouter = require('./routes/file.routes');

const app = express();

app.use(express.json());
app.use('/', fileRouter);

app.get('/', (req, res) => {
    res.status(200).json({message: "Start page here"});
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});