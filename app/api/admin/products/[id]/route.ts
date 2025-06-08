import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        brand: true,
        images: {
          orderBy: {
            isPrimary: 'desc'
          }
        },
        complications: true,
        watchStyle: true,
        caseMaterial: true,
        dialColor: true,
        crystalMaterial: true,
        bezelMaterial: true,
        braceletStrapMaterial: true,
        braceletStrapColor: true,
        claspType: true
      }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Transform the product data to match the frontend expectations
    const transformedProduct = {
      ...product,
      price: product.price.toString(),
      discountPrice: product.discountPrice?.toString(),
      caseDiameterMm: product.caseDiameterMm?.toString(),
      caseThicknessMm: product.caseThicknessMm?.toString(),
      lugWidthMm: product.lugWidthMm?.toString(),
      numberOfJewels: product.numberOfJewels?.toString(),
      purchaseYear: product.purchaseYear?.toString(),
      complications: product.complications.map(c => c.name),
      certifications: product.certifications || []
    };

    const response = NextResponse.json(transformedProduct);
    
    // Set cache headers for 5 minutes
    response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    
    return response;
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Remove fields that shouldn't be updated directly
    const {
      complications,
      certifications,
      brand,
      images,
      watchStyle,
      caseMaterial,
      dialColor,
      crystalMaterial,
      bezelMaterial,
      braceletStrapMaterial,
      braceletStrapColor,
      claspType,
      createdAt,
      updatedAt,
      ...updateFields
    } = body;

    // Transform the data back to database format
    const updateData = {
      ...updateFields,
      price: parseFloat(updateFields.price),
      discountPrice: updateFields.discountPrice ? parseFloat(updateFields.discountPrice) : null,
      caseDiameterMm: updateFields.caseDiameterMm ? parseFloat(updateFields.caseDiameterMm) : null,
      caseThicknessMm: updateFields.caseThicknessMm ? parseFloat(updateFields.caseThicknessMm) : null,
      lugWidthMm: updateFields.lugWidthMm ? parseInt(updateFields.lugWidthMm) : null,
      numberOfJewels: updateFields.numberOfJewels ? parseInt(updateFields.numberOfJewels) : null,
      purchaseYear: updateFields.purchaseYear ? parseInt(updateFields.purchaseYear) : null,
      stockQuantity: parseInt(updateFields.stockQuantity) || 0,
      isFeatured: Boolean(updateFields.isFeatured)
    };

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...updateData,
        certifications: certifications || [],
        complications: {
          set: [], // Clear existing complications
          connectOrCreate: complications?.map((name: string) => ({
            where: { name },
            create: { name }
          })) || []
        }
      },
      include: {
        brand: true,
        complications: true
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 