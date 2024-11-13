var mysql = require('mysql2');
const express = require('express');
const app = express();
app.set('views', './views')
app.set('view engine', 'pug')


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ilfoggia1",
  database: "mydb",
  
});
lista = []



// Middleware per gestire i dati del form
app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM tabellapc", function (err, result) {
      if (err) throw err;
      
      lista = result;
      console.log(lista);
    });
  });
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
  console.log(num)

  for (let i = 0; i < lista.length; i++) {
    if (num[i] != 0) {
    console.log("Hai acquistato" + lista[i].nome)
    console.log("In " + num[i] + "pezzi")
  }}
  res.send("ok") 
  })

app.post("/submit", function (req, res) {
  let nome = req.body.nome
  let marca = req.body.marca
  let descr = req.body.descrizione
  let url = req.body.url
  let prezzo = parseInt(req.body.prezzo)
  

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO tabellapc (nome, marca, descrizione, prezzo, url, qntMagazzino, qntVenduti ) VALUES (?,?,?,?,?,?,?)";
    
    con.query(sql, [nome, marca, descr, prezzo, url, 30, 0 ] ,function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
  
  res.send("Ok")

})