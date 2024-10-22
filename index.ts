import { AdminRoute, VandorRoute } from './routes'

import { MONGO_URI } from './configs'
import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', AdminRoute)
app.use('/vandor', VandorRoute)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('DB connection established')
  })
  .catch((err) => console.log(`error: ${err}`))

app.listen(8000, () => {
  // console.clear();
  console.log('App is listening to the port 8000')
})
