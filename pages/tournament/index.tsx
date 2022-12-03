import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import React from 'react';
import { prisma } from '../../lib/db'

function TournamentHomePage({ tournaments }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const tournamentList = tournaments.map((tournament)=>
        <li key={tournament.id}><Link href={`/tournament/${tournament.id}/dashboard`}>{`${tournament.name}@${tournament.location}`}</Link></li>
    )
    console.log(tournamentList)
    return <>
        <h2>Tournaments</h2>
        <ul>
            {tournamentList}
        </ul>
    </>
}


export const getServerSideProps = async (_: any) => {
    const tournaments = await prisma.tournament.findMany()
    
    return {
        props: {
            tournaments: tournaments
        }
    }
}
export default TournamentHomePage
