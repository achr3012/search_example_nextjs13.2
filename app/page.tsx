import { PrismaClient } from '@prisma/client';
import Post from './components/Post';

import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

const fetchPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
  return posts;
}

export default async function Home() {

  const session = await getServerSession(authOptions);

  const posts = await fetchPosts();

  return (
    <>
      <pre>{JSON.stringify(session)}</pre>
      <h1>Showing all posts: </h1>
      {posts.length ? posts.map(post => <Post post={post} key={post.id} />) : <p>No posts</p>}
      { }
    </>
  )
}
