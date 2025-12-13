```javascript
const express = require("express");
const fs = require('fs');

const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({message: "All fields required"});
    }

    const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

    const isUserExist = data.find(user => user.email === email);

    if(isUserExist) {
        return res.status(400).json({message: "User already exist"});
    }
    data.push(req.body);

    fs.writeFileSync('./db.json', JSON.stringify(data));

    res.status(200).json({message: "User registered successfully..."});
})

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "All fields required..."});
    }

    const data = JSON.parse(fs.readFileSync('./db.json', 'utf-8'));

    const user = data.find(user => user.email === email);

    if(!user){
        return res.status(400).json({message: 'Email not exist...'});
    }

    if(user.password !== password){
        return res.status(400).json({message: "password is incorrect...."});
    }

    res.status(200).json({message: 'Logged in successfully....'})

})

app.listen(3000, () => {
  console.log("Server started...");
});

```
