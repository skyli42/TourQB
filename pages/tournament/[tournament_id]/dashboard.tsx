import React from 'react';
import TDHome from '../../../lib/components/TDHome';
import { useRouter } from 'next/router';

function TDDashboard() {
    const router = useRouter();

    //TODO: Replace with database/API call
    const { tournament_id } = router.query
    const tournamentLocation = 'Online'


    if (tournament_id !== undefined && typeof (tournament_id) !== 'object')
        return <TDHome tournamentLocation={tournamentLocation} tournamentName={tournament_id} />
    else
        return <div>Tournament {tournament_id} does not exist</div>
}

export default TDDashboard
