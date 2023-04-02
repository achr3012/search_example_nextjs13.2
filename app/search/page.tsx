
import Posts from './Posts';

export default async function Page(
  { searchParams }: {
    searchParams: { [key: string]: string }
  }) {

  let query = searchParams.q;

  if (!query) {
    return <p>The url you entred is invalid, please check it and try again!</p>
  }

  query = encodeURI(query.trim());

  return (
    <>
      <h2>Showing results for: "{query}".</h2>
      <Posts query={query} />
    </>
  )
}