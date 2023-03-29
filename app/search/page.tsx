import Post from '../components/Post';

async function getSearchPosts(query: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/search?q=${query}`);

    if (!res.ok) {
      throw new Error(`Error! status: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}



export default async function Search(
  { searchParams }: {
    searchParams: { [key: string]: string }
  }) {

  let query = searchParams.q;

  if (!query) {
    return <p>The url you entred is invalid, please check it and try again!</p>
  }

  query = encodeURI(query.trim());

  const posts: {
    id: number;
    title: string;
    content: string;
    author: {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
    };
  }[] = await getSearchPosts(query);

  return (
    <>
      <h2>Showing results for: "{query}".</h2>
      {posts.length ? posts.map(post => <Post post={post} key={post.id} />) : (
        <h3>No posts</h3>
      )}
    </>
  )
}