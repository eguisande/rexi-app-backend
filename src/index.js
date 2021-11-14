const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');



// Inicialización
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reximysql'
})

db.connect(err => {
    if(err){
        throw err
    }

    console.log("conectado")
})

const app = express();

app.get('/insertUser', (req, res)=> {
    let post = {
        email: 'emguisande@gmail.com',
        password: '1234567',
        terms: true
    }
    let sql = "INSERT INTO usuarios SET ?"
    let query = db.query(sql, post, err => {
        if(err){
            throw err
        }
        res.send("usuario creado")
    })
})

app.get('/getUser', (req, res)=> {
    
    let sql = "SELECT * FROM usuarios"
    let query = db.query(sql, (err, results) => {
        if(err){
            throw err
        }
        res.send(results)
    })
})


// Configuración
app.set('port', process.env.PORT || 4000);


// Midlewares
app.use(morgan('dev'));

// Variables Globales

// Routes
//app.use(require('./routes/routes'))

// Public

// Start Server
app.listen(app.get('port'), () => {
    console.log('Servidor corriendo')
});