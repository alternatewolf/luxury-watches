'use server'

import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

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
    // Check if product with same model number exists
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

    // Generate a unique SKU if none is provided
    let sku = data.sku;
    if (!sku) {
      // Generate SKU from brand and model number
      const brandPrefix = data.brandId.substring(0, 3).toUpperCase();
      sku = `${brandPrefix}-${data.modelNumber}`;
    }

    // Check if SKU already exists
    const existingSku = await prisma.product.findFirst({
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

    // Find or create the watch style
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
      await prisma.product.update({
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

// Function to fetch reference data for dropdowns
export async function getProductReferenceData() {
  try {
    const [brands, materials, colors, watchStyles, claspTypes, complications] = await Promise.all([
      prisma.brand.findMany({ orderBy: { name: 'asc' } }),
      prisma.material.findMany({ orderBy: { name: 'asc' } }),
      prisma.color.findMany({ orderBy: { name: 'asc' } }),
      prisma.watchStyle.findMany({ orderBy: { name: 'asc' } }),
      prisma.claspType.findMany({ orderBy: { name: 'asc' } }),
      prisma.complication.findMany({ orderBy: { name: 'asc' } }),
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

export async function getProductsWithPrimaryImages() {
  try {
    console.log('Starting product fetch...');
    const products = await prisma.product.findMany({
      where: {
        status: 'PUBLISHED',
        images: {
          some: {
            isPrimary: true
          }
        }
      },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1
        },
        brand: {
          select: { name: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 24
    });

    console.log(`Found ${products.length} products with primary images`);
    console.log('Sample product data:', products.length > 0 ? {
      id: products[0].id,
      name: products[0].name,
      imageCount: products[0].images.length,
      primaryImage: products[0].images[0]?.url
    } : 'No products found');

    const mappedProducts = products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand.name,
      primaryImageUrl: product.images[0]?.url || null
    }));

    console.log('Mapped products:', mappedProducts);
    return mappedProducts;
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
} 