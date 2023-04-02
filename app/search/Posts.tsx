"use client"

import useSWR from 'swr'
import Post from '../components/Post'
import type { User } from '@prisma/client';
import SyncLoader from "react-spinners/SyncLoader";
import styles from './../page.module.css'

const searchPostsFetcher = async (url: string) => {
  const res = await fetch(url);
  return await res.json();
}

interface PostType { id: number, title: string, content: string, author: User }

function Posts({ query }: { query: string }) {


  const { data: posts, isLoading, error } = useSWR(`http://localhost:3000/api/search?q=${query}`, searchPostsFetcher);


  if (error) return <div>failed to load</div>
  if (isLoading) return (
    <div className={styles.searchLoading}>
      <SyncLoader
        size={16}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#1db954"
      />
    </div>
  )

  if (posts.length) {
    return (
      <div>{posts.map((post: PostType) => <Post post={post} key={post.id} />)}</div>
    )
  }

  return <p>No posts found</p>
}

export default Posts