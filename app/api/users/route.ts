import { NextRequest, NextResponse } from 'next/server';
import { addUser, getAllUsers } from '../../lib/userStore';

export async function GET() {
  try {
    const users = await getAllUsers();
    console.log('GET /api/users - Returning users:', users);
    return NextResponse.json(users);
  } catch (error) {
    console.error('GET /api/users error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('POST /api/users - Received body:', body);
    
    if (!body.name || typeof body.name !== 'string' || body.name.length < 3) {
      console.log('Validation failed: Invalid name');
      return NextResponse.json(
        { error: 'Name is required and must be at least 3 characters.' },
        { status: 400 }
      );
    }
    if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
      console.log('Validation failed: Invalid email');
      return NextResponse.json(
        { error: 'Valid email is required.' },
        { status: 400 }
      );
    }

    const newUser = await addUser(body.name, body.email);
    console.log('POST /api/users - User created:', newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log('POST /api/users - Error:', error);
    return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
  }
}

