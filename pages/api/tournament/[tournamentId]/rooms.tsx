import { NextApiRequest, NextApiResponse } from 'next';
import React from 'react';
const fs = require('fs');
const path = require('path');

//TODO: make custom types
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tournamentId } = req.query

    if (req.method === "GET") {
        console.log(`Getting rooms for ${tournamentId}`);
        //TODO: Replace with actual database call
        const filepath: string = path.resolve(__dirname, "../../../../../../db/rooms.txt");
        const data: string = (await fs.promises.readFile(filepath)).toString();
        const roomsJSON = { rooms: data.split(",") };
        res.status(200).json(roomsJSON)
    }
    else if (req.method === "POST") {
        console.log(`Updating rooms for ${tournamentId}`);
        const body = JSON.parse(req.body)
        //TODO: Replace with actual database call
        const outStr: string = body.newRooms.join(",");
        const filepath: string = path.resolve(__dirname, "../../../../../../db/rooms.txt");
        await fs.promises.writeFile(filepath, outStr);
        res.status(200).json({ rooms: body.newRooms });
    }
    else {
        res.status(405).send({ message: 'Invalid request option' });
    }

}
