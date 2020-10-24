import { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } from 'graphql'
import axios from 'axios'

export class Schema {
    private static instance: Schema

    // Launch Type
    private LaunchType = new GraphQLObjectType({
        name: 'Launch',
        fields: () => ({
            flight_number: { type: GraphQLInt },
            mission_name: { type: GraphQLString },
            launch_year: { type: GraphQLString },
            launch_date_local: { type: GraphQLString },
            launch_success: { type: GraphQLBoolean },
            rocket: { type: this.RocketType },
        }),
    })

    // Rocket Type
    private RocketType = new GraphQLObjectType({
        name: 'Rocket',
        fields: () => ({
            rocket_id: { type: GraphQLString },
            rocket_name: { type: GraphQLString },
            rocket_type: { type: GraphQLString },
        }),
    })

    // Root Query
    private RootQuery = new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            launches: {
                type: new GraphQLList(this.LaunchType),
                resolve(parent, args) {
                    return axios.get('https://api.spacexdata.com/v3/launches').then((res) => res.data)
                },
            },

            launch: {
                type: this.LaunchType,
                args: {
                    flight_number: { type: GraphQLInt },
                },
                resolve(parent, args) {
                    return axios
                        .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
                        .then((res) => res.data)
                },
            },
        },
    })

    private schema: GraphQLSchema = new GraphQLSchema({
        query: this.RootQuery,
    })

    static get(): GraphQLSchema {
        if (!Schema.instance) {
            Schema.instance = new Schema()
        }
        return Schema.instance.schema
    }
}
