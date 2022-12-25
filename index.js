// require file 
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

// intial set up 
const app = express();
const port = process.env.PORT || 5000;

// midleweare 
app.use(cors())
app.use(express.json())

// server run 
app.get('/', (req, res) => {
    res.send('Spinner Tech')
})

app.listen(port, () => {
    console.log('Server running from', port);
})

// mongdb connection uri  
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.sftzz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// mongodb database 
async function run() {
    try {
        await client.connect()
        const spinnertech = client.db('spinnertech');
        const projects = spinnertech.collection('projects');
        console.log('database connect')


    } finally {

    }
}
run().catch(console.dir);
