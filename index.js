const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;



app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Task management server")
})



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.USER_KEY}@cluster0.ttcu5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const taskCollection = client.db("Task-management").collection("tasks")


    // Task collection
    app.get("/tasks",async(req, res)=>{
        const result = await taskCollection.find().toArray();
        res.send(result)
    })

    app.post("/tasks", async(req, res)=>{
        const task = req.body;
        console.log(task);
        const result = await taskCollection.insertOne(task)
        res.send(result)
    })



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port , ()=>{
    console.log(`Port is running on port ${port}`);
})