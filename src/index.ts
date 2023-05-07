import express from 'express'
const app=express()
import db  from './db/connect'
import assets from './routes/assets'
import users from './routes/users'
app.use(express.json());

app.listen(5000,()=>console.log('Running on port 5000'))

try{
    db.connect()  
    console.log('Connected to DB')  
}
catch{
    console.log('Failed to connect to DB')
}

app.use('/assets',assets)
app.use('/users',users)

export default app