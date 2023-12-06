const bodyParser = require('body-parser');
const express = require('express');
const { MongoClient , ObjectId } = require('mongodb');

const app = express();
const port = 3000;

app.get('/data', async (req, res) => {
  try {
    const uri = 'mongodb+srv://mohamedamiin995:Aminzo@cluster0.dhhtifz.mongodb.net/';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const database = client.db('Students');
    const collection = database.collection('demo');

    const documents = await collection.find().toArray();
    console.log(documents);
    res.json(documents);
    
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.use(bodyParser.json());




app.post('/data', async (req, res) => {
  try {
    const uri = 'mongodb+srv://mohamedamiin995:Aminzo@cluster0.dhhtifz.mongodb.net/';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const database = client.db('Students');
    const collection = database.collection('demo');
    console.log("Data" , req.body)
    const data = req.body; // Assuming the request body contains the data to be inserted
    console.log(data);
    // delete data._id;
    const result = await collection.insertOne(data);
    console.log("Result Check ", result.insertedCount);
    console.log("Check ",result)
    if (result == result) {
      
      console.log('Data inserted successfully');
      res.status(201).json({ message: 'Data inserted successfully' });
    } else {
      console.log('Failed to insert data');
      res.status(500).json({ message: 'Failed to insert data' });
    }
    
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.put('/data/:id', async (req, res) => {
  try {
    const uri = 'mongodb+srv://mohamedamiin995:Aminzo@cluster0.dhhtifz.mongodb.net/';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const database = client.db('Students');
    const collection = database.collection('demo');
    console.log('Data', req.body);
    
    const { id } = req.params;
    const data = req.body;
    // delete data._id;
    
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    
    if (result && result.matchedCount === 1) {
      console.log('Data updated successfully');
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      console.log('Failed to update data');
      res.status(500).json({ message: 'Failed to update data' });
    }
    
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});















// Success


app.delete('/data/:id', async (req, res) => {
  try {
    const uri = 'mongodb+srv://mohamedamiin995:Aminzo@cluster0.dhhtifz.mongodb.net/';
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const database = client.db('Students');
    const collection = database.collection('demo');
    
    const { id } = req.params;
    console.log("id",id);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    console.log("result ",result);
    
    if (result && result.deletedCount === 1) {
      console.log('Data deleted successfully');
      res.status(200).json({ message: 'Data deleted successfully' });
    } else {
      console.log('Failed to delete data');
      res.status(500).json({ message: 'Failed to delete data' });
    }
    
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});








app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});