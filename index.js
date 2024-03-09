const express = require('express');
const app = express();
const PORT = 8000;
const users = require('./MOCK_DATA.json');
const fs = require('fs');

app.use(express.urlencoded({ extended: false }));


//getting all users in a html format
app.get('/users', (req, res) => {
    //creating a html user view
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>`;

    res.send(html);
});
//Getting all the users for api 
app.get('/api/users', (req, res) => {
    //response will be in json format
    return res.json(users);
});

//we can write in this way also
app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
}).patch((req, res) => {
    // Getting the id for required user
    const id = Number(req.params.id);
    //finding the user using the id 
    const user = users.find(user => user.id === id);
    //changes of the new body 
    const body = req.body;

    //checking whether the user is available or not
    if (!user) {
        return res.status(404).json({ error: "user not found" });
    }
    if (body.first_name) {
        user.first_name = body.first_name;
    }
    if (body.last_name) {
        user.last_name = body.last_name;
    }
    if (body.email) {
        user.email = body.email;
    }
    if (body.gender) {
        user.gender = body.gender;
    }
    if (body.job_title) {
        user.job_title = body.job_title;
    }
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.status(404).json({status : "Failed"})
        } else {
            return res.status(200).json({ status: "Success" });
        }
    })
    
}).delete((req, res) => {
    //getting the id for deletion 
    const id = Number(req.params.id);
    //Checking whether the user is present or not
    const user = users.find(user => user.id === id);
    //deletion of data using splice method 
    if (user) {
        users.splice(id - 1, 1);
    }
    else {
        res.json({status : "No Record Found"})
    }

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.status(404).json({status : "Failed"})
        } else {
            return res.status(200).json({ status: "Success" });
        }
    })
})

//for post request
app.post('/api/users', (req, res) => {
    const body = req.body;
    let len = users.length + 1;
    //console.log(body);
    users.push({ id : len, ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        if (err) {
            return res.status(404).json({status : "Failed"})
        } else {
            return res.status(200).json({ status: "Success" });
        }
    })
})


//getting the users using id
// app.get('/api/users/:id', (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);
// })
//Above code is written seperately 



app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}/`)
})