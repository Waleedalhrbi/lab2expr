import express from "express";

const app = express();
app.use(express.json());

const port = 9000;
let userInfo = [];  
let users = [];  

// GET
app.get('/userInfo', (req, res) => {
    res.json(userInfo);
});

// POST (Signup)
app.post('/signup', (req, res) => {
    const { username, password, age } = req.body;  

   
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }

     
    users.push({ username, password, age });
    res.json({ message: "Signup successful" });
});

// POST (Login)
app.post('/login', (req, res) => {
    const { username, password } = req.body;

   
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Login failed" });  
    }
});

// POST  
app.post('/userInfo', (req, res) => {
    const { name, title, description } = req.body;

    const user = { name, title, description };
    userInfo.push(user);
    res.json(user);
});

// PATCH
app.patch('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, title, description } = req.body;
    const user = userInfo[userId];  

    if (user) {
        user.name = name || user.name;
        user.title = title || user.title;
        user.description = description || user.description;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE
app.delete('/userInfo/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    if (userId >= 0 && userId < userInfo.length) {
        const deletedUser = userInfo.splice(userId, 1);
        res.json(deletedUser);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
