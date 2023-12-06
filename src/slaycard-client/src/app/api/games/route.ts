import { NextResponse } from "next/server";
import data from '@/data.json'
import { v4 } from 'uuid'

type GameData = {
    id: String
    name: String
    description?: String
}

export async function GET() {
    return NextResponse.json([
        {data: 'dope'},
        {data: 'ex'},
    ])
}

const games: GameData[] = [
    {
        id: "ran",
        name: 'Game X',
        description: 'Dope game'
    }
]

export async function POST(request : Request) {
    var body = await request.json()
    if (!body.title || !body.description)
        return NextResponse.error()

    games.push({
        id: v4(),
        name: body.title,
        description: body.description
    }) 

    NextResponse.json(
        { status: 200, }
    )
}
