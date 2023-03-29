import type { User } from '@prisma/client';
import styles from '../page.module.css';
import Link from 'next/link';

const Post = ({ post }: { post: { id: number, title: string, content: string, author: User } }) => {
  return (
    <div className={styles.post}>
      <div className={styles.postThumb}>
        <div>
          {post.author.firstName[0]}
          {post.author.lastName[0]}
        </div>
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