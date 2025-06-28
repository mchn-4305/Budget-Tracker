const bcrypt = require("bcrypt")
const jwtUtil = require("../utils/tokenUtils")
const User = require("../models/User")

const register = async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        if (username == null || password == null){
            return res.status(400) //username and/or password required
        }

        const existingUser = await User.findOne({ username })
        if (existingUser != null){
            return res.status(409) //username already exists
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            username: req.body.username, 
            passwordHash: hashedPassword
        })
        await user.save()
        console.log("New user created:", user)
        res.status(201).send()
    } catch (err) {
        console.error("Register error:", err)
        res.status(500).send() //internal server error
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password){
            return res.status(400) //username and/or password required
        }

        const user = await User.findOne({ username })
        if (!user){
            return res.status(401) //invalid credentials
        }

        const pwMatch = await bcrypt.compare(password, user.passwordHash)
        if (!pwMatch){
            return res.status(401) //invalid credentials
        }

        const payload = { userId: user._id, username: user.username }
        const accessToken = jwtUtil.generateAccessToken(payload)
        const refreshToken = jwtUtil.generateRefreshToken(payload)

        user.refreshToken = refreshToken
        await user.save()

        res.json({
            accessToken,
            refreshToken
        })
    } catch (err) {
        console.log(err)
        return res.status(500).send() //internal server error
    }
}

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token
        if (refreshToken == null) { return res.sendStatus(400) }

        const payload  = jwtUtil.verifyRefreshToken(refreshToken)
        const user = await User.findById(payload.userId)
        if (!user || user.refreshToken !== refreshToken) { return res.sendStatus(403) } //forbidden

        const newAccessToken = jwtUtil.generateAccessToken(payload)
        const newRefreshToken = jwtUtil.generateRefreshToken(payload)
        user.refreshToken = newRefreshToken
        await user.save()

        res.json({ accesToken: newAccessToken, refreshToken: newRefreshToken})
    } catch (err) {
        console.log(err)
        return res.sendStatus(403) //invalid token
    }
}

const logout = async (req, res) => {
    try {
        const refreshToken = req.body.token
        if (refreshToken == null) { return res.sendStatus(400) }

        const payload = jwtUtil.verifyRefreshToken(refreshToken)
        const user = await User.findById(payload.userId)
        if (!user || user.refreshToken !== refreshToken) { return res.sendStatus(403) }

        user.refreshToken = null
        await user.save()

        res.json({ message: "Logged out successfully" })
    } catch (err) {
        console.log(err)
        res.status(500)
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    logout
}