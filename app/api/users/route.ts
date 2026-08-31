import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || typeof body.name !== 'string' || body.name.length < 3) {
      return NextResponse.json(
        { error: 'Name is required and must be at least 3 characters.' },
        { status: 400 }
      );
    }
    if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required.' },
        { status: 400 }
      );
    }

    const newUser = {
      id: Math.floor(Math.random() * 1000) + 11,
      name: body.name,
      email: body.email,
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }
}

