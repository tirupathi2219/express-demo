const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors({origin: '*'}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/', (req, res) => {
    // console.log('REQ::', req.headers, req.body, req.params)
    res.json('Welcome to Express Server...')
})

const data =[]
let latestId =0
app.post('/register',async (req, res) => {
    try {
        const {name, email, mobile, password} = req.body
        if(!name || !email || !mobile || ![password]) {
            // return res.status(400).json({error: 'mandatory fields required'})
            throw new Error("mandatory fields required")
        }
        latestId++
        const user = {...req.body,id: latestId}
        data.push(user)
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
        return res.status(400).send(e.message)
    }
})

app.get('/users', (req,res) => {
    res.json(data)
})

app.post('/login', (req,res) => {
    try {
        console.log('BODY::', req.body)
        const {email, password} = req.body
        if (!email || !password) {
            throw new Error("mandatory fields required")
        }
        const userData = data.find(val => val.email == email)
        if (userData) {
            return res.json(userData)
        }
        throw new Error('User not found')
    } catch (e) {
        return res.status(400).send(e.message)
    }
})

app.listen(1234, ()=> {
    console.log('server is running... 3412')
})