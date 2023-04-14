import type { User } from '@prisma/client';
import styles from '../page.module.css';
import Link from 'next/link';
import getUsernameFromEmail from "@/app/libs/getUsernameFromEmail";

const Post = ({ post }: { post: { id: number, title: string, content: string, author: User } }) => {
  const username = getUsernameFromEmail(post.author.email);
  return (
    <div className={styles.post}>
      <div className={styles.postThumb}>
        <Link href={`/author/${username}`}>
          {post.author.firstName[0]}
          {post.author.lastName[0]}
        </Link>
      </div>
      <div className={styles.postBody}>
        <h3>
          <Link href={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        <p>{post.content.substring(0, 100)}...</p>
      </div>
    </div>
  )
}

export default Post;