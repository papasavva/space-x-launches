import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './schema'

import { rightPad } from './helpers/formatter'
const application = express()

application.use(
    '/graphql',
    graphqlHTTP({
        schema: Schema.get(),
        graphiql: true,
    }),
)

const PORT = 4000
application.listen(PORT, () => {
    console.log(`${rightPad('Application:')} SpaceX Launches`)
    console.log(`${rightPad('GraphQLi:')} http://localhost:4000/graphql`)
    console.log(`${rightPad('Status:')} Up and Running 🚀`)
})
