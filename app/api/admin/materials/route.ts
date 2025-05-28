import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const materials = await prisma.material.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 