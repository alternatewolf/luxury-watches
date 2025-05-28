import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        brand: true,
        images: {
          orderBy: {
            isPrimary: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform the data to ensure proper serialization
    const transformedProducts = products.map(product => ({
      ...product,
      price: product.price.toString(),
      discountPrice: product.discountPrice?.toString(),
      caseDiameterMm: product.caseDiameterMm?.toString(),
      caseThicknessMm: product.caseThicknessMm?.toString()
    }));

    return NextResponse.json(transformedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 