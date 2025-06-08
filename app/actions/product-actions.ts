'use server'

import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

async function findOrCreateMaterial(name: string) {
  if (!name) return null;
  
  let material = await prisma.material.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });

  if (!material) {
    material = await prisma.material.create({
      data: { name }
    });
  }

  return material;
}

async function findOrCreateColor(name: string) {
  if (!name) return null;
  
  let color = await prisma.color.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });

  if (!color) {
    color = await prisma.color.create({
      data: { name }
    });
  }

  return color;
}

export async function createProduct(data: any) {
  try {
    const existingProduct = await prisma.product.findFirst({
      where: {
        modelNumber: data.modelNumber
      }
    });

    if (existingProduct) {
      return {
        success: false,
        error: `A product with model number ${data.modelNumber} already exists. Please use a different model number.`
      };
    }

    let sku = data.sku;
    if (!sku) {
      const brandPrefix = data.brandId.substring(0, 3).toUpperCase();
      sku = `${brandPrefix}-${data.modelNumber}`;
    }

    const existingSku = await prisma.product.findFirst({
      where: {
        sku: sku
      }
    });

    if (existingSku) {
      const timestamp = new Date().getTime().toString().slice(-4);
      sku = `${sku}-${timestamp}`;
    }

    let brand = await prisma.brand.findFirst({
      where: {
        name: {
          equals: data.brandId,
          mode: 'insensitive'
        }
      }
    });

    if (!brand) {
      brand = await prisma.brand.create({
        data: {
          name: data.brandId
        }
      });
    }

    let watchStyle = null;
    if (data.watchStyleId) {
      watchStyle = await prisma.watchStyle.findFirst({
        where: {
          name: {
            equals: data.watchStyleId,
            mode: 'insensitive'
          }
        }
      });

      if (!watchStyle) {
        watchStyle = await prisma.watchStyle.create({
          data: {
            name: data.watchStyleId
          }
        });
      }
    }

    const [
      caseMaterial,
      crystalMaterial,
      bezelMaterial,
      braceletStrapMaterial,
      dialColor,
      braceletStrapColor
    ] = await Promise.all([
      findOrCreateMaterial(data.caseMaterialId),
      findOrCreateMaterial(data.crystalMaterialId),
      findOrCreateMaterial(data.bezelMaterialId),
      findOrCreateMaterial(data.braceletStrapMaterialId),
      findOrCreateColor(data.dialColorId),
      findOrCreateColor(data.braceletStrapColorId)
    ]);

    const product = await prisma.product.create({
      data: {
        name: data.name,
        brandId: brand.id,
        modelNumber: data.modelNumber,
        sku: sku,
        descriptionShort: data.descriptionShort,
        descriptionLong: data.descriptionLong,
        price: new Prisma.Decimal(data.price),
        discountPrice: data.discountPrice ? new Prisma.Decimal(data.discountPrice) : null,
        currency: data.currency || "USD",
        gender: data.gender,
        watchStyleId: watchStyle?.id,
        collectionSeries: data.collectionSeries,
        caseMaterialId: caseMaterial?.id,
        caseMaterialDetails: data.caseMaterialDetails,
        caseDiameterMm: data.caseDiameterMm ? new Prisma.Decimal(data.caseDiameterMm) : null,
        caseThicknessMm: data.caseThicknessMm ? new Prisma.Decimal(data.caseThicknessMm) : null,
        caseShape: data.caseShape,
        caseBack: data.caseBack,
        waterResistanceM: data.waterResistanceM,
        dialColorId: dialColor?.id,
        dialTypeMarkers: data.dialTypeMarkers,
        dialDetails: data.dialDetails,
        crystalMaterialId: crystalMaterial?.id,
        crystalFeatures: data.crystalFeatures,
        bezelMaterialId: bezelMaterial?.id,
        bezelType: data.bezelType,
        bezelDescription: data.bezelDescription,
        braceletStrapMaterialId: braceletStrapMaterial?.id,
        braceletStrapColorId: braceletStrapColor?.id,
        braceletStyleDescription: data.braceletStyleDescription,
        claspTypeId: data.claspTypeId || null,
        claspDetails: data.claspDetails,
        lugWidthMm: data.lugWidthMm ? parseInt(data.lugWidthMm) : null,
        crownDetails: data.crownDetails,
        movementType: data.movementType || null,
        movementCaliber: data.movementCaliber,
        powerReserveHours: data.powerReserveHours,
        numberOfJewels: data.numberOfJewels ? parseInt(data.numberOfJewels) : null,
        condition: data.condition || null,
        yearOfManufacture: data.yearOfManufacture,
        purchaseYear: data.purchaseYear ? parseInt(data.purchaseYear) : null,
        box: data.box || 'NONE',
        papers: data.papers || 'NONE',
        warrantyDetails: data.warrantyDetails,
        certifications: data.certifications ? data.certifications.split(',').map((cert: string) => cert.trim()).filter(Boolean) : [],
        countryOfOrigin: data.countryOfOrigin,
        manufacturerDetails: data.manufacturerDetails,
        packerDetails: data.packerDetails,
        importerDetails: data.importerDetails,
        videoUrl: data.videoUrl,
        stockQuantity: parseInt(data.stockQuantity) || 0,
        availabilityStatus: data.availabilityStatus || 'IN_STOCK',
        isFeatured: data.isFeatured === 'true' || data.isFeatured === true,
        status: data.status || 'PUBLISHED',
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      },
    });

    if (data.complications && data.complications.length > 0) {
      const complicationNames = typeof data.complications === 'string' 
        ? data.complications.split(',').map((name: string) => name.trim()).filter(Boolean)
        : data.complications;

      if (complicationNames.length > 0) {
        const complications = await Promise.all(
          complicationNames.map(async (name: string) => {
            let complication = await prisma.complication.findFirst({
              where: {
                name: {
                  equals: name,
                  mode: 'insensitive'
                }
              }
            });

            if (!complication) {
              complication = await prisma.complication.create({
                data: { name }
              });
            }

            return complication;
          })
        );

        await prisma.product.update({
          where: { id: product.id },
          data: {
            complications: {
              connect: complications.map(comp => ({ id: comp.id })),
            },
          },
        });
      }
    }

    if (data.images && data.images.length > 0) {
      const imagesData = data.images.map((image: any, index: number) => ({
        url: image.url,
        thumbImg: image.thumbImg,
        hoverImg: image.hoverImg,
        coverImg: image.coverImg,
        altText: image.altText || product.name,
        isPrimary: index === 0,
        order: index,
      }));

      await prisma.$transaction(
        imagesData.map((img: any) => 
          prisma.productImage.create({
            data: {
              ...img,
              productId: product.id,
            }
          })
        )
      );
    }

    return { success: true, product };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: error };
  }
}

