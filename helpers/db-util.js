import { MongoClient } from 'mongodb';


const url = "mongodb+srv://keotshepilemaje:nVCJ7dMNuoBz7GZp@cluster0.kzc6f8t.mongodb.net/?retryWrites=true&w=majority"


export async function connectToDb() {
  const client = await MongoClient.connect(url);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db('events');

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db('events');

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}