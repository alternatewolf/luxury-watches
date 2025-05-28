import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const complications = await prisma.complication.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(complications);
  } catch (error) {
    console.error('Error fetching complications:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 