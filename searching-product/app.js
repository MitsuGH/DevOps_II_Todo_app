const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');


const app = express();


const PORT = 3000;


//Mysql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'MitsuSQL5847',
    database: 'product',
    port: '3306'
});


db.connect((err) => {
    if (err) throw err;
    console.log('connection to Mysql database');
});


//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


//Route
app.get('/',(req, res) => {
    res.render('index', {product: [], query: '' })
})


app.post('/search', (req, res) => {
    const query = req.body.query;
    const sql = `SELECT * FROM product WHERE name LIKE ? or description LIKE ?`; //Like is mean path of data and use with %%


    db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) throw err;
        res.render('index', { product: results, query: query });
    });
});


app.get('/add', (req, res) => {
    res.render('add-product');
});


app.post('/add-product', (req,res) => {
    const{pname,price,desc} = req.body;
    const sql =`INSERT INTO product (name,price,description) values (?,?,?)`;
    db.query(sql,[pname,price,desc], (err,results) => {
        if (err) throw err;
        console.log("Product added", results);
        res.redirect('/');
    });
});


//Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
