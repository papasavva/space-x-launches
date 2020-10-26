import React, { Component, Fragment } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql } from '@apollo/client'

import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'

const LAUNCH_QUERY = gql`
    {
        launches {
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`
export function Launches() {
    const { loading, error, data } = useQuery(LAUNCH_QUERY)

    if (loading) return <h4>Loading...</h4>
    if (error) return <h4>Error</h4>

    return (
        <Fragment>
            <h1 className="display-4 my-3">Launches</h1>
            <MissionKey />
            <Fragment>
                {data.launches.map((launch) => (
                    <LaunchItem key={launch.flight_number} launch={launch} />
                ))}
            </Fragment>
        </Fragment>
    )
}
