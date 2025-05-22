'use server'

import { PrismaClient, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const prismaClient = new PrismaClient();

async function findOrCreateMaterial(name: string) {
  if (!name) return null;
  
  let material = await prismaClient.material.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });

  if (!material) {
    material = await prismaClient.material.create({
      data: { name }
    });
  }

  return material;
}

async function findOrCreateColor(name: string) {
  if (!name) return null;
  
  let color = await prismaClient.color.findFirst({
    where: {
      name: {
        equals: name,
        mode: 'insensitive'
      }
    }
  });

  if (!color) {
    color = await prismaClient.color.create({
      data: { name }
    });
  }

  return color;
}

export async function createProduct(data: any) {
  try {
    // Check if product with same model number exists
    const existingProduct = await prismaClient.product.findFirst({
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

    // Generate a unique SKU if none is provided
    let sku = data.sku;
    if (!sku) {
      // Generate SKU from brand and model number
      const brandPrefix = data.brandId.substring(0, 3).toUpperCase();
      sku = `${brandPrefix}-${data.modelNumber}`;
    }

    // Check if SKU already exists
    const existingSku = await prismaClient.product.findFirst({
      where: {
        sku: sku
      }
    });

    if (existingSku) {
      // If SKU exists, append a timestamp to make it unique
      const timestamp = new Date().getTime().toString().slice(-4);
      sku = `${sku}-${timestamp}`;
    }

    // First, find or create the brand
    let brand = await prismaClient.brand.findFirst({
      where: {
        name: {
          equals: data.brandId,
          mode: 'insensitive'
        }
      }
    });

    if (!brand) {
      brand = await prismaClient.brand.create({
        data: {
          name: data.brandId
        }
      });
    }

    // Find or create the watch style
    let watchStyle = null;
    if (data.watchStyleId) {
      watchStyle = await prismaClient.watchStyle.findFirst({
        where: {
          name: {
            equals: data.watchStyleId,
            mode: 'insensitive'
          }
        }
      });

      if (!watchStyle) {
        watchStyle = await prismaClient.watchStyle.create({
          data: {
            name: data.watchStyleId
          }
        });
      }
    }

    // Find or create all materials
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

    // Create the base product with all the IDs
    const product = await prismaClient.product.create({
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
        
        // Physical attributes
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
        
        claspTypeId: data.claspTypeId,
        claspDetails: data.claspDetails,
        lugWidthMm: data.lugWidthMm,
        
        crownDetails: data.crownDetails,
        
        // Movement details
        movementType: data.movementType,
        movementCaliber: data.movementCaliber,
        powerReserveHours: data.powerReserveHours,
        numberOfJewels: data.numberOfJewels,
        
        // Condition & Provenance
        condition: data.condition,
        yearOfManufacture: data.yearOfManufacture,
        purchaseYear: data.purchaseYear,
        box: data.box,
        papers: data.papers,
        warrantyDetails: data.warrantyDetails,
        certifications: data.certifications,
        
        // Origin & Manufacturer Info
        countryOfOrigin: data.countryOfOrigin,
        manufacturerDetails: data.manufacturerDetails,
        packerDetails: data.packerDetails,
        importerDetails: data.importerDetails,
        
        // Media
        videoUrl: data.videoUrl,
        
        // Inventory & Status
        stockQuantity: parseInt(data.stockQuantity) || 0,
        availabilityStatus: data.availabilityStatus,
        isFeatured: data.isFeatured === 'true' || data.isFeatured === true,
        status: data.status || 'DRAFT',
        
        // SEO
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-'),
      },
    });

    // Handle complications (many-to-many)
    if (data.complications && data.complications.length > 0) {
      await prismaClient.product.update({
        where: { id: product.id },
        data: {
          complications: {
            connect: data.complications.map((id: string) => ({ id })),
          },
        },
      });
    }

    // Handle images
    if (data.images && data.images.length > 0) {
      const imagesData = data.images.map((image: any, index: number) => ({
        url: image.url,
        thumbImg: image.thumbImg,
        hoverImg: image.hoverImg,
        coverImg: image.coverImg,
        altText: image.altText || product.name,
        isPrimary: index === 0, // First image is primary
        order: index,
      }));

      await prismaClient.$transaction(
        imagesData.map((img: any) => 
          prismaClient.productImage.create({
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

// Function to fetch reference data for dropdowns
export async function getProductReferenceData() {
  try {
    const [brands, materials, colors, watchStyles, claspTypes, complications] = await Promise.all([
      prismaClient.brand.findMany({ orderBy: { name: 'asc' } }),
      prismaClient.material.findMany({ orderBy: { name: 'asc' } }),
      prismaClient.color.findMany({ orderBy: { name: 'asc' } }),
      prismaClient.watchStyle.findMany({ orderBy: { name: 'asc' } }),
      prismaClient.claspType.findMany({ orderBy: { name: 'asc' } }),
      prismaClient.complication.findMany({ orderBy: { name: 'asc' } }),
    ]);

    return {
      brands,
      materials,
      colors,
      watchStyles,
      claspTypes,
      complications,
    };
  } catch (error) {
    console.error('Error fetching reference data:', error);
    throw error;
  }
}

export async function getProductBySlug(slug: string) {
  try {
    const product = await prismaClient.product.findUnique({
      where: { slug },
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

    // Convert Decimal values to strings
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
}

export async function getProductsWithPrimaryImages() {
  try {
    const products = await prismaClient.product.findMany({
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
}

export async function getProductRecommendations(product: any, limit: number = 4) {
  try {
    const recommendations = await prismaClient.product.findMany({
      where: {
        AND: [
          { id: { not: product.id } }, // Exclude current product
          { status: 'PUBLISHED' },
          {
            OR: [
              { brandId: product.brandId }, // Same brand
              { gender: product.gender }, // Same gender
              { watchStyleId: product.watchStyleId }, // Same style
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
        { brandId: 'asc' }, // Prioritize same brand
        { gender: 'asc' }, // Then same gender
        { watchStyleId: 'asc' }, // Then same style
        { createdAt: 'desc' }, // Then newest
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
}

export async function getFilteredProducts(filters: any, sort: string) {
  const where: any = {
    status: "PUBLISHED",
  };

  // Apply filters
  if (filters.brands?.length > 0) {
    where.brandId = { in: filters.brands };
  }

  if (filters.gender?.length > 0) {
    where.gender = { in: filters.gender };
  }

  if (filters.watchStyles?.length > 0) {
    where.watchStyleId = { in: filters.watchStyles };
  }

  if (filters.condition?.length > 0) {
    where.condition = { in: filters.condition };
  }

  if (filters.priceRange?.min || filters.priceRange?.max) {
    where.price = {};
    if (filters.priceRange.min) {
      where.price.gte = parseFloat(filters.priceRange.min);
    }
    if (filters.priceRange.max) {
      where.price.lte = parseFloat(filters.priceRange.max);
    }
  }

  // Apply sorting
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

  return prisma.product.findMany({
    where,
    orderBy,
    include: {
      brand: true,
      watchStyle: true,
      images: {
        where: {
          isPrimary: true,
        },
        select: {
          url: true,
        },
      },
    },
  });
} 