export const getProductReferenceData = unstable_cache(
  async () => {
    try {
      const [
        brands,
        conditionsResult,
        yearsResult,
      ] = await Promise.all([
        prisma.brand.findMany({ 
          orderBy: { name: 'asc' },
          select: { id: true, name: true }
        }),
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
        }),
      ]);

      const conditions = conditionsResult.map(p => p.condition).filter(Boolean);
      const manufacturingYears = yearsResult
        .map(p => p.yearOfManufacture)
        .filter((year): year is string => year !== null)
        .sort((a, b) => parseInt(b) - parseInt(a));

      const boxOptions = ['ORIGINAL', 'GENERIC', 'NONE'];
      const papersOptions = ['ORIGINAL', 'GENERIC', 'SERVICE_PAPERS', 'WARRANTY_CARD', 'NONE'];

      return {
        brands,
        conditions,
        manufacturingYears,
        boxOptions,
        papersOptions,
      };
    } catch (error) {
      console.error('Error fetching reference data:', error);
      throw error;
    }
  },
  ['product-reference-data'],
  { revalidate: 3600 }
);

export const getProductBySlug = unstable_cache(
  async (id: string) => {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          brand: {
            select: { name: true },
          },
          watchStyle: {
            select: { name: true },
          },
          caseMaterial: {
            select: { name: true },
          },
          dialColor: {
            select: { name: true },
          },
          crystalMaterial: {
            select: { name: true },
          },
          bezelMaterial: {
            select: { name: true },
          },
          braceletStrapMaterial: {
            select: { name: true },
          },
          braceletStrapColor: {
            select: { name: true },
          },
          claspType: {
            select: { name: true },
          },
          complications: {
            select: { name: true },
          },
          images: true,
        },
      });

      if (!product) return null;

      return {
        ...product,
        price: product.price.toString(),
        discountPrice: product.discountPrice?.toString() || null,
        caseDiameterMm: product.caseDiameterMm?.toString() || null,
        caseThicknessMm: product.caseThicknessMm?.toString() || null,
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },
  ['product-by-slug'],
  { revalidate: 3600 }
);

