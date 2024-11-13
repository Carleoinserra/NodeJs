const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/mydb";

async function run() {
  let client;

  try {
    client = await MongoClient.connect(url);
    // Accesso al database
    const db = client.db("mydb");

    const query = { name: "Apple" };
const update = { $set: { address: "Via Como" }};

db.collection('mycollection').updateOne(query,  update);

    
    let nome = "Apple"
    const cursor = db.collection('mycollection').find({

        name: nome
    });

    while (await cursor.hasNext()) {
        console.log(await cursor.next());
      }
    
     

  } catch (err) {
    console.error("Errore nella connessione al database:", err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

run();