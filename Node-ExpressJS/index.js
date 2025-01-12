const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

//setting middleware
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

//Define route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/Profile' , (req, res) => {
    const profile = {
        name: "Sanguansak Sanpen",
        age: 20,
        email: "s6607012662054@email.kmutnb.ac.th"
    }
    res.send(profile);
});

app.post('/user', (req, res) => {
    const {user,pwd} = req.body;
    res.end(`Username: ${user}, Password: ${pwd}`);
});

//Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
