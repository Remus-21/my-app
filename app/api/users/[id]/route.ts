import { NextRequest, NextResponse } from 'next/server';
import { getUserById } from '../../../lib/userStore';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_req: NextRequest, ctx: RouteContext) {
  try {
    const { id } = await ctx.params;
    const numId = Number(id);

    if (isNaN(numId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const user = await getUserById(numId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('GET /api/users/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params;
  const numId = Number(id);

  if (isNaN(numId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const body = await req.json();
    if (!body.name && !body.email) {
      return NextResponse.json(
        { error: 'Please provide name or email to update' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      id: numId,
      name: body.name || 'Updated User',
      email: body.email || 'updated@example.com',
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params;
  const numId = Number(id);

  if (isNaN(numId)) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  return NextResponse.json({ message: `User ${numId} successfully deleted.` });
}
