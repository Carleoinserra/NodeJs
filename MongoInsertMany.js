const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/mydb";

async function run() {
  let client;

  try {
    client = await MongoClient.connect(url);

    // Accesso al database
    const db = client.db("mydb");

    var myobjC = [{ name: "Apple", address: "Via Roma" },{name: "Microsoft", address: "Via Roma" } ];
    const result = await db.collection("mycollection").insertMany(myobjC);
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

