require('dotenv').config()
const express = require("express")
const app = express()

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

app.use(express.json())

const users = []

app.get("/users", (req, res) => {
    res.json(users)
})

app.post("/users", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {name: req.body.name, password: hashedPassword}
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post("/token", (req, res) => {
    const refreshToken = req.body.token
})

app.post("/users/login", async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if ( user == null ) {
        return res.status(400).send("Cannot find user")
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)) {
            // res.send("Success")
            const username = req.body.name

            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            res.json({ accessToken: accessToken, refreshToken: refreshToken })
        } else {
            res.send("Incorrect Password")
        }
    } catch {
        return res.status(500).send()
    }
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

app.listen(4000)