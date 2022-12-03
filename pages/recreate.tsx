import React from 'react';
import recreateTest from '../dev/regenerateDatabase'

function Recreate() {

    return <div>Recreated!</div>
}
export const getServerSideProps = async (_: any) => {
    await recreateTest();
    return {
        props: {}
    }
}
export default Recreate
