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
const users = [
    {
        user: 'test1',
        id: '001',
        email: 'test123@gmail.com'
    },
    {
        user: 'test2',
        id: '002',
        email: 'test2@gmail.com'
    },
    {
        user: 'test3',
        id: '003',
        email: 'test3@gmail.com'
    }
]
const data =[]
let latestId =0
app.post('/register', (req, res) => {
    try {
        const {name, email, mobile, password} = req.body
        if(!name || !email || !mobile || ![password]) {
            return res.status(400).json({error: 'mandatory fields required'})
        }
        latestId++
        const user = {...req.body, latestId}
        data.push(user)
        return res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e)
    }
})

app.post('/login', (req,res) => {
    console.log('BODY::', req.body)
    const {email, password} = req.body
    if (!email || !password) {
       return res.status(400).json({error: 'all fileds are required'})
    }
    const userData = data.find(val => val.email == email)
    if (userData) {
        return res.json(userData)
    }
    return res.status(400).json({error: 'User not found'})
})

app.listen(1234, ()=> {
    console.log('server is running... 12')
})