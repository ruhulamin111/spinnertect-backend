// require file 
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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

        // set project to database 
        app.post('/project', async (req, res) => {
            const project = req.body;
            console.log(project);
            const result = await projects.insertOne(project)
            res.send({ result: result, status: true })
        })

        // get project from database 
        app.get('/project', async (req, res) => {
            const result = await projects.find({}).toArray()
            res.send(result)
        })

        // delete project from database 
        app.delete('/project/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await projects.deleteOne(filter)
            res.send({ result: result, status: true })
        })
        // update project from databse 
        app.put('/project/:id', async (req, res) => {
            const id = req.params.id;
            const project = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: project
            };
            const result = await projects.updateOne(filter, updateDoc, options)
            res.send({ result: result, status: true })
        })


    } finally {

    }
}
run().catch(console.dir);
