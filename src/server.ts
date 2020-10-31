import express, { Request, Response } from 'express'
import { graphqlHTTP } from 'express-graphql'
import { Schema } from './schema'
import cors from 'cors'
import path from 'path'
import { rightPad } from './helpers/formatter'

const application = express()

//Application-level middleware
application.use(
    '/graphql',
    graphqlHTTP({
        schema: Schema.get(),
        graphiql: true,
    }),
)
application.use(express.static('public'))
application.use(cors())

application.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = 5000
application.listen(PORT, () => {
    console.log(`${rightPad('Application:')} SpaceX Launches`)
    console.log(`${rightPad('GraphQLi:')} http://localhost:5000/graphql`)
    console.log(`${rightPad('Status:')} Up and Running 🚀`)
})
