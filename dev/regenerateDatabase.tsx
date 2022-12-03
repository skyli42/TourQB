import { prisma } from '../lib/db';


async function recreateTest() {
    await prisma.player.deleteMany({});

    await prisma.team.deleteMany({});
    await prisma.school.deleteMany({});
    await prisma.tournament.deleteMany({});
    await prisma.round.deleteMany({});


    const toronto = await prisma.school.create({
        data: {
            name: "Toronto",
            fullName: "University of Toronto",
            location: "Toronto, Ontario"
        }
    });


    const tournament = await prisma.tournament.create({
        data: {
            name: "Test Tournament",
            rooms: ["alpha", "beta"],
            teams: {
                create: [
                    {
                        name: "Toronto A",
                        schoolId: toronto.id,
                        players: {
                            create: [
                                {
                                    name: "Sky Li"
                                },
                                {
                                    name: "Wenying Wu"
                                },
                                {
                                    name: "Raymond Chen"
                                }
                            ]
                        }
                    },
                    {
                        name: "Toronto B",
                        schoolId: toronto.id,
                        players: {
                            create: [
                                {
                                    name: "Ben Deez Nuts"
                                },
                                {
                                    name: "Ian Chow"
                                },
                                {
                                    name: "David Snoddon"
                                },
                                {
                                    name: "Martin Profant"
                                }
                            ]
                        }
                    }
                ]
            },
            numRounds: 10
        }
    })
    console.log(tournament);
}

export default recreateTest;


export { };