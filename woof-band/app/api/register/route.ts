import { NextResponse } from 'next/server';
import { nextTick } from 'process';

export async function POST(request: Request) {
    const data = await request.json();

    console.log('Received data in ./app/api/register', data);

    return NextResponse.json({ message: 'User registered successfully' });
}