
// creiamo un oggetto MongoClient richimamndolo dal modulo
const { MongoClient } = require('mongodb');
//impostaimo l'url di connessione al db sul server di mongo
const url = "mongodb://localhost:27017/mydb";
const express = require('express');
const app = express();
app.set('views', './views')
app.set('view engine', 'pug')
// Middleware per gestire i dati del form
app.use(express.urlencoded({ extended: true }));


lista = []
async function select() {
    let client;
  
    try {
      client = await MongoClient.connect(url);
  
      // Accesso al database
      const db = client.db("mydb");
  
      const cursor = db.collection('TabellaPc').find();
  
      while (await cursor.hasNext()) {
          lista.push(await cursor.next())
          
        }
      
      
  
    } catch (err) {
      console.error("Errore nella connessione al database:", err);
    } finally {
      if (client) {
        await client.close();
      }
    }
   
  }
  
  

app.get('/', async function (req, res) {
  lista = []
   await select();

    


  
    res.render('stampa', { lista: lista});
  });

  app.get('/form', function (req, res) {
    res.render('formPc');
  });

  app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});

app.post("/buy", function(req, res){
  let num = req.body.num
  listaAcquisti = []
  listaPezzi = []
  somma = 0
  for (let i = 0; i < lista.length; i++) {
    if (num[i] != 0) {
    //console.log("Hai acquistato" + lista[i].nome)
    //console.log("In " + num[i] + "pezzi")
    listaAcquisti.push(lista[i])
    listaPezzi.push(num[i])
    somma += lista[i].prezzo * num[i]
  }}
  res.render('recap', { lista: listaAcquisti, listaN: listaPezzi, somma: somma }); 
  })

app.post("/submit", function (req, res) {
    
  let nome = req.body.nome
  let marca = req.body.marca
  let descr = req.body.descrizione
  let urlImg = req.body.url
  let prezzo = parseInt(req.body.prezzo)
  async function insert() {
    let client;
  
    try {
      client = await MongoClient.connect(url);
  
      // Accesso al database
      const db = client.db("mydb");
  
      var pc = { nome: nome, marca: marca, descrizione: descr, url: urlImg, prezzo: prezzo };
      const result = await db.collection("TabellaPc").insertOne(pc);
      console.log("1 document inserted", result.insertedId);
  
    } catch (err) {
      console.error("Errore nella connessione al database:", err);
    } finally {
      if (client) {
        await client.close();
      }
    }
  }
  
   insert();

  
  
  res.send("Pc aggiunto con successo")

})

