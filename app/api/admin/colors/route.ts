import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const colors = await prisma.color.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(colors);
  } catch (error) {
    console.error('Error fetching colors:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 