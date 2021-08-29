const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors({
  path: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// graphql
const schema = require('./graphql')


// connect graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))


!(async function() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server has been started on port - ${PORT}`))
  }catch(e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
})()