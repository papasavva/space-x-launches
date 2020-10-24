import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './schema'

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
    console.log(`Server started on port ${PORT}`)
})
