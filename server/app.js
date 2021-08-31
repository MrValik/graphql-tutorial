const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')


// GraphQL
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')


dotenv.config()

const app = express()


// Middlewares
app.use(cors({
  path: 'http://localhost:3000'
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// schema
const schemaFile = fs.readFileSync(path.join(__dirname, 'graphql/schema.gql'), { encoding: 'utf-8' })
const schema = buildSchema(schemaFile)

// root
const root = require('./graphql/root')


// connect graphql
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
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