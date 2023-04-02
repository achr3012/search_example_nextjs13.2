
import Posts from './Posts';

export default async function Page(
  { searchParams }: {
    searchParams: { [key: string]: string }
  }) {

  let query = searchParams.q;

  if (query) {
    query = encodeURI(query.trim())
  }

  return (
    <>
      <h2>Showing results for: "{query}".</h2>
      <Posts query={query} />
    </>
  )
}