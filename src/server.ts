import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './schema'
import cors from 'cors'

import { rightPad } from './helpers/formatter'
const application = express()

application.use(cors())
application.use(
    '/graphql',
    graphqlHTTP({
        schema: Schema.get(),
        graphiql: true,
    }),
)

const PORT = 5000
application.listen(PORT, () => {
    console.log(`${rightPad('Application:')} SpaceX Launches`)
    console.log(`${rightPad('GraphQLi:')} http://localhost:5000/graphql`)
    console.log(`${rightPad('Status:')} Up and Running 🚀`)
})
