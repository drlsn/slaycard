import data from '@/data.json'
import { NextResponse } from 'next/server'

export async function GET(request:Request, context: any) {
    const { params } = context
    const game = data.find(x => params.gameId == x.gameId)
    
    return NextResponse.json({game})
}
