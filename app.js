const express = require('express')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

const app = express()


app.get('/api', (req, res) =>{
    res.json({
        message : "Hello world"
    })
})

app.post('/api/posts', verifyToken, (req, res)=>{
    jwt.verify(req.token, 'secretkey', (err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                message : "Posts created...",
                authData
            })
        }
    })
})

app.post('/api/login', (req, res)=>{
    //get the user, in this case we'll skip to getting the user
    const user = {
        id: 1,
        username : "Jimothy5",
        email : "jimothy@gmail.com"
    }
    jwt.sign({user : user}, 'secretkey', (err, token)=>{
        res.json({
            token : token
        })
    })
})

function verifyToken(req, res, next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }
    else{
        res.sendStatus(403)
    }
}

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})