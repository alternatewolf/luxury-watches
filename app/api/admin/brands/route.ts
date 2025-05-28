import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(brands);
  } catch (error) {
    console.error('Error fetching brands:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 