const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

const PORT = 3000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MitsuSQL5847',
    database: 'product',
    port: '3306'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { product: [], query: '' });
});

app.post('/search', (req, res) => {
    const query = req.body.query;
    const sql = `SELECT * FROM products WHERE name LIKE ? OR description LIKE ?`;

    db.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
        if (err) throw err;
        res.render('index', { product: results, query: query });
    });
});

app.get('/add', (req, res) => {
    res.render('add-product');
});

app.post('/add', (req, res) => {
    const { name, price, description } = req.body;
    const sql = `INSERT INTO products (name, price, description) VALUES (?, ?, ?)`;

    db.query(sql, [name, price, description], (err, results) => {
        if (err) throw err;
        console.log("Product added", results);
        res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM products WHERE id = ?`;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(404).send('Product not found');
        }

        res.render('edit', { product: results[0] });
    });
});

app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const sql = `UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?`;

    db.query(sql, [name, price, description, id], (err, result) => {
        if (err) throw err;
        console.log("Product updated", result);
        res.redirect('/');
    });
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        console.log("Product deleted", result);
        res.redirect('/');
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
