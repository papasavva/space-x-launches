import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './schema'

import formatter from './helpers/formatter'
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
    console.log(`${formatter.rightPad('Application:')} SpaceX Launches`)
    console.log(`${formatter.rightPad('Url:')} http://localhost:4000/`)
    console.log(`${formatter.rightPad('GraphQLi:')} http://localhost:4000/graphql`)
    console.log(`${formatter.rightPad('Status:')} Up and Running 🚀`)
})
