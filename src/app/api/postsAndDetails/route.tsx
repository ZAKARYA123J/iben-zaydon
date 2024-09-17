import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient, CategoryName, Status } from '@prisma/client';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();
const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: 'dtcfvpu6n',
  api_key: '813952658855993',
  api_secret: '41BFZx9tensYKPnhu3CppsmU9Ng',
});

function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  return response;
}

// Handle OPTIONS method for CORS preflight
export function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  return setCorsHeaders(response);
}

// POST handler for creating posts
// POST handler for creating posts
export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { 
        datePost, lat, lon, prix, adress, ville, status, title, categoryId, typeId, Detail, img, youtub,comment,// Post data
        constructionyear, surface, rooms, bedromms, livingrooms, kitchen, bathrooms, furnished, floor, elevator, parking, balcony, pool, facade, documents, postId,Guard,Proprietary // Detail data
      } = body;
  
      // Logic to determine if it's a post or detail creation based on required fields
      if (postId) {
        // Detail creation
        const detail = await prisma.detail.create({
          data: {
            constructionyear, surface, rooms, bedromms, livingrooms, kitchen, bathrooms, furnished, floor, elevator, parking, balcony, pool, facade, documents,Proprietary,Guard,
            post: { connect: { id: postId } },
          },
        });
        return setCorsHeaders(NextResponse.json(detail, { status: 201 }));
      } else {
        // Post creation
        const missingFields = [];
        if (!img || !Array.isArray(img) || img.length === 0) missingFields.push('img');
        if (!datePost) missingFields.push('datePost');
        if (!lat) missingFields.push('lat');
        if (!lon) missingFields.push('lon');
        if (!prix) missingFields.push('prix');
        if (!adress) missingFields.push('adress');
        if (!ville) missingFields.push('ville');
        if (!status) missingFields.push('status');
        if (!title) missingFields.push('title');
        if (!categoryId) missingFields.push('categoryId');
        if (!typeId) missingFields.push('typeId');
  
        if (missingFields.length > 0) {
          return setCorsHeaders(NextResponse.json({ error: 'Missing required fields', fields: missingFields }, { status: 400 }));
        }
  
        if (!Object.values(Status).includes(status as Status)) {
          return setCorsHeaders(NextResponse.json({ error: 'Invalid status value' }, { status: 400 }));
        }
  
        const uploadedImages = await Promise.all(
          img.map(async (imageUrl: string) => {
            const result = await cloudinary.v2.uploader.upload(imageUrl, {
              folder: 'your_folder_name',
            });
            return {
              url: result.secure_url,
              public_id: result.public_id,
              format: result.format,
              width: result.width,
              height: result.height,
            };
          })
        );
  
        const date = new Date(datePost);
        date.setHours(0, 0, 0, 0);
  
        const post = await prisma.post.create({
          data: {
            img: uploadedImages.map((image) => image.url),
            datePost: date,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            prix,
            adress,
            ville,
            status: status as Status,
            title,
            youtub,
            comment,
            category: { connect: { id: parseInt(categoryId) } },
            type: { connect: { id: parseInt(typeId) } },
            Detail: Detail ? { create: Detail } : undefined, // No need to parse if already an object
          },
          include: {
            category: true,
            type: true,
            DateReserve: true,
            Detail: true,
          },
        });
  
        return setCorsHeaders(NextResponse.json(post, { status: 201 }));
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return setCorsHeaders(NextResponse.json({ error: 'Error processing request', details: errorMessage }, { status: 500 }));
    }
  }
  

// GET handler for fetching posts and details
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const postId = url.searchParams.get('id');
    
    if (postId) {
      const post = await prisma.post.findUnique({
        where: { id: parseInt(postId, 10) },
        include: {
          category: true,
          type: true,
          DateReserve: true,
          Detail: true,
        },
      });

      if (!post) {
        return setCorsHeaders(NextResponse.json({ error: 'Post not found' }, { status: 404 }));
      }

      const date = new Date(post.datePost);
      const formattedPost = {
        ...post,
        datePost: `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`,
      };

      return setCorsHeaders(NextResponse.json(formattedPost, { status: 200 }));
    } else {
      const posts = await prisma.post.findMany({
        include: {
          category: true,
          type: true,
          DateReserve: true,
          Detail: true,
        },
        where: {
          OR: [
            { DateReserve: null },
            { DateReserve: { NOT: { dateDebut: null, dateFine: null } } },
          ],
        },
      });

      const formattedPosts = posts.map((post) => {
        const date = new Date(post.datePost);
        return {
          ...post,
          datePost: `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`,
        };
      });

      return setCorsHeaders(NextResponse.json(formattedPosts, { status: 200 }));
    }
  } catch (error: any) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return setCorsHeaders(NextResponse.json({ error: 'Error retrieving data', details: errorMessage }, { status: 500 }));
  }
}
