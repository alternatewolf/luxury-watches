import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    // Fetch all reference data in parallel
    const [
      brands,
      materials,
      colors,
      watchStyles,
      claspTypes,
      complications,
      conditionsResult,
      yearsResult
    ] = await Promise.all([
      prisma.brand.findMany({ orderBy: { name: 'asc' } }),
      prisma.material.findMany({ orderBy: { name: 'asc' } }),
      prisma.color.findMany({ orderBy: { name: 'asc' } }),
      prisma.watchStyle.findMany({ orderBy: { name: 'asc' } }),
      prisma.claspType.findMany({ orderBy: { name: 'asc' } }),
      prisma.complication.findMany({ orderBy: { name: 'asc' } }),
      prisma.product.findMany({
        where: { 
          status: 'PUBLISHED',
          condition: { not: null }
        },
        select: { condition: true },
        distinct: ['condition'],
      }),
      prisma.product.findMany({
        where: { 
          status: 'PUBLISHED',
          yearOfManufacture: { not: null }
        },
        select: { yearOfManufacture: true },
        distinct: ['yearOfManufacture'],
      })
    ]);

    // Process conditions and years
    const conditions = conditionsResult.map(p => p.condition).filter(Boolean);
    const manufacturingYears = yearsResult
      .map(p => p.yearOfManufacture)
      .filter((year): year is string => year !== null)
      .sort((a, b) => parseInt(b) - parseInt(a));

    // Define static options
    const boxOptions = ['ORIGINAL', 'GENERIC', 'NONE'];
    const papersOptions = ['ORIGINAL', 'GENERIC', 'SERVICE_PAPERS', 'WARRANTY_CARD', 'NONE'];

    // Set cache headers for 1 hour
    const response = NextResponse.json({
      brands,
      materials,
      colors,
      watchStyles,
      claspTypes,
      complications,
      conditions,
      manufacturingYears,
      boxOptions,
      papersOptions,
    });

    response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
    return response;
  } catch (error) {
    console.error('Error fetching reference data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 