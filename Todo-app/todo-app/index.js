const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//setting middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); //server static file (css)
app.set('view engine', 'ejs'); //set ejs

let todos = []; //array to store todos

//Define a route
app.get('/', (req,res) => {
    res.render('index', {todos});
});

app.post('/add', (req,res) => {
    const newTodo = req.body.todo;
    if (newTodo) todos.push(newTodo); // Add new tasks
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const index = req.body.index;
    if (index !== undefined && index >= 0 && index < todos.length) {
        todos.splice(index, 1); // Remove task at the specified index
    }
    res.redirect('/');
});

//start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);

});