export const getProductsWithPrimaryImages = unstable_cache(
  async () => {
    try {
      const products = await prisma.product.findMany({
        where: {
          status: 'PUBLISHED',
        },
        include: {
          images: {
            where: {
              isPrimary: true,
            },
            take: 1,
          },
          brand: {
            select: { name: true },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      return products.map((product) => ({
        ...product,
        price: product.price.toString(),
        discountPrice: product.discountPrice?.toString() || null,
        caseDiameterMm: product.caseDiameterMm?.toString() || null,
        caseThicknessMm: product.caseThicknessMm?.toString() || null,
        primaryImageUrl: product.images[0]?.url || null,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
  ['all-products-with-images'],
  { revalidate: 3600 }
);

export const getProductRecommendations = unstable_cache(
  async (product: any, limit: number = 4) => {
    try {
      const recommendations = await prisma.product.findMany({
        where: {
          AND: [
            { id: { not: product.id } },
            { status: 'PUBLISHED' },
            {
              OR: [
                { brandId: product.brandId },
                { gender: product.gender },
                { watchStyleId: product.watchStyleId },
              ],
            },
          ],
        },
        include: {
          brand: {
            select: { name: true },
          },
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
        orderBy: [
          { brandId: 'asc' },
          { gender: 'asc' },
          { watchStyleId: 'asc' },
          { createdAt: 'desc' },
        ],
        take: limit,
      });

      return recommendations.map((product) => ({
        ...product,
        price: product.price.toString(),
        discountPrice: product.discountPrice?.toString() || null,
        caseDiameterMm: product.caseDiameterMm?.toString() || null,
        caseThicknessMm: product.caseThicknessMm?.toString() || null,
      }));
    } catch (error) {
      console.error('Error fetching product recommendations:', error);
      return [];
    }
  },
  ['product-recommendations'],
  { revalidate: 3600 }
);

export const getFilteredProducts = unstable_cache(
  async (filters: any, sort: string, page: number = 1, pageSize: number = 24) => {
    const where: any = {
      status: "PUBLISHED",
    };

    if (filters.brands?.length > 0) {
      where.brandId = { in: filters.brands };
    }

    if (filters.condition?.length > 0) {
      where.condition = { in: filters.condition };
    }

    if (filters.box?.length > 0) {
      where.box = { in: filters.box };
    }

    if (filters.papers?.length > 0) {
      where.papers = { in: filters.papers };
    }

    if (filters.manufacturingYears?.length > 0) {
      where.yearOfManufacture = { in: filters.manufacturingYears };
    }

    const orderBy: any = {};
    switch (sort) {
      case "price_asc":
        orderBy.price = "asc";
        break;
      case "price_desc":
        orderBy.price = "desc";
        break;
      case "newest":
      default:
        orderBy.createdAt = "desc";
        break;
    }

    const skip = (page - 1) * pageSize;
    const totalCount = await prisma.product.count({ where });

    const products = await prisma.product.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        price: true,
        condition: true,
        brand: {
          select: {
            name: true
          }
        },
        images: {
          where: {
            isPrimary: true
          },
          select: {
            url: true
          },
          take: 1
        }
      },
      skip,
      take: pageSize
    });

    return {
      products,
      pagination: {
        total: totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize)
      }
    };
  },
  ['filtered-products'],
  { revalidate: 3600 }
);

export async function deleteProduct(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: true,
        complications: true,
      },
    });

    if (!product) {
      return {
        success: false,
        error: 'Product not found',
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.productImage.deleteMany({
        where: { productId: productId },
      });

      await tx.product.update({
        where: { id: productId },
        data: {
          complications: {
            disconnect: product.complications.map(comp => ({ id: comp.id })),
          },
        },
      });

      await tx.product.delete({
        where: { id: productId },
      });
    });

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (error) {
    console.error('Error deleting product:', error);
    return {
      success: false,
      error: 'Failed to delete product. Please try again.',
    };
  }
} 