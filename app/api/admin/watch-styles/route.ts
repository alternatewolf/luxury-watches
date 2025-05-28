import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const watchStyles = await prisma.watchStyle.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(watchStyles);
  } catch (error) {
    console.error('Error fetching watch styles:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 