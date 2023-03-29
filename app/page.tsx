import { PrismaClient } from '@prisma/client';
import Post from './components/Post';

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

  const posts = await fetchPosts();

  return (
    <>
      <h1>Showing all posts: </h1>
      {posts.map(post => <Post post={post} key={post.id} />)}
    </>
  )
}
