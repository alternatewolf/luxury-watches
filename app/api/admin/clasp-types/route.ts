import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const claspTypes = await prisma.claspType.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(claspTypes);
  } catch (error) {
    console.error('Error fetching clasp types:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 