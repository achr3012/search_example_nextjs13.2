

export default async function Author({ params }: { params: { username: string } }) {
  const { username } = params;
  return <h1>Author page `{'=>'}` {username}</h1>
}