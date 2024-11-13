const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/mydb";

async function run() {
  let client;

  try {
    client = await MongoClient.connect(url);
    console.log("Database creato!");

    // Accesso al database
    const db = client.db("mydb");

    // Creazione di una collezione
    const result = await db.createCollection("mycollection1");
    console.log("Collezione creata!", result.collectionName);
  } catch (err) {
    console.error("Errore nella connessione al database:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

run();

