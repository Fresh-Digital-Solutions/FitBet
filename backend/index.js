const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors());

const PORT = process.env.port || 4000;


app.listen(PORT, () => console.log(`server running on port ${PORT}`));
