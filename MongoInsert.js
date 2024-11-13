const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/mydb";

async function run() {
  let client;

  try {
    client = await MongoClient.connect(url);

    // Accesso al database
    const db = client.db("mydb");

    var myobj = { name: "Company Inc", address: "Highway 37" };
    const result = await db.collection("mycollection").insertOne(myobj);
    console.log("1 document inserted", result.insertedId);

  } catch (err) {
    console.error("Errore nella connessione al database:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

run();

