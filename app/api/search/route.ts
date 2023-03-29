import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getSearchPosts(query: string) {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      OR: [
        {
          content: {
            contains: query,
            mode: 'insensitive'
          },
        },
        {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          author: {
            firstName: {
              contains: query,
              mode: 'insensitive'
            }
          }
        },
        {
          author: {
            lastName: {
              contains: query,
              mode: 'insensitive'
            }
          }
        }
      ]
    }
  });

  return posts;
}

export async function GET(request: NextRequest) {

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query) {
    return new Response("No search query", {
      status: 400,
    });
  }

  const posts = await getSearchPosts(query);

  return NextResponse.json(posts, { status: 200 });
}


